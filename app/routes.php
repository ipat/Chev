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

Route::get('hello', function()
{
	return "Hello";
});


Route::get('is-login', 'UserController@isLogin');
Route::post('login', 'UserController@login');
// Route::post('signup', 'UserController@store');
Route::get('logout', 'UserController@logout');
Route::resource('user', 'UserController');
Route::resource('product','ProductController');
Route::resource('cart','CartController');
Route::post('logout', 'UserController@logout');
Route::post('facebook', 'UserController@facebook');
Route::resource('order','OrderController');

// use for facebook login if you need to ask p'TA later
//Route::post('facebook', 'UserController@facebook');
//Route::get('has-email', 'UserController@hasEmail');
//Route::get('has-name', 'UserController@hasName');

// sometimes we have more than 1 place, Is it neccesary?? 
Route::resource('user-address', 'UserAddressController');
Route::post('updateEmail','UserController@updateEmail');

// Route submit of forgotten password form to the UserController
Route::post('forget', 'UserController@forgotpassword');
Route::get('resetpassword/{resetcode}', 'UserController@resetpassword');

Route::post('changepassword','UserController@changepassword');