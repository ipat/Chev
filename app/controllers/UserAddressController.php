<?php

class UserAddressController extends BaseController {

    public function __construct() {
      $this->beforeFilter('auth', array('only' => array(
        'store', 'update', 'destroy'
      )));
      $this->beforeFilter('csrf', array('only' => array(
        'store', 'update', 'destroy'
      )));
    }

    public function index () {
      App::abort('403', 'deprecated');
    }

    public function show ($user_address_id) {
      App::abort('403', 'depercated');
    }

    public function store () {
      $input = array(
        'title' => Input::get('title'),
        'house' => Input::get('house'),
        'house_name' => Input::get('house_name'),
        'road' => Input::get('road'),
        'district' => Input::get('district'),
        'county' => Input::get('county'),
        'province' => Input::get('province'),
        'postcode' => Input::get('postcode'),
        // Use the pre-shared country, for now.
        // 'country' => $this->country
        'country' => 'Thailand'
      );

      //Validation
      $rules = array(
        'title' => 'required',
        'house' => 'required',
        'house_name' => '',
        'road' => '',
        'district' => 'required',
        'county' => 'required',
        'province' => 'required',
        'postcode' => 'required',
        'country' => 'required'
      );
      $messages = array(
        'title.required' => 'title_missing',
        'house.required' => 'house_missing',
        'district.required' => 'district_missing',
        'county.required' => 'county_missing',
        'province.required' => 'province_missing',
        'postcode.required' => 'postcode_missing',
        'country.required' => 'country_missing'
      );
      $validator = Validator::make(
        array(
          'title' => $input['title'],
          'house' => $input['house'],
          'house_name' => $input['house_name'],
          'road' => $input['road'],
          'district' => $input['district'],
          'county' => $input['county'],
          'province' => $input['province'],
          'postcode' => $input['postcode'],
          'country' => $input['country']
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
        $address = new UserAddress();
        $address->user_id = Auth::user()->id;
        $address->title = $input['title'];
        $address->house = $input['house'];
        $address->house_name = $input['house_name'];
        $address->road = $input['road'];
        $address->district = $input['district'];
        $address->county = $input['county'];
        $address->province = $input['province'];
        $address->postcode = $input['postcode'];
        $address->country = $input['country'];
        $address->save();
        return Response::json($address->toArray());
      }
    }

    // $user_id, obtained from the session, must be compatible with the $user_address_id
    public function update ($user_address_id) {
      $input = array(
        'title' => Input::get('title'),
        'house' => Input::get('house'),
        'house_name' => Input::get('house_name'),
        'road' => Input::get('road'),
        'district' => Input::get('district'),
        'county' => Input::get('county'),
        'province' => Input::get('province'),
        'postcode' => Input::get('postcode'),
        // Use the pre-shared country, for now.
        // 'country' => $this->country
        'country' => 'Thailand'
      );

      //Validation
      $rules = array(
        'title' => 'required',
        'house' => 'required',
        'house_name' => '',
        'road' => '',
        'district' => 'required',
        'county' => 'required',
        'province' => 'required',
        'postcode' => 'required',
        'country' => 'required'
      );
      $validator = Validator::make(array(
        'title' => $input['title'],
        'house' => $input['house'],
        'house_name' => $input['house_name'],
        'road' => $input['road'],
        'district' => $input['district'],
        'county' => $input['county'],
        'province' => $input['province'],
        'postcode' => $input['postcode'],
        'country' => $input['country']
      ), $rules);

      $address = UserAddress::find($user_address_id);
      if(!$address)
        App::abort('404', 'not_found');
      if($address->user_id != Auth::user()->id)
        App::abort('401', 'not_admin');
      $address->title = $input['title'];
      $address->house = $input['house'];
      $address->house_name = $input['house_name'];
      $address->road = $input['road'];
      $address->district = $input['district'];
      $address->county = $input['county'];
      $address->province = $input['province'];
      $address->postcode = $input['postcode'];
      $address->country = $input['country'];
      $address->save();
      return Response::json($address->toArray());
    }

    public function destroy ($user_address_id) {
      $address = UserAddress::find($user_address_id);
      if(!$address)
        App::abort('404', 'not_found');
      if($address->user_id != Auth::user()->id)
        App::abort('401', 'not_admin');
      $address->delete();
    }
}
