import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Card } from "@/Components/UI/Card";
import { Button } from "@/Components/UI/Button";
import {
    Terminal,
    Code2,
    Copy,
    CheckCircle2,
    Server,
    Zap,
    BookOpen,
    Shield,
    Globe,
    ChevronDown,
    Activity
} from "lucide-react";
import { cn } from "@/Lib/utils";

const languages = [
    { id: 'curl', name: 'cURL' },
    { id: 'php', name: 'PHP' },
    { id: 'js', name: 'Node.js' },
    { id: 'python', name: 'Python' }
];

const codeExamples = {
    send: {
        curl: `curl -X POST https://izymail.nelsius.com/api/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "client@example.com",
    "subject": "Votre commande #12345",
    "html": "<h1>Bonjour !</h1><p>Votre commande est confirmée.</p>"
  }'`,
        php: `$client = new \\GuzzleHttp\\Client();

$response = $client->post('https://izymail.nelsius.com/api/send', [
    'headers' => [
        'Authorization' => 'Bearer YOUR_API_KEY',
        'Content-Type' => 'application/json',
    ],
    'json' => [
        'to' => 'client@example.com',
        'subject' => 'Votre commande #12345',
        'html' => '<h1>Bonjour !</h1><p>Votre commande est confirmée.</p>'
    ]
]);`,
        js: `const response = await fetch('https://izymail.nelsius.com/api/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'client@example.com',
    subject: 'Votre commande #12345',
    html: '<h1>Bonjour !</h1><p>Votre commande est confirmée.</p>'
  })
});

const data = await response.json();`,
        python: `import requests

url = "https://izymail.nelsius.com/api/send"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "to": "client@example.com",
    "subject": "Votre commande #12345",
    "html": "<h1>Bonjour !</h1><p>Votre commande est confirmée.</p>"
}

response = requests.post(url, json=payload, headers=headers)`
    },
    bulk: {
        curl: `curl -X POST https://izymail.nelsius.com/api/send/bulk \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "recipients": ["client1@example.com", "client2@example.com"],
    "subject": "Newsletter de Janvier",
    "html": "<body>...</body>"
  }'`,
        php: `$response = $client->post('https://izymail.nelsius.com/api/send/bulk', [
    'headers' => ['Authorization' => 'Bearer KEY'],
    'json' => [
        'recipients' => ['client1@example.com', 'client2@example.com'],
        'subject' => 'Newsletter de Janvier',
        'html' => '<body>...</body>'
    ]
]);`,
        js: `// Envoi de masse optimisé
const response = await fetch('https://izymail.nelsius.com/api/send/bulk', {
  // ... configuration similaire
});`,
        python: `# Envoi de masse
response = requests.post("https://izymail.nelsius.com/api/send/bulk", ...)`
    }
};

const CodeBlock = ({ code, language }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <div className="px-4 py-3 bg-slate-950/50 border-b border-slate-800/50 flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 ml-2 tracking-widest">{language}</span>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed text-indigo-100/90 whitespace-pre">
                    {code}
                </pre>
            </div>
        </div>
    );
};

