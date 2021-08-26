<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnDestacadosVagas extends Migration
{
    public function up()
    {
        Schema::table('vagas', function (Blueprint $table) {
            $table->integer('destacado')->default('0')->after('id_responsavel');
        });
    }

    public function down()
    {
        //
    }
}
