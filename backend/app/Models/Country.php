<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $table = "country";

    protected $fillable = [
        "name",
        "code",
    ];

    public function medals () {
        return $this->hasMany(Medal::class);
    }
}
