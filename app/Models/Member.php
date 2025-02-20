<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'uid',
        'name',
        'photo_url',
        'dob',
        'dni_nie',
        'address',
        'phone',
        'email',
        'registered_at',
        'is_retired',
    ];

    protected $casts = [
        'dob' => 'date',
        'registered_at' => 'datetime',
        'is_retired' => 'boolean',
    ];
}
