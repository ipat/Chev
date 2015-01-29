<?php

class Order extends Eloquent {

	protected $table = 'order';
	

	public function products () {
		return $this->hasMany('OrderProduct', 'order_id');
	}

	public function payInfo(){
		return $this->hasOne('PayInfo','order_id');
	}
	public function sendInfo(){
		return $this->hasOne('SendInfo','order_id');
	}
	public function address(){
		return $this->hasOne('OrderAddress','order_id');
	}

	public function toArray() {
		//return $this->address->to;
		$products = $this->products;
		$rewards = $this->rewards;
		$payInfo = $this->payInfo;
		$sendInfo = $this->sendInfo;
		
		$user = User::find($this->user_id);

		return array(
			'id' => intval($this->id),
			'user' => $user->toArray(),
			'products' => $products->toArray(),
			'address' => $this->address,   
			'status' => $this->status,
			'payInfo' => $payInfo ? $payInfo->toArray() : null,
			'sendInfo' => $sendInfo ? $sendInfo->toArray() : null,
			'updated_at' => $this->updated_at,
			'created_at' => $this->created_at
		);
	}


	public static function carttoOrder($userAddressId){
		if(Auth::check()){
			$user_id = Auth::user()->id;
			$address = UserAddress::where('id',$userAddressId)->where('user_id',$user_id)->first();
			$address = $address->toArray();
			$user_id = Auth::user()->id;
      		$cart = Cart::where('user_id', $user_id)->first();
      		$cart_id = $cart->id;
      		$cart = $cart->toArray();
      		$cart = Cart::calTotal($cart);
      		if(!$cart['products']) App::abort('400','Cart Empty');
      		//return  $cart;
      		$order = new Order;
      		$order->user_id = $user_id;
      		
      		$order->total = $cart['total'];
      		$order->status = intval(0);

      		
      		
      		$order->save();
      		//return $cart;
      		
      		foreach($cart['products'] as $idx=>$cartProduct){
	      		$orderProduct = new OrderProduct;
	      		// return $cartProduct;
	      		$orderProduct->order_id = $order->id;
	      		$orderProduct->product_id = $cartProduct['product']['product_id'];
	      		$orderProduct->setAmount = $cartProduct['setAmount'];
	      		$orderProduct->allPrice = $cartProduct['product']['allprice'];
	      		//return $orderProduct;
	      		$orderProduct->save();

	      	}

	      	//return 11;
	      	$order_address = new OrderAddress;
	      	$order_address->order_id = $order->id;
	      	$order_address->title = $address['title'];
	      	$order_address->house = $address['house'];
	      	$order_address->house_name = $address['house_name'];
	      	$order_address->road = $address['road'];
	      	$order_address->district = $address['district'];
	      	$order_address->county = $address['county'];
	      	$order_address->province = $address['province'];
	      	$order_address->postcode = $address['postcode'];
	      	$order_address->country = $address['country'];
	      	$order_address->save();

	      	//Cart::where('id',$cart_id)->delete();
	      	CartProduct::where('cart_id',$cart_id)->delete();
      		

	      	return $order->toArray();
		}
		else {
			// let him login first

		}



	}

}
