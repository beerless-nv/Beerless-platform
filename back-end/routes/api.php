<?php
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::get('/', function () {
//    return view('welcome');
// });
//
//Route::prefix('brouwerijen')->group(function() {
//    Route::get('all', 'BrouwerijController@getAll');
//    Route::get('allNaamId', 'BrouwerijController@getAllNaamId');
//    Route::get('getByNaam', 'BrouwerijController@getByNaam');
//    Route::get('get', 'BrouwerijController@get');
//    Route::post('insert', 'BrouwerijController@insert');
//    Route::post('delete', 'BrouwerijController@delete');
//    Route::post('update', 'BrouwerijController@update');
//});
//
//Route::prefix('bieren')->group(function() {
//    Route::get('all', 'BierController@getAll');
//    Route::get('getByNaam', 'BierController@getByNaam');
//    Route::get('get', 'BierController@get');
//    Route::post('uploadImage', 'BierController@uploadImage');
//    Route::post('insert', 'BierController@insert');
//    Route::post('delete', 'BierController@delete');
//    Route::post('update', 'BierController@update');
//});
//
//Route::prefix('biersoorten')->group(function() {
//    Route::get('all', 'BiersoortController@getAll');
//    Route::get('get', 'BiersoortController@get');
//});
//
// Route::group([
//     'prefix' => 'gebruikers',
//     'middleware' => 'api'
// ], function($router) {    
//     Route::post('signUp', 'GebruikerController@signUp');
//     Route::post('signIn', 'GebruikerController@signIn'); 
// });