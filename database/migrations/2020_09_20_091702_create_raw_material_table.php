<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRawMaterialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('raw_material', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('raw_material_category_id');
            $table->string('name');
            $table->string('code');
            $table->string('type');
            $table->string('unit_buy');
            $table->string('unit_use');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('raw_material');
    }
}
