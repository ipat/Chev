<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});


Route::resource('user', 'UserController');
Route::get('is-login', 'UserController@isLogin');
Route::post('login', 'UserController@login');

Route::post('logout', 'UserController@logout');

// use for facebook login if you need to ask p'TA later
//Route::post('facebook', 'UserController@facebook');
//Route::get('has-email', 'UserController@hasEmail');
//Route::get('has-name', 'UserController@hasName');

// sometimes we have more than 1 place, Is it neccesary?? 
Route::resource('user-address', 'UserAddressController');