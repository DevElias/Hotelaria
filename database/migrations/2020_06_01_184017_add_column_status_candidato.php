<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnStatusCandidato extends Migration
{
    public function up()
    {
        Schema::table('candidatos', function (Blueprint $table) {
            $table->integer('status_candidato')->default('0')->after('status')->comment('0 - Aguardando / 1 - Pre-Selecionado / 2 - Reprovado / 3 - Aprovado');
        });
    }
    
    public function down()
    {
        //
    }
}
