<?php

class OrderProduct extends Eloquent {

  protected $table = 'order_product';

  public function product() {
    return $this->belongsTo('Product', 'product_id');
  }

  public function toArray() {
    $product = $this->product;
    if($product) $product = $product->toArray();
    return array(
      
      'cart_id' => $this->cart_id,
      'product' => $product,
      //'rewards' => $rewards,
      //'discount' => $discount,
      'setAmount' => $this->setAmount,
      'allPrice' => $this->allPrice
      //'updated_at' => $this->updated_at,
      //'created_at' => $this->created_at
    
    );
  }
}
