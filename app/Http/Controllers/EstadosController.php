<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class EstadosController extends Controller
{

    public function store(Request $request)
    {
        # Lista Estados
        $results = DB::select('select * from estados');
        $results = (array) $results;
        
        return response()->json([
            'estados' => $results,
        ]);
    }

    public function edit($id)
    {
        # Lista Areas
        $results = DB::select('select estados.*, "Estado" as nTipo, estados.nome as "TFiltro" from estados where id =' .$id);
        $results = (array) $results;
        
        return response()->json([
            'estados' => $results,
        ]);
    }
}
