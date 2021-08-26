<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidatosTable extends Migration
{
    public function up()
    {
        Schema::create('candidatos', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100);
            $table->string('email', 100)->unique();
            $table->string('cpf', 12)->unique();
            $table->string('telefone', 100)->nullable();
            $table->string('celular', 100)->nullable();
            $table->string('url_linkedin', 900)->default('')->nullable();
            $table->string('url_curriculo', 900)->default('')->nullable();
            $table->string('cep', 8)->nullable();
            $table->string('endereco', 100)->nullable();
            $table->string('numero', 100)->nullable();
            $table->string('complemento', 100)->nullable();
            $table->string('id_estado', 100)->nullable();
            $table->string('id_cidade', 100)->nullable();
            $table->string('bairro', 100)->nullable();
            $table->integer('status')->comment('0 - Inativo / 1 - Ativo')->default('1');
            $table->integer('id_area1')->default('0');
            $table->integer('id_area2')->default('0');
            $table->integer('id_area3')->default('0');
            $table->string('id_estado_gostaria', 100)->default('0');
            $table->string('id_cidade_gostaria', 100)->default('0');
            $table->string('trabalhou_hotelariaBrasil', 1)->default('0');
            $table->string('aceito_termos', 1)->default('0');
            $table->string('aceito_politica', 1)->default('0');
            $table->string('aceito_codigo', 1)->default('0');
            $table->dateTime('data_inclusao')->nullable();
            $table->dateTime('data_alteracao')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('candidatos');
    }
}
