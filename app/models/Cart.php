<?php

class Cart extends Eloquent {

  protected $table = 'cart';

  public function products() {
    return $this->hasMany('CartProduct', 'cart_id');
  }


  public function toArray() {
    
    $products = $this->products;
    if($products) $products=$products->toArray();
    else $products = array();
    
    return array(
      //'user_id' => $this->user_id,
      'products' => $products,
      //'rewards' => $rewards,
      //'discount' => $discount,
      //'updated_at' => $this->updated_at,
      //'created_at' => $this->created_at
    );
  }
  public static function calTotal($cart){
    $total = intval(0);
    if($cart['products']){ 
      foreach($cart['products'] as $product){
        $total += $product['setAmount']*$product['product']['allprice'];
      }
      $cart['total']=$total;
    }
    else $cart['total'] = intval(0);
    return $cart;
  }


}
