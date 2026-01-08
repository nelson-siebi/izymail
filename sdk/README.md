# Izymail PHP SDK

The official PHP SDK for Izymail API. Simplify your email sending integration.

## Installation

```bash
composer require nelsius/izymail-php
```

## Configuration

### Global Configuration (Recommended)

You can set your credentials once at the beginning of your application:

```php
use Izymail\Config;

Config::setApiKey('izy_live_...');
Config::setBaseUrl('https://izymail.nelsius.com/api'); // Useful for local testing
```

### Environment Variables

The SDK also automatically looks for these environment variables:

- `IZYMAIL_API_KEY`
- `IZYMAIL_BASE_URL`

## Basic Usage

```php
use Izymail\Izymail;

$izymail = new Izymail();
$izymail->compose()
    ->from('contact@votre-domaine.com', 'Votre Nom')
    ->to('client@email.com')
    ->subject('Bienvenue')
    ->html('<h1>Bonjour !</h1>')
    ->send();
```

## Advanced Usage

### Sandbox Mode

Useful for testing without actually sending emails.

```php
$izymail->compose()
    ->to('test@test.com')
    ->subject('Test Subject')
    ->html('...')
    ->sandbox()
    ->send();
```

### Response Handling

```php
try {
    $izymail->send($message);
} catch (\Izymail\Exceptions\IzymailException $e) {
    echo "Error: " . $e->getMessage();
}
```

## License

MIT
