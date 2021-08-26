<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeTypeColumnVagas extends Migration
{
    public function up()
    {
        Schema::table('vagas', function ($table) {
            $table->string('faixa_salarial', 20)->change();
        });
    }

    public function down()
    {
        //
    }
}
