<?php
use Illuminate\Database\Seeder;

class UsuariosTableSeeder extends Seeder {
	public function run() {
		$users = [
			['Ailton Ribeiro', 'ar@ailtonribeiro.com', '12345','09095034677','01011970','0800591203','01140060','Av. Nicolas Boer, 399','1399','Apartamento',0,0,0,'Casa Verde',0,0,1,0,1,NULL,0,'2020-05-08 22:25:44',0,NULL]
		];

		// (5,,'ailton@gmail.com')

		for ($i = 0; $i < count($users); $i++) {
			DB::table('usuarios')->insert([
				'nome' => $users[$i][0],
				'email' => $users[$i][1],
				'senha' => $users[$i][2],
				'cpf' => $users[$i][3],
				'data_nascimento' => $users[$i][4],
				'telefone' => $users[$i][5],
				'cep' => $users[$i][6],
				'endereco' => $users[$i][7],
				'numero' => $users[$i][8],
				'complemento' => $users[$i][9],
				'id_estado' => $users[$i][10],
				'id_cidade' => $users[$i][11],
				'id_hotel' => $users[$i][12],
				'bairro' => $users[$i][13],
				'tipo_usuario' => $users[$i][14],
				'tipo_admin' => $users[$i][15],
				'status' => $users[$i][16],
				'id_area' => $users[$i][17],
				'id_cargo' => $users[$i][18],
				'img' => $users[$i][19],
				'usuario_inclusao' => $users[$i][20],
				'data_inclusao' => now(),
				'usuario_alteracao' => $users[$i][22],
				'data_alteracao' => now()
			]);
		}
	}
}