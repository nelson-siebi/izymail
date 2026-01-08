<x-mail::message>
    # Nouveau message de contact

    Vous avez reçu un nouveau message depuis le formulaire de contact de Izymail.

    **Nom :** {{ $data['name'] }}
    **Email :** {{ $data['email'] }}

    **Message :**
    {{ $data['message'] }}

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>