<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormBuild extends Model
{
    protected $table = 'tbl_form_data';

    protected $fillable = [
        'form_name',
        'form_json'
    ];
}
