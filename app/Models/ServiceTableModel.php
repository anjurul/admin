<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceTableModel extends Model
{
    protected $table = 'service_table';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
}
