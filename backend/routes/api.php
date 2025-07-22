<?php

use App\Http\Controllers\MedalController;
use App\Http\Controllers\CountryController;
use Illuminate\Support\Facades\Route;

// Rutas personalizadas primero
Route::patch("/medals/{id}/assign-country", [MedalController::class, "assignCountry"]);
Route::get("/medals/by-country/{id}", [MedalController::class, "getByCountry"]);
Route::get("/medals/available", [MedalController::class, "availableMedals"]);
Route::get('/countries/{id}/medals', [CountryController::class, 'medalsByCountry']);

// Rutas RESTful después
Route::apiResource('countries', CountryController::class);
Route::apiResource("medals", MedalController::class);
