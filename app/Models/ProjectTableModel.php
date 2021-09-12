<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectTableModel extends Model
{
    protected $table = 'project_table';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
}
