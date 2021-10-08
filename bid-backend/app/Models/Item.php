<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;

class Item extends Model
{
    use HasFactory, Sortable;

    protected $fillable = ['name', 'description', 'last_price', 'image', 'bid_end'];

    public $sortable = ['last_price'];
}
