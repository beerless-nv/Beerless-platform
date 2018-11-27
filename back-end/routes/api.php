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

Route::prefix('breweries')->group(function() {
    Route::get('/allNameId', 'BreweryController@getAllNameId');
    Route::get('/getByName', 'BreweryController@getByName');

    Route::get('/', 'BreweryController@getAll');    
    Route::post('/', 'BreweryController@insert');   
    Route::get('/{breweryId}', 'BreweryController@get');
    Route::get('/search', 'BreweryController@search');
    Route::delete('/{breweryId}', 'BreweryController@delete');
    Route::patch('/{breweryId}', 'BreweryController@patch');
});

Route::prefix('beers')->group(function() {
    Route::get('/getByName', 'BeerController@getByName');
    Route::get('/getNewest', 'BeerController@getNewest');
    Route::post('/uploadImage', 'BeerController@uploadImage');

    Route::get('/', 'BeerController@getAll');    
    Route::post('/', 'BeerController@insert');   
    Route::get('/{beerId}', 'BeerController@get');
    Route::get('/search', 'BeerController@search');
    Route::delete('/{beerId}', 'BeerController@delete');
    Route::patch('/{beerId}', 'BeerController@patch');
});

Route::prefix('beertypes')->group(function() {
    Route::get('/', 'BeertypeController@getAll');
    Route::post('/', 'BeertypeController@insert');
    Route::get('/{beerTypeId}', 'BeertypeController@get');
    Route::get('/search', 'BeertypeController@search');
    Route::delete('/{beerTypeId}', 'BeertypeController@delete');
    Route::patch('/{beerTypeId}', 'BeertypeController@patch');
});

Route::prefix('users')->group(function() {
    Route::get('/', 'UserController@getAll');    
    Route::post('/', 'UserController@insert');   
    Route::get('/{userId}', 'userController@get');
    Route::get('/search', 'userController@search');
    Route::delete('/{userId}', 'UserController@delete');
    Route::patch('/{userId}', 'UserController@patch');

    Route::post('/auth', 'UserController@signIn'); 
});
