<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCidadesTable extends Migration
{
    public function up()
    {
        Schema::create('cidades', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('codigo_ibge', 20)->nullable();
            $table->integer('id_estado')->default('0');
        });
    }

    public function down()
    {
        Schema::dropIfExists('cidades');
    }
}
