<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::prefix('brewery')->group(function() {
    Route::get('all', 'BreweryController@getAll');
    Route::get('allNameId', 'BreweryController@getAllNameId');
    Route::get('getByName', 'BreweryController@getByName');
    Route::get('get', 'BreweryController@get');
    Route::post('insert', 'BreweryController@insert');
    Route::post('delete', 'BreweryController@delete');
    Route::post('update', 'BreweryController@update');
});

Route::prefix('beer')->group(function() {
    Route::get('all', 'BeerController@getAll');
    Route::get('getByName', 'BeerController@getByName');
    Route::get('getNewest', 'BeerController@getNewest');
    Route::get('get', 'BeerController@get');
    Route::post('uploadImage', 'BeerController@uploadImage');
    Route::post('insert', 'BeerController@insert');
    Route::post('delete', 'BeerController@delete');
    Route::post('update', 'BeerController@update');
});

Route::prefix('beertype')->group(function() {
    Route::get('all', 'BeertypeController@getAll');
    Route::get('get', 'BeertypeController@get');
});

Route::prefix('user')->group(function() {
    Route::get('all', 'UserController@getAll');
    Route::post('signUp', 'UserController@signUp');
    Route::post('signIn', 'UserController@signIn');    
});
