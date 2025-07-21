<?php

use App\Http\Controllers\AuthorsController;
use App\Http\Controllers\NewsesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get("/", function (){
    return "Welcome! to JTV";
});



Route::apiResource('newses', NewsesController::class);

Route::apiResource( 'authors', AuthorsController::class);

// Route::get('authors/{authors}', [AuthorsController::class, 'show']);