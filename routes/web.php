<?php

use Illuminate\Support\Facades\Route;



// Home Data Manage....
Route::get('CountSummary', 'App\Http\Controllers\HomeController@CountSummary')->middleware('loginCheck');

// //Contact Data Manage....

 Route::get('ContactList', 'App\Http\Controllers\ContactController@ContactList')->middleware('loginCheck');
 Route::post('ContactDelete', 'App\Http\Controllers\ContactController@ContactDelete')->middleware('loginCheck');
// Route::post('/ContactDelete','ContactController@ContactDelete')->middleware('loginCheck');


// //Courses Data Manage....
Route::get('CourseList', 'App\Http\Controllers\CourseController@CourseList')->middleware('loginCheck');
Route::post('CourseDelete', 'App\Http\Controllers\CourseController@CourseDelete')->middleware('loginCheck');
// Route::get('/CourseList','CourseController@CourseList')->middleware('loginCheck');
// Route::post('/CourseDelete','CourseController@CourseDelete')->middleware('loginCheck');


// //Project Data Manage....
Route::get('ProjectList', 'App\Http\Controllers\ProjectController@ProjectList')->middleware('loginCheck');
Route::post('ProjectDelete', 'App\Http\Controllers\ProjectController@ProjectDelete')->middleware('loginCheck');
Route::post('/AddProject','App\Http\Controllers\ProjectController@AddProject')->middleware('loginCheck');

// //Service Data Manage....
Route::get('ServiceList', 'App\Http\Controllers\ServiceController@ServiceList')->middleware('loginCheck');
Route::post('ServiceDelete', 'App\Http\Controllers\ServiceController@ServiceDelete')->middleware('loginCheck');
// Route::get('/ServiceList','ServiceController@ServiceList')->middleware('loginCheck');
// Route::post('/ServiceDelete','ServiceController@ServiceDelete')->middleware('loginCheck');
// Route::post('/AddService','ServiceController@AddService')->middleware('loginCheck');



//Review Data Manage....
Route::get('ReviewList', 'App\Http\Controllers\ReviewController@ReviewList')->middleware('loginCheck');
Route::post('ReviewDelete', 'App\Http\Controllers\ReviewController@ReviewDelete')->middleware('loginCheck');
Route::post('AddReview','App\Http\Controllers\ReviewController@AddReview')->middleware('loginCheck');
// Route::post('editReview', 'App\Http\Controllers\ReviewController@editReview')->middleware('loginCheck');
Route::get('editReview/{id}', 'App\Http\Controllers\ReviewController@editReview')->middleware('loginCheck');
Route::post('UpdateReview/{id}','App\Http\Controllers\ReviewController@UpdateReview')->middleware('loginCheck');

//Login/Logout
Route::get('/Login','App\Http\Controllers\AdminLoginController@LoginPage');
Route::get('/onLogin/{UserName}/{Password}','App\Http\Controllers\AdminLoginController@onLogin');
Route::get('/Logout','App\Http\Controllers\AdminLoginController@onLogout');


Route::get('/', function () {
    return view('index');
})->middleware('loginCheck');

Route::get('{AnyRoute}', function () {
    return view('index');
})->where('AnyRoute','.*')->middleware('loginCheck');
