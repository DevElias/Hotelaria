<?php

use Illuminate\Database\Seeder;

class EstadosSeeder extends Seeder
{
    public function run()
    {
        DB::table('estados')->truncate();
        
        DB::table('estados')->insert([
            ['id' => 1, 'nome' => utf8_encode('Acre'), 'sigla' => 'AC'],
            ['id' => 2, 'nome' => utf8_encode('Alagoas'), 'sigla' => 'AL'],
            ['id' => 3, 'nome' => utf8_encode('Amap�'), 'sigla' => 'AP'],
            ['id' => 4, 'nome' => utf8_encode('Amazonas'), 'sigla' => 'AM'],
            ['id' => 5, 'nome' => utf8_encode('Bahia'), 'sigla' => 'BA'],
            ['id' => 6, 'nome' => utf8_encode('Cear�'), 'sigla' => 'CE'],
            ['id' => 7, 'nome' => utf8_encode('Distrito Federal'), 'sigla' => 'DF'],
            ['id' => 8, 'nome' => utf8_encode('Esp�rito Santo'), 'sigla' => 'ES'],
            ['id' => 9, 'nome' => utf8_encode('Goi�s'), 'sigla' => 'GO'],
            ['id' => 10, 'nome' => utf8_encode('Maranh�o'), 'sigla' => 'MA'],
            ['id' => 11, 'nome' => utf8_encode('Mato Grosso'), 'sigla' => 'MT'],
            ['id' => 12, 'nome' => utf8_encode('Mato Grosso do Sul'), 'sigla' => 'MS'],
            ['id' => 13, 'nome' => utf8_encode('Minas Gerais'), 'sigla' => 'MG'],
            ['id' => 14, 'nome' => utf8_encode('Par�'), 'sigla' => 'PA'],
            ['id' => 15, 'nome' => utf8_encode('Para�ba'), 'sigla' => 'PB'],
            ['id' => 16, 'nome' => utf8_encode('Paran�'), 'sigla' => 'PR'],
            ['id' => 17, 'nome' => utf8_encode('Pernambuco'), 'sigla' => 'PE'],
            ['id' => 18, 'nome' => utf8_encode('Piau�'), 'sigla' => 'PI'],
            ['id' => 19, 'nome' => utf8_encode('Rio de Janeiro'), 'sigla' => 'RJ'],
            ['id' => 20, 'nome' => utf8_encode('Rio Grande do Norte'), 'sigla' => 'RN'],
            ['id' => 21, 'nome' => utf8_encode('Rio Grande do Sul'), 'sigla' => 'RS'],
            ['id' => 22, 'nome' => utf8_encode('Rond�nia'), 'sigla' => 'RO'],
            ['id' => 23, 'nome' => utf8_encode('Roraima'), 'sigla' => 'RR'],
            ['id' => 24, 'nome' => utf8_encode('Santa Catarina'), 'sigla' => 'SC'],
            ['id' => 25, 'nome' => utf8_encode('S�o Paulo'), 'sigla' => 'SP'],
            ['id' => 26, 'nome' => utf8_encode('Sergipe'), 'sigla' => 'SE'],
            ['id' => 27, 'nome' => utf8_encode('Tocantins'), 'sigla' => 'TO'],
        ]);
    }
}
