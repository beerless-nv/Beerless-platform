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

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'brouwerijen'], function () use ($router){
    $router->get('all', 'BrouwerijController@getAll');
    $router->get('allNaamId', 'BrouwerijController@getAllNaamId');
    $router->get('getByNaam', 'BrouwerijController@getByNaam');
    $router->get('get','BrouwerijController@get');
    $router->post('insert', 'BrouwerijController@insert');
    $router->post('delete', 'BrouwerijController@delete');
    $router->post('update', 'BrouwerijController@update');
});

$router->group(['prefix' => 'bieren'], function () use ($router){
    $router->get('all', 'BierController@getAll');
    $router->get('getByNaam', 'BierController@getByNaam');
    $router->get('get','BierController@get');
    $router->post('insert', 'BierController@insert');
    $router->post('delete', 'BierController@delete');
    $router->post('update', 'BierController@update');
});

$router->group(['prefix' => 'biersoorten'], function () use ($router){
    $router->get('all', 'BiersoortController@getAll');
    $router->get('get','BiersoortController@get');
});