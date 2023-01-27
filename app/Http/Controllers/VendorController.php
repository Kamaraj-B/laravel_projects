<?php

namespace App\Http\Controllers;

use App\Models\vendor;
use Illuminate\Http\Request;
use App\Exports\VendorExport;
use Maatwebsite\Excel\Facades\Excel;


class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        $data = vendor::latest()->paginate(5);

        return view('theme.vendors.index', compact('data'))->with('i', (request()->input('page', 1) - 1) * 5);
        //return view('theme.vendors.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('theme.vendors.create');
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
            'vendor_name'          =>  'required',
            'vendor_email'         =>  'required|email|unique:vendors',
            'profile'         =>  'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000',
            'address'          =>  'required',
        ]);

        $file_name = time() . '.' . request()->profile->getClientOriginalExtension();

        request()->profile->move(public_path('images'), $file_name);

        $vendor = new vendor;

        $vendor->vendor_name = $request->vendor_name;
        $vendor->vendor_email = $request->vendor_email;
        $vendor->vendor_type = $request->vendor_type;
        $vendor->address = $request->address;
        $vendor->profile = $file_name;

        $vendor->save();

        return redirect()->route('vendors.index')->with('success', 'Vendor Added successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function show(vendor $vendor)
    {
        return view('theme.vendors.show', compact('vendor'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function edit(vendor $vendor)
    {
        return view('theme.vendors.edit', compact('vendor'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, vendor $vendor)
    {
        $request->validate([
            'vendor_name'          =>  'required',
            'vendor_email'         =>  'required|email',
            'profile'         =>  'image|mimes:jpg,png,jpeg,gif,svg|max:2048|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000',
            'address'          =>  'required',
        ]);

        $profile = $request->hidden_profile;

        if($request->profile != '')
        {
            $profile = time() . '.' . request()->profile->getClientOriginalExtension();

            request()->profile->move(public_path('images'), $profile);
        }

        $vendor = vendor::find($request->hidden_id);
        $vendor->vendor_name = $request->vendor_name;
        $vendor->vendor_email = $request->vendor_email;
        $vendor->vendor_type = $request->vendor_type;
        $vendor->address = $request->address;
        $vendor->profile = $profile;

        $vendor->save();

        return redirect()->route('vendors.index')->with('success', 'Vendor Data has been updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(vendor $vendor)
    {
        $vendor->delete();

        return redirect()->route('vendors.index')->with('success', ' Data deleted successfully');
    }

    
    public function get_vendor_data()
    {
        return Excel::download(new VendorExport, 'Vendors.xlsx');
    }
    
}
