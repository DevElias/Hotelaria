<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerguntasTable extends Migration
{
    public function up()
    {
        Schema::create('perguntas', function (Blueprint $table) {
            $table->id();
            $table->string('pergunta', 500);
            $table->longText('resposta');
            $table->string('documento', 500);
            $table->string('palavras_chave', 900)->default('')->nullable();
            $table->integer('destacado')->comment('0 - Não / 1 - Sim')->default('0');
            $table->integer('id_categoriaperguntas')->default('0')->nullable();
            $table->integer('status')->comment('0 - Inativo / 1 - Ativo')->default('1');
            $table->integer('usuario_inclusao')->nullable();
            $table->dateTime('data_inclusao')->nullable();
            $table->integer('usuario_alteracao')->nullable();
            $table->dateTime('data_alteracao')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('perguntas');
    }
}
