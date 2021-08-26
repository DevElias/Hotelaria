<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CategoriasController extends Controller
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
        return view('categorias/CadastroCategorias');
    }

    public function create(Request $request)
    {
        $input   = $request->all();

        # Registra a Categoria
        $id_categoria =  DB::table('categorias')->insertGetId([
            'categoria'         => $input['categoria'],
            'status'            => '1',
            'usuario_inclusao'  => $_SESSION['id'],
            'data_inclusao'     => date('Y-m-d H:i:s'),
            'usuario_alteracao' =>'0',
        ]);

        if (!empty($id_categoria))
        {
            $message[] = 'Categoria Cadastrada com Sucesso!';
            $code      = 200;

            # Busca Categoria
            $results = DB::select('select * from categorias where id =' . $id_categoria);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar categoria';
            $code      = 400;
            $results   = '';
        }

        # feedback
        return response(['message' => $message, 'code' => $code, 'categoria' => $results]);
    }

    public function store(Request $request)
    {
        # Lista Categorias
        $results = DB::select('select * from categorias where status = 1');
        $results = (array) $results;

        return response()->json([
            'categorias' => $results,
        ]);
    }
    
    public function admin()
    {
        return view('categorias/AdminCategorias');
    }
    
    public function destroy($id)
    {
        $results = DB::table('categorias')
                    ->where('id', $id)
                    ->update(['status' => '0']);
        
        $message[] = 'Categoria Excluida com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function edit($id)
    {
        # Lista Categorias especificando ID
        $results = DB::select('select * from categorias where status = 1 and id =' . $id);
        $results = (array) $results;
        
        return response()->json([
            'categoria' => $results,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        
        $results = DB::table('categorias')
            ->where('id', $id)
            ->update(['categoria' => $input['categoria']]);
        
        $message[] = 'Categoria Alterada com Sucesso';
        $code      = 200;
            
        return response()->json([
                'message' => $message,
                'code'    => $code,
                'result'  => $results,
        ]);
    }
}
