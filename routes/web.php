<?php

use Illuminate\Support\Facades\Route;
use App\Http\controllers\HomeController;
use App\Http\controllers\Authcontroller;
use App\Http\controllers\VendorController;
use App\Http\controllers\ThingsController;
use App\Http\controllers\StudentsController;

use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//root page
Route::get('/', function () {

    return view('theme.home');

})->middleware('auth');

//vendors module

Route::resource('/vendors', vendorController::class)->middleware('auth');
Route::get('vendor_export',[vendorController::class, 'get_vendor_data'])->name('vendor.export');


//Products
Route::resource('/products', ThingsController::class)->middleware('auth');


//students
Route::resource('/students', StudentsController::class)->middleware('auth');

//Route::get('student_export',[StudentsController::class, 'get_student_data'])->name('student.export');

///Authentication

Route::controller(Authcontroller::class)->group(function(){

    Route::get('login', 'index')->name('login');

    Route::get('registration', 'registration')->name('registration');

    Route::get('logout', 'logout')->name('logout');

    Route::post('validate_registration', 'validate_registration')->name('sample.validate_registration');

    Route::post('validate_login', 'validate_login')->name('sample.validate_login');

    //Route::get('theme.home', 'dashboard')->name('/');
});

