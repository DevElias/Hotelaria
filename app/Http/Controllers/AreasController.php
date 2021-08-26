<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AreasController extends Controller
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
        return view('areas/CadastroAreas');
    }

    public function create(Request $request)
    {
        $input   = $request->all();
        $dt      = date('Y-m-d H:i:s');
        
        # Registra a Categoria
        $id_area =  DB::table('areas')->insertGetId([
            'area'         => $input['area'],
            'status'            => '1',
            'usuario_inclusao'  => $_SESSION['id'],
            'data_inclusao'     => $dt,
            'data_alteracao'    => $dt,
            'usuario_alteracao' =>'0',
        ]);
        
        if (!empty($id_area))
        {
            $message[] = 'area criada: '.$id_area;
            $code      = 200;
            
            # Busca Areas
            $results = DB::select('select * from areas where id =' . $id_area);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar area';
            $code      = 400;
            $results   = '';
        }
        
        # feedback
        return response(['message' => $message, 'code' => $code, 'area' => $results]);
    }

    public function store(Request $request)
    {
        # Lista Areas
        $results = DB::select('select areas.*, DATE_FORMAT(areas.data_alteracao, "%d/%m/%Y %h:%i") as DataAlt from areas where status = 1');
        $results = (array) $results;
        
        return response()->json([
            'areas' => $results,
        ]);
    }
    
    public function admin()
    {
        return view('areas/AdminAreas');
    }

    public function edit($id)
    {
        # Lista Areas
        $results = DB::select('select areas.*, "Area" as nTipo, areas.area as "TFiltro" from areas where status = 1 and id =' .$id);
        $results = (array) $results;
        
        return response()->json([
            'area' => $results,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        
        $results = DB::table('areas')
        ->where('id', $id)
        ->update(['area'              => $input['area'],
                  'usuario_alteracao' => $_SESSION['id'],
                  'data_alteracao'    => date('Y-m-d H:i:s')
        ]);
        
        $message[] = 'Area Alterada com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function destroy($id)
    {
        $results = DB::table('areas')
        ->where('id', $id)
        ->update(['status' => '0']);
        
        $message[] = 'Area Excluida com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }
}
