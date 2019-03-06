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

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('relationships')->group(function() {
    Route::post('/search', 'RelationshipController@search');
    Route::get('/', 'RelationshipController@getAll');    
    Route::post('/', 'RelationshipController@insert');   
    Route::get('/{relationshipId}', 'RelationshipController@get');
    
    Route::delete('/{relationshipId}', 'RelationshipController@delete');
    Route::patch('/{relationshipId}', 'RelationshipController@patch');
});

Route::prefix('statuses')->group(function() {
    Route::post('/search', 'StatusController@search');
    Route::get('/', 'StatusController@getAll');    
    Route::post('/', 'StatusController@insert');   
    Route::get('/{statusId}', 'StatusController@get');
    
    Route::delete('/{statusId}', 'StatusController@delete');
    Route::patch('/{statusId}', 'StatusController@patch');
});

Route::prefix('activitytypes')->group(function() {
    Route::post('/search', 'ActivityTypeController@search');
    Route::get('/', 'ActivityTypeController@getAll');    
    Route::post('/', 'ActivityTypeController@insert');   
    Route::get('/{activitytypeId}', 'ActivityTypeController@get');
    
    Route::delete('/{activitytypeId}', 'ActivityTypeController@delete');
    Route::patch('/{activitytypeId}', 'ActivityTypeController@patch');
});

Route::prefix('activities')->group(function() {
    Route::post('/search', 'ActivityController@search');
    Route::get('/', 'ActivityController@getAll');    
    Route::post('/', 'ActivityController@insert');   
    Route::get('/{activityId}', 'ActivityController@get');
    
    Route::delete('/{activityId}', 'ActivityController@delete');
    Route::patch('/{activityId}', 'ActivityController@patch');
});

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
    Route::post('/search', 'BreweryController@search');

    Route::get('/', 'BreweryController@getAll');    
    Route::post('/', 'BreweryController@insert');   
    Route::get('/{breweryId}', 'BreweryController@get');
    
    Route::delete('/{breweryId}', 'BreweryController@delete');
    Route::patch('/{breweryId}', 'BreweryController@patch');
});

Route::prefix('beers')->group(function() {
    Route::post('/uploadImage', 'BeerController@uploadImage');
    Route::get('/new', 'BeerController@getNewest');

    Route::post('/search', 'BeerController@search');
    Route::get('/', 'BeerController@getAll');    
    Route::post('/', 'BeerController@insert');   
    Route::get('/{beerId}', 'BeerController@get');

    Route::delete('/{beerId}', 'BeerController@delete');
    Route::patch('/{beerId}', 'BeerController@patch');
});

Route::prefix('beertypes')->group(function() {
    Route::post('/search', 'BeertypeController@search');

    Route::get('/', 'BeertypeController@getAll');
    Route::post('/', 'BeertypeController@insert');
    Route::get('/{beertypeId}', 'BeertypeController@get');
    
    Route::delete('/{beertypeId}', 'BeertypeController@delete');
    Route::patch('/{beertypeId}', 'BeertypeController@patch');
});

Route::prefix('users')->group(function() {
    Route::post('/uploadPicture', 'UserController@uploadPicture');

    Route::post('/signUp', 'UserController@signUp');
    Route::post('/signIn', 'UserController@signIn');
    Route::post('/search', 'UserController@search');
    Route::post('/socialToken', 'UserController@getSocialToken');

    Route::get('/', 'UserController@getAll');   
    Route::get('/{userId}', 'UserController@get');
    Route::post('/', 'UserController@insert');
    Route::delete('/{userId}', 'UserController@delete');
    Route::patch('/patchProfile/{userId}', 'UserController@patchProfile');
    Route::patch('/patchAddress/{userId}', 'UserController@patchAddress');
});

Route::prefix('usersocials')->group(function() {
    Route::post('/search', 'UserSocialController@search');

    Route::get('/{userId}', 'UserSocialController@get');
    Route::post('/', 'UserSocialController@insert');
});
