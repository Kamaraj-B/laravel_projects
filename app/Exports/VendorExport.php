<?php

namespace App\Exports;

use App\Models\vendor;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class VendorExport implements FromCollection,WithHeadings
{

     /**
    * @return \Illuminate\Support\Collection
    */ 
    public function headings():array{
        return[
            'Id',
            'Vendor_Name',
            'Vendor_Email',
            'Vendor_type',
            'profile',
            'Address',
            'created_at',
            'updated_at' 
        ];
    } 

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return vendor::all();
    }
}
