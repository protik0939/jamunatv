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
        return $authors;
    }

    /**
     * Display the specified resource.
     */
    public function show(Authors $authors)
    {
        return $authors;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Authors $authors)
    {
        $field = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'designation' => 'required',
        ]);

        $authors->update($field);
        return $authors;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Authors $authors)
    {
        //
    }
}
