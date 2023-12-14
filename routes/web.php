<?php

use App\Http\Controllers\ProfileController;
use App\Services\FMP\Controllers\FMPController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/fmp/search', [FMPController::class, 'search'])->name('fmp.search');
    Route::get('/fmp/company_profile', [FMPController::class, 'companyProfile'])->name('fmp.profile');
    Route::get('/fmp/company_quote', [FMPController::class, 'companyQuote'])->name('fmp.quote');
});

require __DIR__.'/auth.php';
