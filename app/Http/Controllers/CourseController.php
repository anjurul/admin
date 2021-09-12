<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CoursesTableModel;

class CourseController extends Controller
{
    function CourseList(){
        $result=CoursesTableModel::all();
        return $result;
    }
    function CourseDelete(Request $request){
        $id=$request->input('id');
        $result=CoursesTableModel::where('id','=', $id)->delete();
        return $result;
    }
}
