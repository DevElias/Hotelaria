<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
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
		return view('dashboard/Dashboard');
    }

    public function busca()
    {
        return view('buscaDashboardCliente');
    }
}
