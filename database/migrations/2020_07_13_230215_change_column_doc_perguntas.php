<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeColumnDocPerguntas extends Migration
{
    public function up()
    {
        Schema::table('perguntas', function (Blueprint $table) {
            $table->string('documento', 500)->nullable()->change();
        });
    }

    public function down()
    {
        //
    }
}
