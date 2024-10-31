<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Button;

class ButtonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Button::all();  
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'link' => 'required|url',
            'color' => 'required|string|max:50'
        ]);


        $button = Button::create($validated);
        
        return response()->json($button , 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $button = Button::findOrFail($id);
        return $button;

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'link' => 'required|url',
            'color' => 'required|string|max:50'
        ]);
        $button = Button::findOrFail($id);

        $button->update($validated);

        return response()->json($button, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $button = Button::findOrFail($id);
        $button->delete();

        return response()->json(null, 204);
    }
}
