<?php

namespace App\Services\FMP\Controllers;

use App\Http\Controllers\Controller;
use App\Services\FMP\APIHandler\ProcessExternalApiRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class FMPController extends Controller
{
    public function search(Request $request)
    {
        $cacheKey = "search_$request->keyword";
        return Cache::remember($cacheKey, 180, function () use ($request)
        {
            return ProcessExternalApiRequest::handle('GET', '/api/v3/search', [], [
                'query' => $request->keyword,
                'apikey' => config('fmp.api_key'),
            ]);
        });
    }

    public function companyProfile(Request $request)
    {
        $cacheKey = "profile_$request->symbol";
        return Cache::remember($cacheKey, 1440, function () use ($request)
        {
            return ProcessExternalApiRequest::handle('GET', '/api/v3/profile/'.$request->symbol, [], [
                'apikey' => config('fmp.api_key'),
            ]);
        });
    }

    public function companyQuote(Request $request)
    {
        $cacheKey = "quote_$request->symbol";
        return Cache::remember($cacheKey, 1440, function () use ($request)
        {
            return ProcessExternalApiRequest::handle('GET', '/api/v3/quote/'.$request->symbol, [], [
                'apikey' => config('fmp.api_key'),
            ]);
        });
    }
}
