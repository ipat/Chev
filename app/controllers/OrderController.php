<?php
class OrderController extends BaseController{
	public function __construct () {

    $this->beforeFilter('auth', array('only' => array(
      'index','update','store','destroy','show'
    )));
    $this->beforeFilter('admin', array('only' => array(
      'index','destroy'
    )));
    
    //$this->beforeFilter('csrf', array('only' => array(
    //  'index','update','store','destroy','show'
    //)));
	}
	public function index(){
		$status = Input::get('status');

		$all_order = Order::where('status', $status)->get();
		return Response::json($all_order->toArray());
	}
	public function show($tmp){
		$user_id = Auth::user()->id;
		$order = Order::where('user_id',$user_id)->get();
		return Response::json($order->toArray());
	}
	public function store(){
		$userAddressId = Input::get('address_id');

		return Response::json(Order::carttoOrder(intval($userAddressId)));
	}
	public function update($order_id){
		$status = intval(Input::get('status'));

		$user_id = Auth::user()->id;

		// $order = Order::where('id',$order_id)->where('user_id',$user_id)->first();
		$order = Order::find($order_id);
//		return $order;
		if (!$order) {
			App::abort('404', 'not_found');
		}


		if ($status == 0){
			if ($order->user_id != $user_id) {
				// trying to make change on the otherwiseers
				// lowering the staus
				// requires admin permission
				if (! Auth::user()->isAdmin()) {
					App::abort('401', 'not_admin');
				}
			}

			// decresing order
			if ($order->status == 1) {
				// remove payInfo
				// return 1111;
				$order->payInfo->delete();
				$order->status = 0;
				$order->save();
				return Response::json($order->toArray());
			}
			// over changing status
			else {
				App::abort('400', 'status_wrong');
			}
		}
		else if ($status == 1) {
			if ($order->user_id != $user_id
				|| $order->status == 2) {
				// trying to make change on the others
				// lowering the staus
				// requires admin permission
				if (! Auth::user()->isAdmin()) {
					App::abort('401', 'not_admin');
				}
			}

			// increasing status
			if ($order->status == 0) {
				$request = array(
					'amount' => Input::get('amount'),
					'bank' => Input::get('bank'),
					'payTime' => Input::get('time'),
					'pic_url' => Input::get('pic_url')
				);
				$rules = array(
					'amount' => 'required',
					'bank'   => 'required',
					'payTime' => 'required',
					'pic_url' => 'required'
				);
				$messages = array(
					'amount.required' => 'amount_missing',
					'bank.required' => 'bank_missing',
					'payTime.required' => 'payTime_missing',
					'pic_url.required' => 'pic_url_missing'
				);
				$validator = Validator::make(
					array(
						'amount' => $request['amount'],
						'bank' => $request['bank'],
						'payTime' => $request['payTime'],
						'pic_url' => $request['pic_url'],
					),
					$rules,
					$messages
				);

				if($validator->fails()) {
					App::abort('400', json_encode(array(
						'because' => 'validate_fail',
						'messages' => $validator->messages()->all()
					)));
				}
				else {
					$payInfo = new PayInfo;
					$payInfo->order_id = $order->id;
					$payInfo->amount = $request['amount'];
					$payInfo->bank = $request['bank'];
					$payInfo->time = $request['payTime'];
					$payInfo->pic_url = $request['pic_url'];
					$payInfo->save();

					$order->status = $status;
					$order->save();

					return Response::json($order->toArray());
				}
			}
			// decreasing status
			else if ($order->status == 2) {
				// use the old information
				// delete sendInfo
				$order->sendInfo->delete();
				$order->status = 1;
				$order->save();

				return Response::json($order->toArray());
			}
			// over changing status
			else {
				App::abort('400', 'status_wrong');
			}
		}
		else if ($status == 2) {
			
			// Admin permission is required
			if (! Auth::user()->isAdmin()) {
				App::abort('401', 'not_admin');
			}

			// over changing status
			if ($order->status != 1) {
				App::abort('400', 'status_wrong');
			}

			$request = array(
				'arrivalDate' => Input::get('arrival_date'),
				'tracking_code' => Input::get('tracking_code')
			);
			$rules = array(
				'arrivalDate' => 'required',
				'tracking_code' => 'required'
			);
			$messages = array(
				'arrivalDate.required' => 'arrivalDate_missing',
				'tracking_code.required' => 'tracking_code_missing'
			);
			$validator =Validator::make(
				array(
					'arrivalDate' => $request['arrivalDate'],
					'tracking_code' => $request['tracking_code']
				),
				$rules,
				$messages
			);

			if($validator->fails()) {
				App::abort('400', json_encode(array(
					'because' => 'validate_fail',
					'messages' => $validator->messages()->all()
				)));
			}
			else {
				
				// He's an admin, permission granted
				
				$sendInfo = new SendInfo;
				$sendInfo->order_id= $order_id;
				$sendInfo->arrival_date = $request['arrivalDate'];
				$sendInfo->tracking_code = $request['tracking_code'];
				$sendInfo->save();
				
				$arrival = $sendInfo->arrival_date;
				$arrival = new DateTime($arrival);
				$arrival = $arrival->format('Y-M-d');
				
				$order = Order::where('id',$order_id)->first();
				$order->status = $status;

				$order->save();
				$order = $order->toArray();
				
				$array = array(
							'name_first'=>$order['user']['name_first'],
							'name_last' =>$order['user']['name_last'],
							'arrival_date'=>$arrival,
							'tracking_code'=>$request['tracking_code']
						);
				$user = array();
				$user['email'] = $order['user']['email'];
				$user['name_first'] = $order['user']['name_first'];
				$user['name_last'] = $order['user']['name_last'];
				// Mail::send('emails.shipment-complete', $array, function($message) use ($user){
				// 	$message->from('order@chev-diet.com', 'CHEV dietary  supplement');
    //   				$message->to($user['email'], $user['name_first'].' '.$user['name_last'])->subject('ได้ทำการส่งสินค้าเรียบร้อยแล้ว');
    // 			});
				

				return Response::json($order);
			}

		}
		else if($status == 3){
			// over changing status
			if ($order->status != 2) {
				App::abort('400', 'status_wrong');
			}

			// need question_id and ans
			$questions = Input::all();
			$order_id = $questions['status'];
			$ret = array();

			foreach ($questions['question'] as $question) {

				$Q = Question::where('id',intval($question['id']))->first();
				///  0 is close-end question  1 is otherwise

				if($Q->type == 0){
					$ans = new OrderAnsClose;
					$ans->question_id = intval($question['id']);
					$ans->answer = intval($question['ans']);

					$ans->order_id = $order_id;
					$ans->save();


				} else {
					$ans = new OrderAnsOpen;
					$ans->question_id = intval($question['id']);
					$ans->answer = $question['ans'];
					$ans->order_id = $order_id;
					$ans->save();
				}
				$ret[]=array(
							'order_id' => $order_id,
							'question' => $Q->question,
							'answer' => $question['ans']
						);
			}
			return $ret;

		}
		else {
			App::abort('400', 'status_wrong');
		}
	}
	public function destroy($order_id){
		$user_id = Auth::user()->id;
		$unqualifyOrder = Order::where('id',$order_id)->first();

		$order = null;
		if(!$unqualifyOrder) App::abort('403','not Found');
		if($unqualifyOrder->user_id == $user_id ) $order = $unqualifyOrder;

		if($order){
			OrderItem::where('order_id',$order->id)->delete();
      		$orderReward = OrderReward::where('order_id',$order->id)->first();
      		if($orderReward) $orderReward->delete();

      		$orderDiscount = OrderDiscount::where('order_id',$order->id)->first();
      		if($orderDiscount) $orderDiscount->delete();

      		$orderPayInfo = orderPayInfo::where('order_id',$order->id)->first();
      		if($orderPayInfo) $orderPayInfo->delete();

			$order->delete();
		}
		else App::abort('401','unauthorized');
	}

	public function uploadPic(){
		$order = Order::where('id', Input::get('order_id'))->first();
		if(!Auth::check() || Auth::user()->id !== $order->user_id)
			return "fail!";

		$destinationPath = '';
	    $filename        = '';

	    // return var_dump(Input::get('order_id'));
	    if (Input::hasFile('file')) {
	        $file            = Input::file('file');
	        $destinationPath = public_path().'/upload/';
			$file_name = Input::get('file_name');
	        $uploadSuccess   = $file->move($destinationPath, $file_name);
	    }

	    return "done";

	}
}
