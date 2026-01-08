<?php

namespace Izymail;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\GuzzleException;
use Izymail\Exceptions\IzymailException;

class Izymail
{
    protected string $apiKey;
    protected string $baseUrl;
    protected Client $httpClient;

    public function __construct(?string $apiKey = null, ?string $baseUrl = null)
    {
        $this->apiKey = $apiKey ?? Config::getApiKey() ?? '';
        $this->baseUrl = rtrim($baseUrl ?? Config::getBaseUrl(), '/');
        $this->httpClient = new Client();
    }

    /**
     * Start a new message.
     */
    public function compose(): Message
    {
        return new Message();
    }

    /**
     * Send a message.
     * 
     * @param Message $message
     * @return array
     * @throws IzymailException
     */
    public function send(Message $message): array
    {
        try {
            $response = $this->httpClient->post("{$this->baseUrl}/send", [
                'headers' => [
                    'Authorization' => "Bearer {$this->apiKey}",
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
                'json' => $message->toArray()
            ]);

            return json_decode($response->getBody()->getContents(), true);

        } catch (RequestException $e) {
            $message = $e->getMessage();
            if ($e->hasResponse()) {
                $body = json_decode($e->getResponse()->getBody()->getContents(), true);
                $message = $body['message'] ?? $message;
            }
            throw new IzymailException($message, $e->getCode(), $e);
        } catch (GuzzleException $e) {
            throw new IzymailException($e->getMessage(), $e->getCode(), $e);
        }
    }
}
