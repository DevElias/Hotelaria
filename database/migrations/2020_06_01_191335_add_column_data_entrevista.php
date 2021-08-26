<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnDataEntrevista extends Migration
{
    public function up()
    {
        Schema::table('candidatos', function (Blueprint $table) {
            $table->string('data_entrevista', 20)->default('')->after('status_candidato');
        });
    }
    
    public function down()
    {
        //
    }
}
