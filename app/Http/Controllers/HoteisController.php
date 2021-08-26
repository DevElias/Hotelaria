<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HoteisController extends Controller
{
    public function __construct()
    {
        session_start();
        
        if(empty($_SESSION)) {
            
            header('Location: /login');
            die();
        }
    }
    
    public function index()
    {
        return view('hoteis/CadastroHoteis');
    }

    public function create(Request $request)
    {
        $input   = $request->all();
        $dt      = date('Y-m-d H:i:s');
        $user    = $_SESSION['id'];
        
        # Registra o Hotel
        $id_hotel =  DB::table('hoteis')->insertGetId([
            'hotel'             => $input['hotel'],
            'id_estado'         => $input['id_estado'],
            'id_cidade'         => $input['id_cidade'],
            'status'            => '1',
            'usuario_inclusao'  => $user,
            'usuario_alteracao' => $user,
            'data_inclusao'     => $dt,
            'data_alteracao'    => $dt,
        ]);
        
        if (!empty($id_hotel))
        {
            $message[] = 'Hotel Cadastrado com Sucesso!';
            $code      = 200;
            
            # Busca Cargo
            $results = DB::select('select * from hoteis where id =' . $id_hotel);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar hotel';
            $code      = 400;
            $results   = '';
        }
        
        # feedback
        return response(['message' => $message, 'code' => $code, 'hotel' => $results]);
    }

    public function store(Request $request)
    {
        # Lista Hoteis
        $results = DB::select('select 
                                hoteis.*,
                                 estados.nome as Estado,
                                 cidades.nome as Cidade,
                                 DATE_FORMAT(hoteis.data_alteracao, "%d/%m/%Y %h:%i") as DataAlt,
                                 usuarios.nome as Alterador
                               from hoteis 
                                 inner join estados on estados.id = hoteis.id_estado 
                                 inner join cidades on cidades.id = hoteis.id_cidade
                                 left join usuarios on usuarios.id = hoteis.usuario_alteracao
                               where hoteis.status = 1');
        $results = (array) $results;
        
        return response()->json([
            'hoteis' => $results,
        ]);
    }
    
    public function listagem($id)
    {
        # Lista Hoteis Especifico de acordo com cidade
        $results = DB::select('select * from hoteis where status = 1 and id_cidade ='. $id);
        $results = (array) $results;
        
        return response()->json([
            'hoteis' => $results,
        ]);
    }
    
    public function admin()
    {
        return view('hoteis/AdminHoteis');
    }

    public function edit($id)
    {
        # Lista Hoteis
        $results = DB::select('select
                                hoteis.*,
                                 estados.nome as Estado,
                                 cidades.nome as Cidade
                               from hoteis
                                 inner join estados on estados.id = hoteis.id_estado
                                 inner join cidades on cidades.id = hoteis.id_cidade
                               where hoteis.status = 1 and hoteis.id ='. $id);
        $results = (array) $results;
        
        return response()->json([
            'hotel' => $results,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        
        $results = DB::table('hoteis')
        ->where('id', $id)
        ->update(['hotel'              => $input['hotel'],
                  'id_estado'          => $input['id_estado'],
                  'id_cidade'          => $input['id_cidade'],
                  'usuario_alteracao'  => $_SESSION['id'],
                  'data_alteracao'     => date('Y-m-d H:i:s')
        ]);
        
        $message[] = 'Hotel Alterado com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function destroy($id)
    {
        $results = DB::table('hoteis')
        ->where('id', $id)
        ->update(['status' => '0']);
        
        $message[] = 'Hotel Excluido com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }
}
