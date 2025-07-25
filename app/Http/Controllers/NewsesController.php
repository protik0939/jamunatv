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
        try {
            // dd($request->all());
        $newsPost = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|mimes:png,jpg,jpeg,webp',
            'authors_id' => 'required|exists:authors,id',
            'categories' => 'required',
        ]);

        // dd($newsPost);
        if ($request->hasFile('image')) {
            $imagepath = $request->file('image');
            $extension = $imagepath->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $imagepath->move(public_path('storage'), $filename);
            $newsPost['image_url'] = "storage/{$filename}";
        }
        $news = newses::create($newsPost);
        return ['news' => $news];
        } catch (\Exception $th) {

            dd( $th);
            throw $th;
        }
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
