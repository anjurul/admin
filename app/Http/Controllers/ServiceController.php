<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ServiceTableModel;

class ServiceController extends Controller
{
    function ServiceList(){
        $result=ServiceTableModel::all();
        return $result;
    }
    function ServiceDelete(Request $request){
        $id=$request->input('id');
        $result=ServiceTableModel::where('id','=', $id)->delete();
        return $result;
    }
}
