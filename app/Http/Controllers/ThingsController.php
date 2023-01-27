<?php

namespace App\Http\Controllers;

use App\Models\things;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ThingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = things::latest()->paginate(5);

        return view('theme.products.index', compact('data'))->with('i', (request()->input('page', 1) - 1) * 5);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('theme.products.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_name'          =>  'required',
            'address'          =>  'required',
        ]);

     
        $res = new things;

        $res->name = $request->product_name;
        $res->address = $request->address;
      
        $res->save();

        return redirect()->route('products.index')->with('success', 'product Added successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\things  $things
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    
        $products = DB::table('products')->where('id', $id)->first();
        return view('theme.products.show', compact('products'));
        

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\things  $things
     * @return \Illuminate\Http\Response
     */
    public function edit(things $things)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\things  $things
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, things $things)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\things  $things
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $deleted = DB::table('products')->where('id', $id)->delete();
        return redirect()->route('products.index')->with('success', ' Data deleted successfully');
    }
}
