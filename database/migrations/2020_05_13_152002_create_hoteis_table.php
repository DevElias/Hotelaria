<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHoteisTable extends Migration
{
    public function up()
    {
        Schema::create('hoteis', function (Blueprint $table) {
            $table->id();
            $table->string('hotel', 500);
            $table->integer('id_estado')->default('0');
            $table->integer('id_cidade')->default('0');
            $table->integer('status')->comment('0 - Inativo / 1 - Ativo')->default('1');
            $table->integer('usuario_inclusao')->nullable();
            $table->dateTime('data_inclusao')->nullable();
            $table->integer('usuario_alteracao')->nullable();
            $table->dateTime('data_alteracao')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hoteis');
    }
}
