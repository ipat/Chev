<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	protected $table = 'user';
	protected $hidden = array('password');

	public function isAdmin() {
		return $this->level == 1;
	}

	public function addresses() {
		return $this->hasMany('UserAddress', 'user_id');
	}

	public function toArray() {
		return array(
			'id' => intval($this->id),
			'email' => $this->email,
			'facebook' => $this->facebook != null,
			'level' => intval($this->level),
			'tel' => $this->tel,
			'default_address_id' => $this->default_address_id ? intval($this->default_address_id) : null,
			'addresses' => $this->addresses->toArray(),
			'name_first' => $this->name_first,
			'name_last' => $this->name_last,
			'updated_at' => $this->updated_at,
			'created_at' => $this->created_at,
		);
	}

	public function toArraySelf() {
		return array(
			'id' => intval($this->id),
			'email' => $this->email,
			'facebook' => $this->facebook != null,
			'level' => intval($this->level),
			'tel' => $this->tel,
			'default_address_id' => $this->default_address_id ? intval($this->default_address_id) : null,
			'name_first' => $this->name_first,
			'name_last' => $this->name_list,
			'updated_at' => $this->updated_at,
			'created_at' => $this->created_at,
		);
	}

	public function delete() {
		$addresses = $this->addresses;
		foreach ($addresses as $address) {
			$address->delete();
		}

		parent::delete();
	}

	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier() {
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword() {
		return $this->password;
	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail() {
		return $this->email;
	}

	public function getRememberToken() {
		return $this->remember_token;
	}

	public function setRememberToken($value) {
		$this->remember_token = $value;
	}

	public function getRememberTokenName() {
		return 'remember_token';
	}

}
