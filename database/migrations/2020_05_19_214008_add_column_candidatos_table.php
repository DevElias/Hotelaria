<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnCandidatosTable extends Migration
{
    public function up()
    {
        Schema::table('candidatos', function (Blueprint $table) {
            $table->integer('id_vaga')->default('0')->after('aceito_codigo');
        });
    }

    public function down()
    {
        
    }
}
