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
    $router->get('get','BrouwerijController@get');
});

$router->group(['prefix' => 'bieren'], function () use ($router){
    $router->get('all', 'BierController@getAll');
    $router->get('get','BierController@get');
});