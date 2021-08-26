<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class SubcategoriasController extends Controller
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
        return view('subcategorias/CadastroSubcategorias');
    }

    public function create(Request $request)
    {
        $input   = $request->all();
        
        # Registra a Categoria
        $id_subcategoria =  DB::table('subcategorias')->insertGetId([
            'subcategoria'      => $input['subcategoria'],
            'id_categoria'      => $input['id_categoria'],
            'status'            => '1',
            'usuario_inclusao'  => $_SESSION['id'],
            'data_inclusao'     => date('Y-m-d H:i:s'),
            'usuario_alteracao' =>'0',
        ]);
        
        if (!empty($id_subcategoria))
        {
            $message[] = 'SubCategoria Cadastrada com Sucesso!';
            $code      = 200;
            
            # Busca Categoria
            $results = DB::select('select * from subcategorias where id =' . $id_subcategoria);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar subcategoria';
            $code      = 400;
            $results   = '';
        }
        
        # feedback
        return response(['message' => $message, 'code' => $code, 'subcategoria' => $results]);
    }

    public function store($id)
    {
        # Lista Subategorias
        $results = DB::select('select * from subcategorias where status = 1 AND id_categoria = '. $id);
        $results = (array) $results;
        
        return response()->json([
            'subcategorias' => $results,
        ]);
    }

    public function admin()
    {
        return view('subcategorias/AdminSubCategorias');
    }
    
    public function listagem()
    {
        # Lista Subategorias
        $results = DB::select('select subcategorias.id, subcategorias.subcategoria, categorias.categoria as Categoria from subcategorias inner join categorias on categorias.id = subcategorias.id_categoria where subcategorias.status = 1');
        $results = (array) $results;
        
        return response()->json([
            'subcategorias' => $results,
        ]);
    }

    public function edit($id)
    {
        # Lista Subategorias
        $results = DB::select('select subcategorias.id, subcategorias.id_categoria, subcategorias.subcategoria, categorias.categoria as Categoria from subcategorias inner join categorias on categorias.id = subcategorias.id_categoria where subcategorias.status = 1 AND subcategorias.id = '. $id);
        $results = (array) $results;
        
        return response()->json([
            'subcategoria' => $results,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        
        $results = DB::table('subcategorias')
        ->where('id', $id)
        ->update(['subcategoria'       => $input['subcategoria'],
                  'id_categoria'       => $input['id_categoria'],
                  'usuario_alteracao'  => $_SESSION['id'],
                  'data_alteracao'     => date('Y-m-d H:i:s')
        ]);
        
        $message[] = 'Subcategoria Alterada com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function destroy($id)
    {
        $results = DB::table('subcategorias')
        ->where('id', $id)
        ->update(['status' => '0']);
        
        $message[] = 'Subcategoria Excluida com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }
}
