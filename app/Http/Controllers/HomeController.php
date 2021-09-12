<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\ClientReviewModel;
use App\Models\ContactTableModel;
use App\Models\CoursesTableModel;
use App\Models\ProjectTableModel;
use App\Models\ServiceTableModel;


class HomeController extends Controller
{

    function CountSummary(){
        $review= ClientReviewModel::count();
        $contact=ContactTableModel::count();
        $course=CoursesTableModel::count();
        $project=ProjectTableModel::count();
        $service=ServiceTableModel::count();
        $totalCount=array('review'=>$review,'contact'=>$contact,'course'=>$course,'project'=>$project,'service'=>$service);
        return json_encode($totalCount);
    }

}