export default function Documentation() {
    const [activeLang, setActiveLang] = useState('curl');
    const [activeSection, setActiveSection] = useState('intro');

    return (
        <PublicLayout>
            <Head title="Documentation API" />

            <div className="bg-slate-950/50 border-b border-slate-800 backdrop-blur-md sticky top-0 z-30 pt-20">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold">
                        <BookOpen className="w-5 h-5 text-indigo-500" />
                        <span>Documentation API</span>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] border border-indigo-500/20 uppercase tracking-widest ml-2">v1.2</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar navigation */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-10 sticky top-32 h-fit">
                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Introduction</h4>
                            <ul className="space-y-1 border-l border-slate-800 ml-1">
                                <li>
                                    <a href="#intro" className="block pl-5 py-1 text-sm font-medium text-white border-l-2 border-indigo-500 -ml-[2px] transition-colors">Vue d'ensemble</a>
                                </li>
                                <li>
                                    <a href="#auth" className="block pl-5 py-1 text-sm font-medium text-slate-400 hover:text-white transition-colors border-l-2 border-transparent hover:border-slate-600 -ml-[2px]">Authentification</a>
                                </li>
                                <li>
                                    <a href="#errors" className="block pl-5 py-1 text-sm font-medium text-slate-400 hover:text-white transition-colors border-l-2 border-transparent hover:border-slate-600 -ml-[2px]">Codes d'erreur</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Endpoints</h4>
                            <ul className="space-y-1 border-l border-slate-800 ml-1">
                                <li>
                                    <a href="#send-simple" className="block pl-5 py-1 text-sm font-medium text-slate-400 hover:text-white transition-colors border-l-2 border-transparent hover:border-slate-600 -ml-[2px]">Envoi Simple</a>
                                </li>
                                <li>
                                    <a href="#send-bulk" className="block pl-5 py-1 text-sm font-medium text-slate-400 hover:text-white transition-colors border-l-2 border-transparent hover:border-slate-600 -ml-[2px]">Envoi de Masse</a>
                                </li>
                                <li>
                                    <a href="#webhooks" className="block pl-5 py-1 text-sm font-medium text-slate-400 hover:text-white transition-colors border-l-2 border-transparent hover:border-slate-600 -ml-[2px]">Webhooks</a>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 max-w-4xl min-w-0">
                        {/* Hero Section */}
                        <div id="intro" className="mb-20 scroll-mt-32">
                            <span className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-6 block">Guide de démarrage</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8 leading-tight">
                                Intégrez l'envoi d'emails <br />en <span className="text-indigo-500">quelques minutes.</span>
                            </h1>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10 max-w-2xl">
                                L'API Izymail est une interface RESTful conçue pour être simple, prévisible et performante.
                                Elle utilise des fonctionnalités HTTP standard comme les verbes (GET, POST), les codes de réponse et l'authentification Bearer.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="p-6 bg-slate-900/50 border border-slate-800">
                                    <Zap className="w-6 h-6 text-indigo-500 mb-4" />
                                    <h3 className="text-sm font-bold text-white uppercase tracking-tight mb-2">Haute Performance</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">Infrastructure distribuée capable de gérer des millions de requêtes.</p>
                                </Card>
                                <Card className="p-6 bg-slate-900/50 border border-slate-800">
                                    <Shield className="w-6 h-6 text-indigo-500 mb-4" />
                                    <h3 className="text-sm font-bold text-white uppercase tracking-tight mb-2">Sécurisé par défaut</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">Chiffrement TLS 1.3 et authentification via tokens Sanctum.</p>
                                </Card>
                                <Card className="p-6 bg-slate-900/50 border border-slate-800">
                                    <Activity className="w-6 h-6 text-indigo-500 mb-4" />
                                    <h3 className="text-sm font-bold text-white uppercase tracking-tight mb-2">Monitoring Temps-réel</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">Suivez la délivrabilité et les erreurs directement depuis votre dashboard.</p>
                                </Card>
                            </div>
                        </div>

                        {/* Authentication */}
                        <section id="auth" className="mb-20 scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                    <Shield className="w-6 h-6 text-indigo-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Authentification</h2>
                            </div>

                            <div className="prose prose-invert max-w-none mb-8">
                                <p className="text-slate-400">
                                    Toutes les requêtes API doivent être authentifiées via un <span className="text-white font-bold">Bearer Token</span>.
                                    Vous pouvez générer et gérer vos clés API depuis la section <a href="/api-keys" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/30">Clés API</a> de votre tableau de bord.
                                </p>
                            </div>

                            <Card className="p-6 bg-amber-500/5 border border-amber-500/10 mb-8 backdrop-blur-sm">
                                <h4 className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">
                                    <Shield className="w-4 h-4" /> Note de Sécurité
                                </h4>
                                <p className="text-sm text-amber-500/80 leading-relaxed">
                                    Ne partagez jamais vos clés API côté client (navigateur). Elles doivent toujours être utilisées depuis un serveur sécurisé.
                                </p>
                            </Card>

                            <CodeBlock
                                language="Authorization Header"
                                code="Authorization: Bearer izy_live_9384759283745982374598237"
                            />
                        </section>

                        {/* Sending Emails */}
                        <section id="send-simple" className="mb-20 scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                    <Code2 className="w-6 h-6 text-indigo-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Envoi d'Email</h2>
                            </div>

                            <div className="mb-8">
                                <span className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg font-mono text-sm text-slate-300">
                                    <span className="font-bold text-green-400">POST</span>
                                    <span className="text-slate-500">https://izymail.nelsius.com/api/</span>
                                    <span className="text-indigo-400">send</span>
                                </span>
                            </div>

                            {/* Language Tabs */}
                            <div className="mb-6">
                                <div className="flex gap-2 p-1 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-xl w-fit">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.id}
                                            onClick={() => setActiveLang(lang.id)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                                                activeLang === lang.id
                                                    ? "bg-indigo-600 text-white shadow-lg"
                                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <CodeBlock
                                language={languages.find(l => l.id === activeLang).name}
                                code={codeExamples.send[activeLang]}
                            />

                            <div className="mt-10 overflow-hidden border border-slate-800 rounded-2xl">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Paramètre</th>
                                            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Type</th>
                                            <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50 bg-slate-950/30">
                                        <tr>
                                            <td className="px-6 py-4 font-mono text-indigo-400">to</td>
                                            <td className="px-6 py-4 text-slate-500">string</td>
                                            <td className="px-6 py-4 text-slate-300">Adresse email du destinataire.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-mono text-indigo-400">subject</td>
                                            <td className="px-6 py-4 text-slate-500">string</td>
                                            <td className="px-6 py-4 text-slate-300">Objet de l'email (max 255 chars).</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-mono text-indigo-400">html</td>
                                            <td className="px-6 py-4 text-slate-500">string</td>
                                            <td className="px-6 py-4 text-slate-300">Contenu de l'email au format HTML.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 font-mono text-slate-500">text</td>
                                            <td className="px-6 py-4 text-slate-500">string</td>
                                            <td className="px-6 py-4 text-slate-400">Version texte brut (optionnel).</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Webhooks */}
                        <section id="webhooks" className="mb-20 scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                    <Server className="w-6 h-6 text-indigo-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Webhooks</h2>
                            </div>

                            <p className="text-slate-400 mb-8">
                                Abonnez-vous aux événements d'emailing en temps réel. Nous envoyons une requête POST à votre URL de callback pour chaque événement.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {['email.sent', 'email.delivered', 'email.bounced', 'email.opened'].map((event) => (
                                    <div key={event} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                                        <span className="font-mono text-sm text-slate-300">{event}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </PublicLayout>
    );
}
