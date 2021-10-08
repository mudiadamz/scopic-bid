<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        Item::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few articles in our database:
        for ($i = 0; $i < 50; $i++) {
            Item::create([
                'name' => $faker->sentence,
                'description' => $faker->paragraph,
                'start_price' => 10,
                'last_price' => 10,
                'image' => 'https://source.unsplash.com/400x400/?antique',
                'bid_end' => gmdate("Y-m-d H:i:s", strtotime("+1 day"))
            ]);
        }
    }
}
