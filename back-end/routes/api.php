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

Route::prefix('articletags')->group(function() {
    Route::post('/search', 'ArticleTagController@search');
    Route::get('/', 'ArticleTagController@getAll');    
    Route::post('/', 'ArticleTagController@insert');   
    Route::get('/{articletagId}', 'ArticleTagController@get');
    
    Route::delete('/{articletagId}', 'ArticleTagController@delete');
    Route::patch('/{articletagId}', 'ArticleTagController@patch');
});

Route::prefix('tags')->group(function() {
    Route::post('/search', 'TagController@search');
    Route::get('/', 'TagController@getAll');    
    Route::post('/', 'TagController@insert');   
    Route::get('/{tagId}', 'TagController@get');
    
    Route::delete('/{tagId}', 'TagController@delete');
    Route::patch('/{tagId}', 'TagController@patch');
});

Route::prefix('articles')->group(function() {
    Route::post('/search', 'ArticleController@search');
    Route::get('/', 'ArticleController@getAll');    
    Route::post('/', 'ArticleController@insert');   
    Route::get('/{articleId}', 'ArticleController@get');
    
    Route::delete('/{articleId}', 'ArticleController@delete');
    Route::patch('/{articleId}', 'ArticleController@patch');
});

Route::prefix('breweries')->group(function() {
    Route::get('/allNameId', 'BreweryController@getAllNameId');
    Route::get('/getByName', 'BreweryController@getByName');
    Route::get('/search', 'BreweryController@search');

    Route::get('/', 'BreweryController@getAll');    
    Route::post('/', 'BreweryController@insert');   
    Route::get('/{breweryId}', 'BreweryController@get');
    
    Route::delete('/{breweryId}', 'BreweryController@delete');
    Route::patch('/{breweryId}', 'BreweryController@patch');
});

Route::prefix('beers')->group(function() {
    Route::post('/uploadImage', 'BeerController@uploadImage');

    Route::post('/search', 'BeerController@search');
    Route::get('/', 'BeerController@getAll');    
    Route::post('/', 'BeerController@insert');   
    Route::get('/{beerId}', 'BeerController@get');
    
    Route::delete('/{beerId}', 'BeerController@delete');
    Route::patch('/{beerId}', 'BeerController@patch');
});

Route::prefix('beertypes')->group(function() {
    Route::get('/search', 'BeertypeController@search');

    Route::get('/', 'BeertypeController@getAll');
    Route::post('/', 'BeertypeController@insert');
    Route::get('/{beertypeId}', 'BeertypeController@get');
    
    Route::delete('/{beertypeId}', 'BeertypeController@delete');
    Route::patch('/{beertypeId}', 'BeertypeController@patch');
});

Route::prefix('users')->group(function() {
    Route::post('/signUp', 'UserController@signUp');  
    Route::post('/signIn', 'UserController@signIn'); 
    Route::get('/search', 'UserController@search');

    Route::get('/', 'UserController@getAll');   
    Route::get('/{userId}', 'userController@get');
    Route::get('/search', 'userController@search');
    Route::delete('/{userId}', 'UserController@delete');
    Route::patch('/{userId}', 'UserController@patch');     
});
