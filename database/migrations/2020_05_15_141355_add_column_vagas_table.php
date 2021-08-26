<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnVagasTable extends Migration
{
    public function up()
    {
        Schema::table('vagas', function (Blueprint $table) {
            $table->integer('id_hotel')->default('0')->after('id_cidade');
        });
    }

    public function down()
    {
        
    }
}
