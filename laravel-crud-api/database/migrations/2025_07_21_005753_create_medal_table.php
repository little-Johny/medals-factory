<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medal', function (Blueprint $table) {
            $table->id();
            $table->enum("type", ["gold", "silver", "bronze"])->comment("Category of medal");
            $table->string("event")->comment("Medal-related event");
            $table->year("year")->comment("Year in which the medal was won");
            $table->foreignId("country_id")->nullable()->comment("Country that won the medal")->constrained("country")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medal');
    }
};
