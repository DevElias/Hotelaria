<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVagasTable extends Migration
{
    public function up()
    {
        Schema::create('vagas', function (Blueprint $table) {
            $table->id();
            $table->integer('id_area')->default('0');
            $table->integer('id_cargo')->default('0');
            $table->integer('id_estado')->default('0');
            $table->integer('id_cidade')->default('0');
            $table->string('tipo_contratacao', 20);
            $table->time('carga_horaria_de');
            $table->time('carga_horaria_ate');
            $table->float('faixa_salarial', 10, 2);
            $table->date('vaga_expira');
            $table->longText('descricao');
            $table->longText('requisitos');
            $table->integer('id_responsavel')->default('0');
            $table->integer('status')->comment('0 - Inativo / 1 - Ativo')->default('1');
            $table->integer('usuario_inclusao')->nullable();
            $table->dateTime('data_inclusao')->nullable();
            $table->integer('usuario_alteracao')->nullable();
            $table->dateTime('data_alteracao')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('vagas');
    }
}
