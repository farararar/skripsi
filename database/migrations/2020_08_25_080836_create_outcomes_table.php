<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateOutcomesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('outcomes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('outcometype_id')->unsigned();
            $table->bigInteger('account_id')->unsigned();
            $table->string('invoice_number');
            $table->double('ammount', 13, 2);
            $table->string('description')->default('-');
            $table->string('payment_method');
            $table->date('date');
            $table->string('review_status')->nullable();
            $table->bigInteger('reviewer_id')->unsigned()->nullable();
            $table->datetime('review_date')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('outcometype_id')->references('id')->on('outcometypes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('reviewer_id')->references('id')->on('users')->onDelete('set null')->onUpdate('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('outcomes');
    }
}
