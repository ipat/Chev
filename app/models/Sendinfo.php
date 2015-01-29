<?php

class SendInfo extends Eloquent {

  protected $table = 'order_sendinfo';

  public function toArray() {
    return array(
      'id' => intval($this->id),
      'order_id' => $this->order_id,
      'tracking_code' => $this->tracking_code,
      'arrival_date' => $this->arrival_date,
      'updated_at' => $this->updated_at,
      'created_at' => $this->created_at
    );
  }
}
