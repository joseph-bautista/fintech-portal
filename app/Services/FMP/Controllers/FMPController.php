<?php

namespace App\Services\FMP\Controllers;

use App\Http\Controllers\Controller;
use App\Services\FMP\APIHandler\ProcessExternalApiRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

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
        $cacheKey = "profile_$request->keyword";
        return Cache::remember($cacheKey, 1440, function () use ($request)
        {
            return ProcessExternalApiRequest::handle('GET', '/api/v3/profile/'.$request->symbol, [], [
                'query' => $request->keyword,
                'apikey' => config('fmp.api_key'),
            ]);
        });
    }

    public function companyQuote(Request $request)
    {
        $cacheKey = "quote_$request->keyword";
        return Cache::remember($cacheKey, 1440, function () use ($request)
        {
            return ProcessExternalApiRequest::handle('GET', '/api/v3/quote/'.$request->symbol, [], [
                'query' => $request->keyword,
                'apikey' => config('fmp.api_key'),
            ]);
        });
    }
}
