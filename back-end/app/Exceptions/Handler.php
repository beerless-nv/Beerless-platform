<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Response;
class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if($exception instanceof TokenExpiredException){
            return Response::json(['success' => false, 'error' => 'Token Expired'], $exception->getStatusCode());
        } if ($exception instanceof TokenInvalidException) {
            return Response::json(['success' => false, 'error' => 'Token Invalid'], $exception->getStatusCode());
        } if ($exception instanceof JWTException){
            return Response::json(['success' => false, 'error' => 'Error fetching token'], $exception->getStatusCode());
        } if ($exception instanceof ModelNotFoundException) {
            return Response::json(['success' => false, 'error' => 'Rescource not available'], 404);
        } if($exception instanceof \InvalidArgumentException) {
            return Response::json(['success' => false, 'error' => $exception->getMessage()], 400);
        }
        return parent::render($request, $exception);
    }
}
