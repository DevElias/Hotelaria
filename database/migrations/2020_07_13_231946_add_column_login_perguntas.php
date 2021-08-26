<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnLoginPerguntas extends Migration
{
    public function up()
    {
        Schema::table('perguntas', function (Blueprint $table) {
            $table->string('login', 20)->default('0')->after('id_categoriaperguntas');
        });
    }

    public function down()
    {
        //
    }
}
