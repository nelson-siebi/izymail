---
description: comment executer le projet Nelmail
---
Pour exécuter le projet Nelmail sur votre machine locale, suivez ces deux étapes simples dans des terminaux séparés :

1. **Lancer le serveur Backend (Laravel)**
// turbo

```powershell
php artisan serve
```

*Le serveur sera accessible sur [http://127.0.0.1:8000](http://127.0.0.1:8000)*

1. **Lancer le serveur Frontend (Vite/React)**
// turbo

```powershell
npm run dev
```

*Ceci est nécessaire pour compiler les assets React et voir les changements en temps réel.*

1. **Accès au Dashboard**
Une fois les deux serveurs lancés, ouvrez votre navigateur sur [http://127.0.0.1:8000](http://127.0.0.1:8000).
Vous pourrez vous connecter ou créer un compte pour accéder au dashboard "WOW".
