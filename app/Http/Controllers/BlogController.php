<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        // Mock posts for now
        $posts = [
            [
                'id' => 1,
                'title' => 'Lancement de Izymail : L\'emailing réinventé en Afrique',
                'excerpt' => 'Découvrez comment notre plateforme va changer votre manière de communiquer.',
                'date' => '08 Jan 2026',
                'image' => 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2670'
            ],
            [
                'id' => 2,
                'title' => 'Pourquoi la rotation SMTP est cruciale',
                'excerpt' => 'Optimisez votre délivrabilité et évitez les dossiers SPAM.',
                'date' => '05 Jan 2026',
                'image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670'
            ]
        ];

        return Inertia::render('Blog/Index', [
            'posts' => $posts
        ]);
    }
}
