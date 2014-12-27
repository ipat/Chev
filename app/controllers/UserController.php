<?php

use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends BaseController {

	public function __construct () {
		$this->beforeFilter('not-auth', array('only' => array(
			'store'
			)));
		$this->beforeFilter('auth', array('only' => array(
			'index', 'update', 'destroy'//, 'logout'//, 'isLogin'
			)));
		// $this->beforeFilter('csrf', array('only' => array(
		// 	'store', 'update', 'destroy', 'logout'
		// 	)));
		$this->beforeFilter('admin', array('only' => array(
			'index'
			)));
	}

	//flag: Auth, Admin
	public function index () {
		$users = User::all();
		return Response::json($users->toArray());
	}

	public function show ($user_id) {
		App::abort('403', 'deprecated');
	}

	//flag: not Auth
	public function store () {
		$input = array(
			'email' => Input::get('email'),
			'password' => Input::get('password'),
			'tel' => Input::get('tel'),
			'name_first' => Input::get('name_first'),
			'name_last' => Input::get('name_last'),
			'gender' => Input::get('gender')
			);

		//Define that 'unique_name' validator is explained as in ValidatorLib@isUniqueName.
		Validator::extend('unique_name', 'ValidatorLib@isUniqueFullName');

		//Validation section.
		$rules = array(
			'email' => 'required|min:4|unique:user',
			'password' => 'required|min:7',
			'tel' => 'required|min:8', //Numeric is number only.
			'name_first' => 'required', //Alpha is alphabet only
			'name_last' => 'required', //Thus, Firstname and Lastname should be English.
			'name' => 'unique_name', //Test for uniqueness of name (name_first + name_last)
			);
		$messages = array(
			'email.required' => 'email_missing',
			'email.min' => 'email_length',
			'email.unique' => 'email_found',
			'password.required' => 'password_missing',
			'password.min' => 'password_length',
			'tel.required' => 'tel_missing',
			'tel.min' => 'tel_length',
			'name_first.required' => 'name_first_missing',
			'name_last.required' => 'name_last_missing',
			'name.unique_name' => 'name_found'
			);
		$validator = Validator::make(
			array(
				'email' => $input['email'],
				'password' => $input['password'],
				'tel' => $input['tel'],
				'name_first' => $input['name_first'],
				'name_last' => $input['name_last'],
				'name' => ($input['name_first'] . $input['name_last'])
				),
			$rules,
			$messages
			);

		// validate fails
		if($validator->fails()) {
			App::abort('400', json_encode(array(
				'because' => 'validate_fail',
				'messages' => $validator->messages()->all()
				)));
		}

		$user = new User();
		$user->email = $input['email'];
		$user->password = Hash::make($input['password']);
		$user->tel = $input['tel'];
		$user->name_first = $input['name_first'];
		$user->name_last = $input['name_last'];
		$user->gender = $input['gender'];
		$user->save();

		// passively log the user into the system
		Auth::login($user);

		// $buildCart = new Cart;
		// $buildCart->user_id = $user->id;
		// $buildCart->save();

		// send email to the newly regiseterd user
		//Mail::queueOn('emailingQueue','user.mails.welcome', array('firstname'=>$user->name_first), function($message){
		//	$message->to(Input::get('email'), Input::get('name_first').' '.Input::get('name_last'))->subject('Welcome to the Laravel 4 Auth App!');
		//});

		// $cart = $this->cartToDatabase();
		return Response::json(array(
			'user' => $user->toArray(),
			// 'csrf_token' => csrf_token(),
			// 'cart' => $cart,
			));

	}

	//
	public function update ($user_id) {
		$input = array(
			'tel' => Input::get('tel'),
			'default_address_id' => Input::get('default_address_id'),
			'name_first' => Input::get('name_first'),
			'name_last' => Input::get('name_last'),
			'password_old' => Input::has('password_old') ? Input::get('password_old') : null,
			'password_new' => Input::has('password_new') ? Input::get('password_new') : null
			);
		// Retrieving user.
		$user = User::find($user_id);
		if(!$user) App::abort('404', 'user_not_found');

		//Define that 'unique_name' validator is explained as in ValidatorLib@isUniqueName.
		Validator::extend('unique_name_except', 'ValidatorLib@isUniqueFullNameExcept');
		Validator::extend('default_address', 'ValidatorLib@DoesDefaultAddressMatch');

		//Validation section.
		$rules = array(
			'tel' => 'required|min:8',
			'default_address_id' => 'numeric|default_address:' . $user->id,
			'name_first' => 'required',
			'name_last' => 'required',
			'name' => 'unique_name_except:' . $user->name_first . ',' . $user->name_last
			);
		$messages = array(
			'tel.required' => 'tel_missing',
			'tel.min' => 'tel_length',
			'default_address_id.numeric' => 'default_address_id_not_number',
			'default_address_id.default_address' => 'default_address_id_not_found',
			'name_first.required' => 'name_first_missing',
			'name_last.required' => 'name_last_missing',
			'name.unique_name_except' => 'name_found'
			);
		$validator = Validator::make(
			array(
				'tel' => $input['tel'],
				'default_address_id' => $input['default_address_id'],
				'name_first' => $input['name_first'],
				'name_last' => $input['name_last'],
				'name' => ($input['name_first'] . $input['name_last'])
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

		if($user_id != Auth::user()->id) {
			//admin section
			if(!Auth::user()->isAdmin()) {
				App::abort('401', 'not_admin');
			}
		}
		else {
			//user section
			// User requested for a password change.
			if(Input::has('password_new')) {
				// Check if the old, new passwords exist and are in the good condition.
				$validator = Validator::make(array(
					'password_new' => $input['password_new']
					), array(
					'password_new' => 'required|min:7'
					), array(
					'password_new.required' => 'password_new_missing',
					'password_new.min' => 'password_new_length'
					));
				if($validator->fails())
					App::abort('400', json_encode(array(
						'because' => 'validate_fail',
						'messages' => $validator->messages()->all()
						)));

				// Check if the old password is correct.
				if(!Hash::check($input['password_old'], $user->password)) {
					App::abort('401', 'wrong_password');
				}
				else {
					//Update the password to the new one.
					$user->password = Hash::make($input['password_new']);
				}
			}
		}

		// $user retrieved above.
		//Update the user info.
		$user->tel = $input['tel'];
		$user->default_address_id = $input['default_address_id'];
		$user->name_first = $input['name_first'];
		$user->name_last = $input['name_last'];
		$user->save();
		return Response::json($user->toArray());
	}

	//with $user_id is for admin to delete a user.
	//without $user_id is for a user to delete himself. -> password retyping is needed.
	public function destroy ($user_id) {
		if($user_id != Auth::user()->id) {
			//Admin section
			if(!Auth::user()->isAdmin()) {
				// Not authorized
				App::abort('401', 'not_admin');
			}
			else {
				// Find and delete
				$user = User::find($user_id);
				if(!$user) App::abort('404', 'not_found');
				$user->delete();
			}
		}
		else {
			//User Section
			$input = array(
				'password' => Input::get('password')
				);

			$user = User::find(Auth::user()->id);
			if(!$user) App::abort('404', 'not_found');

			//check if the password is correct
			if(!Hash::check($input['password'], $user->password)) {
				App::abort('400', 'wrong_password');
			}
			else {
				//Logout
				Auth::logout();
				//Delete user
				$user->delete();
			}
		}
	}

	private function cartToDatabase() {
			// cart->items(item_id) = @item
			// cart->rewards(item_id) = @reward // not yet
			// cart->discount
		$user_id = Auth::user()->id;
		$hasCart = Cart::where('user_id',$user_id)->first();
		if(!$hasCart){
			$buildCart = new Cart;
			$buildCart->user_id = $user_id;
			$buildCart->save();
		}
		if(Session::has('cart')){
				// saving in-session cart to database
			$session_cart = Session::get('cart');

			if($session_cart['items']){
				$oldCart = Cart::where('user_id',$user_id)->first();
				if($oldCart){
					CartItem::where('cart_id',$oldCart->id)->delete();
					CartReward::where('cart_id',$oldCart->id)->delete();
					CartDiscount::where('cart_id',$oldCart->id)->delete();
					$oldCart->delete();
				}
				$cart = new Cart;
				$cart->user_id = $user_id;
				$cart->save();



				foreach ($session_cart['items'] as $idx=>$item) {
					$cart_items = new CartItem;
					$cart_items->cart_id = $cart->id;
					$cart_items->price = $item['price'];
					$cart_items->amount = $item['amount'];
					$cart_items->item_id = $item['item_id'];
					$cart_items->save();
				}

				$returnCart=Cart::calReward($cart->toArray());
				if($returnCart['rewards']){

					foreach($returnCart['rewards'] as $rewardItem){
						$new_cart_reward = new CartReward;
						$new_cart_reward->cart_id = $cart->id;
						$new_cart_reward->item_id = $rewardItem['item_id'];
						$new_cart_reward->amount = $rewardItem['amount'];
						$new_cart_reward->price = $rewardItem['price'];
						$new_cart_reward->save();
					}

				}
				if($returnCart['discount']){
					$new_cart_discount = new CartDiscount;
					$new_cart_discount->cart_id = $cart->id;
					$new_cart_discount->discount = $returnCart['discount'];
					$new_cart_discount->save();
				}
			}
				// here we have to call calculatePromotion() from model Cart for generating rewards and discount

				//$returnCart = Cart::find($cart->id)->toArray();
			$returnCart = Cart::where('user_id',$user_id)->first();
			if($returnCart){
				$returnCart=$returnCart->toArray();
			}
			else {
				$returnCart = array();
				$returnCart['items'] = array();
				$returnCart['rewards'] = array();
				$returnCart['discount'] = intval(0);

			}
				//return  ($returnCart);
			Session::forget('cart');
		}
		else {
			$returnCart = Cart::where('user_id',$user_id)->first();
			if($returnCart){
				$returnCart=$returnCart->toArray();
			}
			else {
				$returnCart = array();
				$returnCart['items'] = array();
				$returnCart['rewards'] = array();
				$returnCart['discount'] = intval(0);
			}
		}
		return $returnCart;
	}

	public function login () {
		$input = array(
			'email' => Input::get('email'),
			'password' => Input::get('password')
			);

		//can't login
		if(!Auth::attempt(array(
			'email' => $input['email'],
			'password' => $input['password']
			))) {
			App::abort('401', 'cannot_login');
		}

		// $cart = $this->cartToDatabase();
		return Response::json(array(
			'user' => Auth::user()->toArray(),
			// 'csrf_token' => csrf_token(),
			// 'cart' => $cart,
		));
	}

	public function facebook() {
		$code = Input::get('code');
		if (!$code) {
			App::abort('400', 'code_missing');
		}

		$fb = OAuth::consumer('Facebook', 'http://localhost:8080/');
		$accessToken = $fb->requestAccessToken($code);
		$result = json_decode($fb->request('/me'), true);

		// already signed in, performs linking current account with facebook
		if (Auth::check()) {
			$user = User::find(Auth::id());

			if (!$user) {
				App::abort('400', 'user_not_found');
			}

			$others = User::where('facebook', $result['id'])->first();
			// This facebook belongs to another account, abort
			if ($others) {
				App::abort('400', 'facebook_found');
			}

			$user->facebook = $result['id'];
			$user->save();

			return Response::json([
				'user' => $user->toArray()
				]);
		}
		// not signed-in, create a new User, or login to the created one
		else {
			$user = User::where('facebook', $result['id'])->first();
			// if user is not created, next create a new one
			if (!$user) {
				$user = new User();
				$user->email = $result['email'];
				$user->password = null;
				$user->facebook= $result['id'];
				$user->name_first = $result['first_name'];
				$user->name_last = $result['last_name'];
				$user->save();
			}

			// user created, just performs login
			Auth::login($user);

			$cart = $this->cartToDatabase();
			return Response::json([
				'user' => Auth::user()->toArray(),
				'csrf_token' => csrf_token(),
				'cart' => $cart,
				]);
		}
	}

	public function logout () {
		Auth::logout();
		return Response::json([
			// 'csrf_token' => csrf_token()
			]);
	}

	public function isLogin () {
		// a user's cart
		// $cart = Cart::where('user_id', Auth::user()->id)->first();
		// if($cart) {
		// 	// existing cart
		// 	$cart = $cart->toArray();
		// } else {
  //     // empty cart
		// 	$cart = array(
		// 		'items' => array(),
		// 		'rewards' => array(),
		// 		'discount' => 0
		// 		);
		// }

		return Response::json(array(
			'user' => Auth::user()->toArray(),
			// 'csrf_token' => csrf_token(),
			// 'cart' => $cart
			));
	}

	public function hasEmail() {
		$user = User::where('email', Input::get('email'))->first();
		if(!$user)  {
			App::abort('404', 'email_not_found');
		}
		else {
			App::abort('200', 'email_found');
		}
	}

	public function hasName() {
		$user = User::where('name_first', Input::get('name_first'))
		->where('name_last', Input::get('name_last'))
		->first();
		if(!$user) {
			App::abort('404', 'name_not_found');
		}
		else {
			App::abort('200', 'name_found');
		}
	}

	public function forgotpassword()
	{
		// Set the user array to gather data from the password recover form
		$userdata = array(
			'email' => Input::get('email')
		);

		// Set Validaton Rule
		$rules = array(
			'email' => 'required|email',
			);

		// Run our validation check
		$validator = Validator::make($userdata, $rules);

		// If validation fails then redirect back to the signup screen with errors
		if($validator->fails())
		{
			return Redirect::back()
				->withInput()
				->withErrors($validator);
		}
		// If Validation passes then process the form data
		else
		{
			//Grab the user record by the email address provided by the input form
			$user = User::where('email', '=', Input::get('email'));

			// If the user record exists then grab the first returned result
			if($user->count())
			{
				$user = $user->first();

				// Generate a reset code and the temp password
				$resetcode = str_random(60);
				$passwd = str_random(15);

				//Set the new values in the users db record to document the values
				$user->password_temp = Hash::make($passwd);
				$user->resetcode = $resetcode;
	 			//return $user->password_temp;
				// Save resetcode and temp password to user database record
				if($user->save())
				{
					// Set data array , this is the information that will be passed to the email form.
					$data = array(
						'email' => $user->email,
						'firstname' => $user->name_first,
						'lastname' => $user->name_last,
						'username' => $user->email,
						'link' => URL::to('resetpassword', $resetcode),
						'password' => $passwd
					);

					// Send a mail to the user. This will plug the datavalues into the reminder email template and mail the user.
					Mail::send('password.remind', $data, function($message) use($user, $data)
					{
						$message->to($user->email, $user->givenname . ' ' . $user->lastname)->subject('KENE Password Recovery Request');
					}); // End Mail
	 				return 'yeahhh';
					// Return to the login screen with a message informing the user to check their email
					return Redirect::to('login');
						//->with('message', FlashMessage::DisplayAlert('User password reset link has been sent to your email', 'success'));

				} //End If DB Save
			} // End If User Count

			// If the email address does not match an email address in the database the display feedback to the user
				return Redirect::to('forgotpassword');
					//->with('message', FlashMessage::DisplayAlert('Could not validate existing email address', 'danger'));
		} // End Else
	} // End FogotPassword FN
	public function resetpassword($resetcode)
	{
		// Grab the user record where the reset code sent in the email matches in the database
		$user = User::where('resetcode', '=', $resetcode)
			->where('password_temp', '!=', '');

		// If the DB search comes back with records from the query
		if($user->count())
		{
			// Set the user variable to the first returned record
			$user = $user->first();

			// Set the user user password to the value stored in password_temp, and then clear password temp and resetcode.
			$user->password = $user->password_temp;
			$user->password_temp = '';
			$user->resetcode = '';

			// Save the record to the database
			if($user->save())
			{
				// If successful then send the user to the login page and let them know they can now use the new password
				return Redirect::to('../login');
					//->with('message', FlashMessage::DisplayAlert('Your account has been reset. You can now log in with the password sent to your e-mail.', 'success'));
			}
		} // End User Count

		// If no user record was found, then inform the user that the reset code was not found in the database
		return Redirect::to('../login');
		//->with('message', FlashMessage::DisplayAlert('Could not recover account. Please contact your Administrator for further assistence.', 'danger'));
	} //End ResetPassword FN
}

