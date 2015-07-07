<?php

class PayInfo extends Eloquent {

  protected $table = 'order_payinfo';

  public function toArray() {
    return array(
      'id' => intval($this->id),
      'order_id' => intval($this->order_id),
      'amount'   => intval($this->amount),
      'bank'    => $this->bank,
      'payTime'  => $this->time,
      'pic_url' => $this->pic_url,
      'updated_at' => $this->updated_at,
      'created_at' => $this->created_at
    );
  }
}
