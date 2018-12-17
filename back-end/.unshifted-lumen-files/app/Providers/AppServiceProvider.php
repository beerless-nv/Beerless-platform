<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
//    public function boot() {
//        $filesystem = new Filesystem(new Adapter([
//            'host'     => 'ftp.beerless.be',
//            'username' => 'beerle1q',
//            'password' => 'sselreeB1998',
//
//            // Optional FTP Settings...
//            'port'     => 21,
//            'root'     => '/assets/images/',
//            // 'passive'  => true,
//            // 'ssl'      => true,
//            // 'timeout'  => 30,
//        ]));
//    }
    /**
     * Register any application _services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment() == 'local') {
            $this->app->register('Wn\Generators\CommandsServiceProvider');
        }
        $this->app->singleton('filesystem', function ($app) {
            return $app->loadComponent('filesystems', 'Illuminate\Filesystem\FilesystemServiceProvider', 'filesystem');
        });
    }
}
