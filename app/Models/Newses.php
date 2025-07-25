<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newses extends Model
{
    /** @use HasFactory<\Database\Factories\NewsesFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'image_url',
        'authors_id',
        'categories',
    ];
    protected $casts = [
        'categories' => 'array', // Laravel will automatically decode when retrieving
    ];
}
