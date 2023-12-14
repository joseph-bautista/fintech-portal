<?php 

namespace App\Services\FMP\APIHandler;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProcessExternalApiRequest {

    public static function handle($method, $path, $body = [], $query_params = [] ) {

       try {

            $client = new Client([
                'base_uri' =>  config('fmp.base_url'),
            ]);

            $response = $client->request($method, $path, [
                'query' => $query_params,
                'form_params' => $body
            ]);
            

            return json_decode($response->getBody());
        }
        catch (GuzzleException $error) {
            throw new HttpResponseException(
                response()->json(array(
                    "message" => json_decode($error->getResponse()->getBody(), true)['Error Message']
                ), 422));
    
        }
    }

}