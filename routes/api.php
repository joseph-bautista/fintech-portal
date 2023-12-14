<?php

use App\Services\FMP\Controllers\FMPController;
use Illuminate\Support\Facades\Route;

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
Route::prefix('v1')->group(function () {
    Route::prefix('fmp')->group(function () {
        // Route::middleware('auth')->group(function () {
            Route::get('search', [FMPController::class, 'search']);
            Route::get('company_profile', [FMPController::class, 'companyProfile']);
            Route::get('company_quote', [FMPController::class, 'companyQuote']);
        // });
    });
});