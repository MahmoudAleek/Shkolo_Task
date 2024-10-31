<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ButtonController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/buttons', [ButtonController::Class, 'index']);
Route::get('/buttons/{id}', [ButtonController::Class, 'show']);
Route::post('/buttons', [ButtonController::Class, 'store']);
Route::put('/buttons/{id}', [ButtonController::Class, 'update']);
Route::delete('/buttons/{id}', [ButtonController::Class, 'destroy']);

// or we can use 
// Route::apiResource('/buttons',[ButtonController::Class]);

