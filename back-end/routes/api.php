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
    Route::get('/', 'RelationshipController@getAll');
    Route::get('/{relationshipId}', 'RelationshipController@get');
    Route::post('/search', 'RelationshipController@search');

    Route::post('/', 'RelationshipController@insert');
    Route::patch('/{relationshipId}', 'RelationshipController@patch');
    Route::delete('/{relationshipId}', 'RelationshipController@delete');
});

Route::prefix('statuses')->group(function() {
    Route::get('/', 'StatusController@getAll');
    Route::get('/{statusId}', 'StatusController@get');
    Route::post('/search', 'StatusController@search');

    Route::post('/', 'StatusController@insert');
    Route::patch('/{statusId}', 'StatusController@patch');
    Route::delete('/{statusId}', 'StatusController@delete');
});

Route::prefix('activitytypes')->group(function() {
    Route::get('/', 'ActivityTypeController@getAll');
    Route::get('/{activitytypeId}', 'ActivityTypeController@get');
    Route::post('/search', 'ActivityTypeController@search');

    Route::post('/', 'ActivityTypeController@insert');
    Route::patch('/{activitytypeId}', 'ActivityTypeController@patch');
    Route::delete('/{activitytypeId}', 'ActivityTypeController@delete');
});

Route::prefix('activities')->group(function() {
    Route::get('/', 'ActivityController@getAll');
    Route::get('/{activityId}', 'ActivityController@get');
    Route::post('/search', 'ActivityController@search');

    Route::post('/', 'ActivityController@insert');
    Route::patch('/{activityId}', 'ActivityController@patch');
    Route::delete('/{activityId}', 'ActivityController@delete');
});

Route::prefix('articletags')->group(function() {
    Route::get('/', 'ArticleTagController@getAll');
    Route::get('/{articletagId}', 'ArticleTagController@get');
    Route::post('/search', 'ArticleTagController@search');

    Route::post('/', 'ArticleTagController@insert');
    Route::patch('/{articletagId}', 'ArticleTagController@patch');
    Route::delete('/{articletagId}', 'ArticleTagController@delete');
});

Route::prefix('tags')->group(function() {
    Route::get('/', 'TagController@getAll');
    Route::get('/{tagId}', 'TagController@get');
    Route::post('/search', 'TagController@search');

    Route::post('/', 'TagController@insert');
    Route::patch('/{tagId}', 'TagController@patch');
    Route::delete('/{tagId}', 'TagController@delete');
});

Route::prefix('articles')->group(function() {
    Route::get('/', 'ArticleController@getAll');
    Route::get('/{articleId}', 'ArticleController@get');
    Route::post('/search', 'ArticleController@search');

    Route::post('/', 'ArticleController@insert');
    Route::patch('/{articleId}', 'ArticleController@patch');
    Route::delete('/{articleId}', 'ArticleController@delete');
});

Route::prefix('breweries')->group(function() {
    Route::get('/', 'BreweryController@getAll');
    Route::get('/{breweryId}', 'BreweryController@get');
    Route::post('/search', 'BreweryController@search');

    Route::post('/', 'BreweryController@insert');
    Route::patch('/{breweryId}', 'BreweryController@patch');
    Route::delete('/{breweryId}', 'BreweryController@delete');
});

Route::prefix('beers')->group(function() {
    Route::post('/uploadImage', 'BeerController@uploadImage');
    Route::get('/new', 'BeerController@getNewest');

    Route::get('/', 'BeerController@getAll');
    Route::get('/{beerId}', 'BeerController@get');
    Route::post('/search', 'BeerController@search');

    Route::post('/', 'BeerController@insert');
    Route::patch('/{beerId}', 'BeerController@patch');
    Route::delete('/{beerId}', 'BeerController@delete');
});

Route::prefix('beertypes')->group(function() {
    Route::get('/', 'BeertypeController@getAll');
    Route::get('/{beertypeId}', 'BeertypeController@get');
    Route::post('/search', 'BeertypeController@search');

    Route::post('/', 'BeertypeController@insert');
    Route::patch('/{beertypeId}', 'BeertypeController@patch');
    Route::delete('/{beertypeId}', 'BeertypeController@delete');
});

Route::prefix('users')->group(function() {
    Route::post('/uploadPicture', 'UserController@uploadPicture');
    Route::post('/signUp', 'UserController@signUp');
    Route::post('/signIn', 'UserController@signIn');
    Route::post('/socialToken', 'UserController@getSocialToken');

    Route::get('/', 'UserController@getAll');   
    Route::get('/{userId}', 'UserController@get');
    Route::post('/search', 'UserController@search');

    Route::post('/', 'UserController@insert');
    Route::patch('/patchProfile/{userId}', 'UserController@patchProfile');
    Route::patch('/patchAddress/{userId}', 'UserController@patchAddress');
    Route::delete('/{userId}', 'UserController@delete');
});

Route::prefix('usersocials')->group(function() {
    Route::get('/', 'UserSocialController@getAll');
    Route::get('/{userId}', 'UserSocialController@get');
    Route::post('/search', 'UserSocialController@search');

    Route::post('/', 'UserSocialController@insert');
    Route::patch('/{usersocialId}', 'UserSocialController@patch');
    Route::delete('/{usersocialId}', 'UserSocialController@delete');
});
