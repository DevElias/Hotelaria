<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnStatusVaga extends Migration
{
    public function up()
    {
        Schema::table('vagas', function (Blueprint $table) {
            $table->integer('status_vaga')->default('0')->after('destacado')->comment('0 - Rascunho / 1 - Publicado / 2 - Encerrado / 3 - Finalizado');
        });
    }

    public function down()
    {
        //
    }
}
