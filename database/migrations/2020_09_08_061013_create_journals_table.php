<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateJournalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('account_id')->unsigned();
            $table->bigInteger('djreview_id')->unsigned();
            $table->bigInteger('ledger_id')->unsigned();
            $table->date('date');
            $table->double('debit', 13, 2);
            $table->double('credit', 13, 2);
            $table->string('description')->default('-');
            $table->timestamps();

            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('djreview_id')->references('id')->on('DailyJReviews')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ledger_id')->references('id')->on('ledgers')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('journals');
    }
}
