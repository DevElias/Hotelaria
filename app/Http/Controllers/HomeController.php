<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    public function index()
    {
        return redirect('/login');
    }
    public function login()
    {
        $array1 = array();
        $array2 = array();
        
        $perguntas = DB::select("select * from perguntas where login=1"); // $aTeste = DB::select("select * from perguntas where login = 1");
        
        /*if(!empty($perguntasLogin))
        {
            list($array1, $array2) = array_chunk($perguntasLogin, ceil(count($perguntasLogin) / 2));
        }*/
       
        /*$data=[
            'array1'  => $array1,
            'array2' => $array2,
        ];*/
        
        return view('auth/login')->with('perguntas', $perguntas); // $data
    }
}
