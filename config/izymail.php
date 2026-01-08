<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Nelmail Default Limits
    |--------------------------------------------------------------------------
    |
    | These values are used when a user does not have an active premium plan.
    |
    */

    'default_daily_limit' => 100,

    'default_sandbox_limit' => 50,

    /*
    |--------------------------------------------------------------------------
    | Nelsius Payment Integration
    |--------------------------------------------------------------------------
    */
    'nelsius_api_key' => env('NELSIUS_API_KEY'),
    'nelsius_base_url' => env('NELSIUS_BASE_URL', 'http://localhost:8000/api/v1'), // Default to local for dev
];
