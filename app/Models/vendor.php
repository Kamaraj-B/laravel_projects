<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vendor extends Model
{
    //use HasFactory;
    protected $fillable = [
        'vendor_name',
        'vendor_email',
        'vendor_type',
        'address',
        'profile',
    ];

}
