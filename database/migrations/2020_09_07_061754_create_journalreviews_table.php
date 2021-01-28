<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDailyJReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('DailyJReviews', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date');
            $table->string('memo')->nullable();
            $table->string('status')->nullable();
            $table->bigInteger('reviewer_id')->unsigned()->nullable();
            $table->datetime('review_date')->nullable();
            $table->timestamps();

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
        Schema::dropIfExists('DailyJReviews');
    }
}
