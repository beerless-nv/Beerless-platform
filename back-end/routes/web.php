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

Route::prefix('brouwerijen')->group(function() {
    Route::get('all', 'BrouwerijController@getAll');
    Route::get('allNaamId', 'BrouwerijController@getAllNaamId');
    Route::get('getByNaam', 'BrouwerijController@getByNaam');
    Route::get('get', 'BrouwerijController@get');
    Route::post('insert', 'BrouwerijController@insert');
    Route::post('delete', 'BrouwerijController@delete');
    Route::post('update', 'BrouwerijController@update');
});

Route::prefix('bieren')->group(function() {
    Route::get('all', 'BierController@getAll');
    Route::get('getByNaam', 'BierController@getByNaam');
    Route::get('getNewest', 'BierController@getNewest');
    Route::get('get', 'BierController@get');
    Route::post('uploadImage', 'BierController@uploadImage');
    Route::post('insert', 'BierController@insert');
    Route::post('delete', 'BierController@delete');
    Route::post('update', 'BierController@update');
});

Route::prefix('biersoorten')->group(function() {
    Route::get('all', 'BiersoortController@getAll');
    Route::get('get', 'BiersoortController@get');
});

Route::prefix('gebruikers')->group(function() {
    Route::get('all', 'GebruikerController@getAll');
    Route::post('login', 'GebruikerController@login');
    Route::post('signUp', 'GebruikerController@signUp');
    Route::post('signIn', 'GebruikerController@signIn');    
});
