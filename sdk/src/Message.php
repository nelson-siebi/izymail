<?php

namespace Izymail;

class Message
{
    protected array $data = [
        'to' => null,
        'subject' => null,
        'from_name' => null,
        'html' => null,
        'text' => null,
        'sandbox' => false,
        'attachments' => []
    ];

    public function to(string $email): self
    {
        $this->data['to'] = $email;
        return $this;
    }

    public function subject(string $subject): self
    {
        $this->data['subject'] = $subject;
        return $this;
    }

    public function fromName(string $name): self
    {
        $this->data['from_name'] = $name;
        return $this;
    }

    public function html(string $content): self
    {
        $this->data['html'] = $content;
        return $this;
    }

    public function text(string $content): self
    {
        $this->data['text'] = $content;
        return $this;
    }

    public function sandbox(bool $enabled = true): self
    {
        $this->data['sandbox'] = $enabled;
        return $this;
    }

    public function attach(string $path): self
    {
        $this->data['attachments'][] = $path;
        return $this;
    }

    public function toArray(): array
    {
        return array_filter($this->data, fn($value) => $value !== null);
    }
}
