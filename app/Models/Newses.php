<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newses extends Model
{
    /** @use HasFactory<\Database\Factories\NewsesFactory> */
    use HasFactory;
    protected $fillable = [
        'id',
        'title',
        'description',
        'image_url',
        'categories',
    ];
}
