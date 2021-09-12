<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectTableModel;

class ProjectController extends Controller
{
    function ProjectList(){
        $result=ProjectTableModel::all();
        return $result;
    }
    function ProjectDelete(Request $request){
        $id=$request->input('id');
        $result=ProjectTableModel::where('id','=', $id)->delete();
        return $result;
    }

    function AddProject(Request $request){
        $projectName=$request->input('name');
        $projectDes=$request->input('des');
        $projectFeature=$request->input('feature');
        $projectLink=$request->input('link');

        $photoOnePath=$request->file('photoOne')->store('public');
        $photoOneName=explode("/", $photoOnePath)[1];
        $photoOneURL="http://".$_SERVER['HTTP_HOST']."/storage/".$photoOneName;

        $photoTwoPath=$request->file('photoTwo')->store('public');
        $photoTwoName=explode("/", $photoTwoPath)[1];
        $photoTwoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$photoTwoName;
        
        $result= ProjectTableModel::insert([
            'img_one'=>$photoOneURL,
            'img_two'=>$photoTwoURL,
            'project_name'=>$projectName,
            'short_description'=>$projectDes,
            'project_features'=>$projectFeature,
            'live_preview'=>$projectLink
        ]);
        return $result;
    }
}
