<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_name' => 'Izymail',
            'site_description' => 'Infrastructure d\'emailing professionnelle haute performance pour le marché africain.',
            'contact_email' => 'nelsonsiebi237@gmail.com',
            'contact_phone' => '+237676676120',
            'social_facebook' => 'https://facebook.com/izymail',
            'social_twitter' => 'https://twitter.com/izymail',
            'social_instagram' => 'https://instagram.com/izymail',
            'social_linkedin' => 'https://linkedin.com/company/izymail',
            'social_whatsapp' => 'https://wa.me/237676676120',
            'footer_text' => 'Fait avec passion en Afrique.',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
