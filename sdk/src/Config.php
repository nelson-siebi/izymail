<?php

namespace Izymail;

class Config
{
    protected static ?string $apiKey = null;
    protected static string $baseUrl = 'https://izymail.nelsius.com/api';

    /**
     * Set global API Key.
     */
    public static function setApiKey(string $apiKey): void
    {
        self::$apiKey = $apiKey;
    }

    /**
     * Set global Base URL.
     */
    public static function setBaseUrl(string $baseUrl): void
    {
        self::$baseUrl = rtrim($baseUrl, '/');
    }

    /**
     * Get API Key (checks static property then env).
     */
    public static function getApiKey(): ?string
    {
        return self::$apiKey ?? getenv('IZYMAIL_API_KEY') ?: null;
    }

    /**
     * Get Base URL (checks static property then env).
     */
    public static function getBaseUrl(): string
    {
        return self::$baseUrl !== 'https://izymail.nelsius.com/api'
            ? self::$baseUrl
            : (getenv('IZYMAIL_BASE_URL') ?: self::$baseUrl);
    }
}
