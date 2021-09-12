<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClientReviewModel;

class ReviewController extends Controller
{
    function ReviewList(){
        $result=ClientReviewModel::all();
        return $result;
    }
    function ReviewDelete(Request $request){
        $id=$request->input('id');
        $result=ClientReviewModel::where('id','=', $id)->delete();
        return $result;
    }
    
    function AddReview(Request $request){
        $title=  $request->input('title');
        $des=  $request->input('des');
        $PhotoPath=$request->file('photo')->store('public');
        $PhotoName=explode("/", $PhotoPath)[1];

        $PhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$PhotoName;
        $result= ClientReviewModel::insert(['client_img'=> $PhotoURL,'client_title'=>$title,'client_description'=>$des]);
        return $result;
    }

    function UpdateReview(Request $request){
        $updateId=$request->input('id');
        $title=  $request->input('title');
        $des=  $request->input('des');
        $PhotoPath=$request->file('photo')->store('public');
        $PhotoName=explode("/", $PhotoPath)[1];
        $PhotoURL="http://".$_SERVER['HTTP_HOST']."/storage/".$PhotoName;

        $result= ClientReviewModel::where('id','=',$updateId)->update(['client_img'=> $PhotoURL,'client_title'=>$title,'client_description'=>$des]);
        return $result;
    }

    // function editReview(Request $request){
    //     $id=$request->input('id');
    //     $result=ClientReviewModel::where('id','=', $id)->get();
    //     return $result;
        
        
    // }

    function editReview($id){
        $review=ClientReviewModel::find($id);
        return response()->json([
            'status'=> 200,
            'review'=> $review,
        ]);
        
        
    }
    // function editReview($id)
    // {
    //     $review = ClientReviewModel::find($id);
        
    //     return response()->json([
    //         'status'=> 200,
    //         'reviw'=>$review,
    //     ]);
    // }
    
}
