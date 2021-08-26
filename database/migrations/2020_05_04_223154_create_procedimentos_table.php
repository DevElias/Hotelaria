<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcedimentosTable extends Migration
{
    public function up()
    {
        Schema::create('procedimentos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 255);
            $table->string('descricao', 255);
            $table->string('url_arquivo', 900)->default('')->nullable();
            $table->string('palavras_chave', 900)->default('')->nullable();
            $table->integer('status')->comment('0 - Inativo / 1 - Ativo')->default('1');
            $table->integer('id_categoria')->default('0')->nullable();
            $table->integer('id_subcategoria')->default('0')->nullable();
            $table->integer('destacado')->comment('0 - Não / 1 - Sim')->default('0');
            $table->integer('liberado')->comment('Arquivo Liberado para Download (0 - Não / 1 - Sim)')->default('1');
            $table->integer('usuario_inclusao')->nullable();
            $table->dateTime('data_inclusao')->nullable();
            $table->integer('usuario_alteracao')->nullable();
            $table->dateTime('data_alteracao')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('procedimentos');
    }
}
