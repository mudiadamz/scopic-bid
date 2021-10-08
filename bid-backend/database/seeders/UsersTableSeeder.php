<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        User::truncate();
        User::create([
            'name' => 'user1',
            'email' => 'user1',
            'password' => Hash::make('scopic'),
        ]);
        User::create([
            'name' => 'user2',
            'email' => 'user2',
            'password' => Hash::make('scopic'),
        ]);
    }
}
