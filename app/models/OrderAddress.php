<?php

class OrderAddress extends Eloquent {

  protected $table = 'order_address';

  public function toArray() {
    return array(
      'id' => intval($this->id),
      'order_id' => intval($this->order_id),
      'title' => $this->title,
      'house' => $this->house,
      'house_name' => $this->house_name,
      'road' => $this->road,
      'district' => $this->district,
      'county' => $this->county,
      'province' => $this->province,
      'postcode' => $this->postcode,
      'country' => $this->country,
      'updated_at' => $this->updated_at,
      'created_at' => $this->created_at
    );
  }
}