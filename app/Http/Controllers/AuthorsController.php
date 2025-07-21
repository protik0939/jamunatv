<?php

namespace App\Http\Controllers;

use App\Models\Authors;
use Illuminate\Http\Request;

class AuthorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Authors::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $field = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'designation' => 'required',
        ]);

        $authors = Authors::create($field);
        return ['authors' => $authors];
    }

    /**
     * Display the specified resource.
     */
    public function show(Authors $author)
    {
        return $author;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Authors $author)
    {
        $field = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'designation' => 'required',
        ]);

        $author->update($field);
        return $author;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Authors $author)
    {
        $author->delete();
        return ['message'=> 'This post deleted'];
    }
}
