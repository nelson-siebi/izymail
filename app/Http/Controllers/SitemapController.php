<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $urls = [
            ['loc' => '/', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '1.0'],
            ['loc' => '/docs', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '0.8'],
            ['loc' => '/about', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '0.5'],
            ['loc' => '/blog', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '0.8'],
            ['loc' => '/careers', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '0.5'],
            ['loc' => '/contact', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '0.6'],
            ['loc' => '/terms', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '0.3'],
            ['loc' => '/privacy', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '0.3'],
            ['loc' => '/cookies', 'lastmod' => now()->startOfDay()->toAtomString(), 'priority' => '0.3'],
        ];

        // In the future, you could loop through blog posts here:
        // $posts = Post::all();
        // foreach($posts as $post) {
        //     $urls[] = ['loc' => '/blog/' . $post->id, ...];
        // }

        $xml = view('sitemap', compact('urls'))->render();

        return response($xml, 200)
            ->header('Content-Type', 'text/xml');
    }
}
