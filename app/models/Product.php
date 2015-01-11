<?php

//use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Product extends Eloquent {
	//use SoftDeletingTrait;

	protected $table = 'product';
	//protected $dates = ['deleted_at'];
	public function rewards(){
		return $this->hasMany('Reward','product_id');
	}
	public function toArray(){
		$rewards = $this->rewards;
		if($rewards) $rewards=$rewards->toArray();
		return array(
 				'product_id' => $this->id,
 				'name' => $this->name,
 				'information' => $this->information,
 				'amount' => intval($this->amount),
 				'allprice' => intval($this->allprice),
 				'status' => $this->status,
 				'rewards' => $rewards,
 				'created_at' => $this->created_at,
 				'update_at' => $this->updated_at
			);

	}
}