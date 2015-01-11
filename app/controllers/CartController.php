<?php


class CartController extends BaseController {
  

  public function index () {
    //return 111;
    if(Auth::check()){
      $user_id = Auth::user()->id;
      $cart = Cart::where('user_id', $user_id)->first();
      if($cart) $cart=$cart->toArray();
      else{
        $cart = array();
        $cart['products']=array();
        $cart['total']=intval(0);
        //$cart->save();
      }
      //$cart = Cart::where('user_id', $user_id)->first();
      //$cart = $cart->toArray();
      
      $cart = Cart::calTotal($cart);
      return Response::json($cart);
    }
    else{
      if(!Session::has('cart')){
        $cart = array();
        $cart['products'] = array();
        //$cart['total'] = intval(0);
        Session::put('cart',$cart);
      }
      $cart = Session::get('cart');
      $cart = Cart::calTotal($cart);
      return Response::json($cart);
    }

  }
  public function show(){
    App::abort('403', 'deprecated');
  }

  public function store () {

    $input = array(
      'product_id' => Input::get('product_id'),
      'product_amount' => Input::get('product_amount')
    );

    $product = Product::where('id',$input['product_id'])->first();

    if(Auth::check()){

      $user_id = Auth::user()->id;
      $cart = Cart::where('user_id',$user_id)->first();
      $cart_product=CartProduct::where('cart_id',$cart->id)->where('product_id',$input['product_id'])->first();

      if(!$cart_product){
        $new_cart_product = new CartProduct;
        $new_cart_product->cart_id = $cart->id;
        $new_cart_product->product_id = $product->id;
        //$new_cart_product->price = $item->price()->price;
        $new_cart_product->setAmount = $input['product_amount'];
        $new_cart_product->save();
      }
      else{
        $cart_product->setAmount += $input['product_amount'];
        $cart_product->save();
      }
      
      $cart = Cart::where('user_id',$user_id)->first();
      $cart_id = $cart->id;
      
      $cart = $cart->toArray();
      return $cart;
      $cart = Cart::calTotal($cart);

      return Response::json($cart);
      
    }
    else {
      if(!Session::has('cart')){
        // if the existing cart not found, initialize it.
        $cart = array();
        $cart['products'] = array();
        
        //$cart['total'] = intval(0);
        
        Session::put('cart',$cart);
      }
      $cart = Session::get('cart');

      $product = $product->toArray();
      // since toArary() returns as item -> toArray()
      // which item->id as id
      // but we want item->id as item_id
      // so, move the index
      //$product['product_id'] = $product['id'];

      // and delete the 'id' which doesn't exist in the first place
      //unset($product['id']);

      $has = false;
     // return  $product;
      if($cart['products']){
        foreach ($cart['products'] as $idx=>$productInCart) {
          //return $productInCart;
          if($productInCart['product']['product_id'] == $product['product_id']){
            $has = true;
            $cart['products'][$idx]['setAmount']+=intval($input['product_amount']);
            break;
          }
        }
      }
      if(!$has){
          //return 1;
        //$product['setAmount'] = intval($input['product_amount']);
        $tempSetAmount = intval($input['product_amount']);
        $cart['products'][] = array('product'=>$product,
                                    'setAmount'=>$tempSetAmount
                                    );
      }
      //return $cart;
      $cart = Cart::calTotal($cart);
      Session::put('cart',$cart);
      //$cart = Cart::calTotal($cart);
      return Response::json($cart);
     }
  }

  public function destroy($product_id){
    if(Auth::check()){
      $user_id = Auth::user()->id;

      $cart = Cart::where('user_id',$user_id)->first();
      CartProduct::where('cart_id',$cart->id)->where('product_id',$product_id)->delete();
      
      $cart = Cart::where('user_id',$user_id)->first();
      $cart = $cart->toArray();
      $cart = Cart::calTotal($cart);
      return Response::json($cart);
    }
    // haven't test yet
    else{
      if(!Session::has('cart')){
        // if the existing cart not fonud, initialize it
        $cart = array();
        $cart['products'] = array();
        
        //$cart['total'] = intval(0);
        
        Session::put('cart',$cart);
      }
      $cart = Session::get('cart');

      foreach ($cart['products'] as $idx => $productInCart) {
        if($productInCart['product']['product_id'] == $product_id){
          array_splice($cart['products'], $idx, 1);
          break;
        }
      }
      $cart = Cart::calTotal($cart);
      Session::put('cart',$cart);
      
      return Response::json($cart);
    }
  }
}


