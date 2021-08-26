<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CargosController extends Controller
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
        return view('cargos/CadastroCargos');
    }

    public function create(Request $request)
    {
        $input   = $request->all();
        $dt      = date('Y-m-d H:i:s');
        
        # Registra o Cargo
        $id_cargo =  DB::table('cargos')->insertGetId([
            'cargo'             => $input['cargo'],
            'id_area'           => $input['id_area'],
            'status'            => '1',
            'usuario_inclusao'  => $_SESSION['id'],
            'data_inclusao'     => $dt,
            'data_alteracao'    => $dt,
            'usuario_alteracao' =>'0',
        ]);
        
        if (!empty($id_cargo))
        {
            $message[] = 'Cargo Cadastrado com Sucesso!';
            $code      = 200;
            
            # Busca Cargo
            $results = DB::select('select * from cargos where id =' . $id_cargo);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar cargo';
            $code      = 400;
            $results   = '';
        }
        
        # feedback
        return response(['message' => $message, 'code' => $code, 'cargo' => $results]);
    }

    public function store($id)
    {
        # Lista Cargo Especifico de acordo com area
        $results = DB::select('select * from cargos where status = 1 and id_area ='. $id);
        $results = (array) $results;
        
        return response()->json([
            'cargos' => $results,
        ]);
    }
    
    public function listagem()
    {
        # Lista TODOS os Cargos
        $results = DB::select('select cargos.*, areas.area as Area, DATE_FORMAT(cargos.data_alteracao, "%d/%m/%Y %h:%i") as DataAlt from cargos inner join areas on areas.id = cargos.id_area where cargos.status = 1');
        $results = (array) $results;
        
        # feedback
        return response()->json([
            'cargos' => $results,
        ]);
    }
    
    public function admin()
    {
        return view('cargos/AdminCargos');
    }
    
    public function destroy($id)
    {
        $results = DB::table('cargos')
        ->where('id', $id)
        ->update(['status' => '0']);
        
        $message[] = 'Cargo Excluido com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function edit($id)
    {
        # Lista Cargos especificando ID
        $results = DB::select('select * from cargos where status = 1 and id =' . $id);
        $results = (array) $results;
        
        return response()->json([
            'cargo' => $results,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        
        $results = DB::table('cargos')
        ->where('id', $id)
        ->update(['cargo'   => $input['cargo'],
                  'id_area' => $input['id_area'],
                  'data_alteracao' => date('Y-m-d H:i:s'),
            ]);
        
        $message[] = 'Cargo Alterado com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }
}
