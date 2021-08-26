<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CidadesController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store($id)
    {
        # Lista Cidades
        $results = DB::select('select * from cidades WHERE id_estado =' . $id);
        $results = (array) $results;
        
        return response()->json([
            'cidades' => $results,
        ]);
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
