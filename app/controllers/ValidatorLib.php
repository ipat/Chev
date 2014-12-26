<?php

class ValidatorLib extends BaseController {
	public function isUniqueFullName($attr, $val, $params) {
		$count = User::whereRaw('concat(name_first, name_last) = ?', array($val))
			->count();
		return $count == 0;
	}

  // params: old_name_first, old_name_last
  public function isUniqueFullNameExcept($attr, $val, $params) {
    $name_old = $params[0] . $params[1];
    // the old name is available
    if($name_old == $val) return true;

    $count = User::whereRaw('concat(name_first, name_last) = ?', array($val))
      ->count();
    return $count == 0;
  }

  // params: user_id
  public function DoesDefaultAddressMatch($attr, $val, $params) {
    $user_id = $params[0];
    $address = UserAddress::find($val);
    if(!$address) return false;
    else {
      return $address->user_id == $user_id;
    }
  }

	public function self($attr, $val, $params) {
		//so $val must be boolean
		return $val;
	}

  public function isUniqueCategoryNameExcept($attr, $val, $params) {
    $name_old = $params[0];
    if($name_old == $val) return true;
    $count = Category::where('name', $val)->count();
    return $count == 0;
  }

  public function isUniqueProductNameExcept($attr, $val, $params) {
    $name_old = $params[0];
    if($name_old == $val) return true;
    $count = Product::where('name', $val)->count();
    return $count == 0;
  }

  public function isUniquePromotionNameExcept($attr, $val, $params) {
    $name_old = $params[0];
    if($name_old == $val) return true;
    $count = Promotion::where('name', $val)->count();
    return $count == 0;
  }

  // check if promotion requirement item corresponds to the given promotion
  public function doesPromotionItemCorrespond($attr, $val, $params) {
    $item_type = $params[1];
    $item_id = $params[0];
    $promotion_id = $val;

    if ($item_type == 'req_item')
      $item = PromotionRequirementItem::find($item_id);
    else if ($item_type == 'reward_item')
      $item = PromotionRewardItem::find($item_id);

    $promotion = $item->promotion;
    return $promotion->id == $promotion_id;
  }
}
