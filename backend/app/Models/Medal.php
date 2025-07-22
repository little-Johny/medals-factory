<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medal extends Model
{
    use HasFactory;

    protected $table = "medal";
    protected $fillable = [
        "type",
        "event",
        "year",
        "country_id"
    ];
    public function country()
    {
        return $this->belongsTo(Country::class);
    }

}
