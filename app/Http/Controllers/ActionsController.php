<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class ActionsController extends Controller
{
    public function candaidatoconfirma()
    {
        return view('candidatos/invite');
    }
    
    public function perguntaslogin()
    {
        return view('layouts/perguntaslogin');
    }
    
    public function getperguntas()
    {
        # Busca Perguntas da pagina login
        $results = DB::select('select * from perguntas where login = 1');
        $results = (array) $results;
        
        # feedback
        return response(['perguntas' => $results]);
    }
    
}
