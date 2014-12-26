<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	//
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	//if (Auth::guest()) return Redirect::guest('user/login');
	if(!Auth::check()) {
		App::abort(401, json_encode(array(
			'because' => 'not_login',
			'csrf_token' => csrf_token()
		)));
	}
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

Route::filter('admin', function () {
	if(! (Auth::check() and Auth::user()->isAdmin())) {
		App::abort(401, 'not_admin');
	}
});

//Use only at user/login when logged in user try to login again.
//automatically redirect to the proper page.
Route::filter('not-auth', function() {
	if(Auth::check()) {
		App::abort(400, 'logged_in');
	}
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	$a = Session::token();
	$b = Input::get('_token');
	if ($a != $b)	{
		App::abort(400, 'csrf');
	}
});
