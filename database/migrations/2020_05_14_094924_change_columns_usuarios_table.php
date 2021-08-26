<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnsUsuariosTable extends Migration
{
    
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('estado');
            $table->dropColumn('cidade');
            $table->integer('id_estado')->default('0')->after('complemento');
            $table->integer('id_cidade')->default('0')->after('id_estado');
            $table->integer('id_hotel')->default('0')->after('id_cidade');
            $table->string('img', 255)->nullable()->after('id_cargo');
        });
    }

   
    public function down()
    {
        
    }
}
