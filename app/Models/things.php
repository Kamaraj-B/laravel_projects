<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class things extends Model
{
    use HasFactory;
    protected $table = 'products';

    protected $fillabe =
    [
        'name',
        'address'
    ];

}
