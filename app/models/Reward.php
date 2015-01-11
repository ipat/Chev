<?php

//use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Reward extends Eloquent {
//	use SoftDeletingTrait;

	protected $table = 'reward';
	//protected $dates = ['deleted_at'];
	

	public function toArray(){
		
		$reward_product_name = "wrong";	
		if($this->reward_product == 1) $reward_product_name = "chev-diet";
		else App::abort('404','reward not found !');
		return array(
 				'id' => $this->id,
 				'product_id'=>$this->product_id,
 				'reward_product_id' => $this->reward_product,
 				'reward_product_name' => $reward_product_name,
 				'amount' => $this->amount,
 				'discount' => $this->reward_discount,
 				'created_at' => $this->created_at,
 				'update_at' => $this->updated_at
			);

	}
}