<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kyslik\ColumnSortable\Sortable;

class Bid extends Model
{
    use HasFactory, Sortable;
    protected $fillable = ['amount', 'user_id', 'item_id'];
}
