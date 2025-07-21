<?php

namespace App\Http\Controllers;

use App\Models\newses;
use Illuminate\Http\Request;

class NewsesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return newses::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            'title' => 'required|max255',
            'description' => 'required',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp',
            'authors_id' => 'required',
            'categories' => 'required|array',
        ]);
        return $request;
    }

    /**
     * Display the specified resource.
     */
    public function show(newses $newses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, newses $newses)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(newses $newses)
    {
        //
    }
}
