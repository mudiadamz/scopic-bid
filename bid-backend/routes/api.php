<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BidController;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('logout', [AuthController::class, 'logout']);
Route::get('items', [ItemController::class, 'index']);
Route::get('items/{id}', [ItemController::class, 'show']);
Route::post('items', [ItemController::class, 'store']);
Route::put('items/{id}', [ItemController::class, 'update']);
Route::delete('items/{id}', [ItemController::class, 'delete']);
Route::get('bid_history/{id}', [BidController::class, 'history']);

Route::middleware('auth:sanctum')->group(function (){
    Route::post('bid/{id}', [BidController::class, 'bid']);
    Route::post('user/update', [AuthController::class, 'update_user']);
    Route::get('me', [AuthController::class, 'me']);
});
