<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'HomeController@index');
Route::get('/login', 'HomeController@login');

# Home
Route::get('/home', 'HomeController@index')->name('home');

# Login e Logout
Route::post('/acesso', 'UsuariosController@login');
Route::get('/sair', 'UsuariosController@logout');
Route::get('/esqueci', 'UsuariosController@esqueci');
Route::post('/enviasenha', 'UsuariosController@enviasenha');

# Perguntas Login
Route::get('/perguntaslogin', 'ActionsController@perguntaslogin');
Route::post('/perguntas/login', 'ActionsController@getperguntas');

# Usuarios
Route::group(['prefix' => 'usuarios'], function () {
    Route::get('/cadastro', ['uses' => 'UsuariosController@index']);
    Route::post('/gravar', ['uses' => 'UsuariosController@create']);
    Route::get('/perfil', ['uses' => 'UsuariosController@perfil']);
    Route::get('/buscaperfil', ['uses' => 'UsuariosController@buscaPerfil']);
    Route::post('/update', ['uses' => 'UsuariosController@update']);
    Route::get('/lista', ['uses' => 'UsuariosController@store']);
    Route::get('/admin', ['uses' => 'UsuariosController@admin']);
    Route::get('/editar/{id}', ['uses' => 'UsuariosController@index']);
    Route::get('/buscar/{id}', ['uses' => 'UsuariosController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'UsuariosController@update']);
    Route::post('/foto/upload', ['uses' => 'UsuariosController@upload']);
});

# Categorias
Route::group(['prefix' => 'categorias'], function () {
    Route::get('/cadastro', ['uses' => 'CategoriasController@index']);
    Route::get('/lista', ['uses' => 'CategoriasController@store']);
    Route::post('/gravar', ['uses' => 'CategoriasController@create']);
    Route::get('/admin', ['uses' => 'CategoriasController@admin']);
    Route::post('/destroy/{id}', ['uses' => 'CategoriasController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'CategoriasController@index']);
    Route::get('/buscar/{id}', ['uses' => 'CategoriasController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'CategoriasController@update']);
});

# Subcategorias
Route::group(['prefix' => 'subcategorias'], function () {
    Route::get('/cadastro', ['uses' => 'SubcategoriasController@index']);
    Route::get('/lista/{id}', ['uses' => 'SubcategoriasController@store']);
    Route::post('/gravar', ['uses' => 'SubcategoriasController@create']);
    Route::get('/admin', ['uses' => 'SubcategoriasController@admin']);
    Route::get('/listagem', ['uses' => 'SubcategoriasController@listagem']);
    Route::post('/destroy/{id}', ['uses' => 'SubcategoriasController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'SubcategoriasController@index']);
    Route::get('/buscar/{id}', ['uses' => 'SubcategoriasController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'SubcategoriasController@update']);
});

//Dashboards
Route::get('/dashboard-cliente', 'DashboardController@index')->name('cliente');
Route::get('/dashboard-admin', 'DashboardController@index')->name('admin');

//Busca Dashboard Cliente
Route::get('/busca-dashboard', 'DashboardController@busca')->name('cliente');

# Procedimentos
Route::group(['prefix' => 'procedimentos'], function () {
    Route::get('/lista', 'ProcedimentosController@home')->name('procedimentos');
    Route::get('/cadastro', ['uses' => 'ProcedimentosController@index']);
    Route::post('/gravar', ['uses' => 'ProcedimentosController@create']);
    Route::post('/upload', ['uses' => 'ProcedimentosController@upload']);
    Route::get('/listagem', ['uses' => 'ProcedimentosController@store']);
    Route::get('/admin', ['uses' => 'ProcedimentosController@admin']);
    Route::post('/destroy/{id}', ['uses' => 'ProcedimentosController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'ProcedimentosController@index']);
    Route::get('/buscar/{id}', ['uses' => 'ProcedimentosController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'ProcedimentosController@update']);
    Route::get('/destaques', ['uses' => 'ProcedimentosController@destaques']);
});

# Perguntas e Respostas
Route::group(['prefix' => 'perguntas'], function () {
    Route::get('/lista', 'PerguntasController@home')->name('perguntas');
    Route::get('/cadastro', ['uses' => 'PerguntasController@index']);
    Route::post('/gravar', ['uses' => 'PerguntasController@create']);
    Route::post('/upload', ['uses' => 'PerguntasController@upload']);
    Route::get('/listagem', ['uses' => 'PerguntasController@store']);
    Route::get('/admin', ['uses' => 'PerguntasController@admin']);
    Route::get('/listagem', ['uses' => 'PerguntasController@store']);
    Route::post('/destroy/{id}', ['uses' => 'PerguntasController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'PerguntasController@index']);
    Route::get('/buscar/{id}', ['uses' => 'PerguntasController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'PerguntasController@update']);
    Route::get('/destaques', ['uses' => 'PerguntasController@destaques']);
    Route::get('/palavras', ['uses' => 'PerguntasController@palavras']);
});

//Vagas
Route::group(['prefix' => 'vagas'], function () {
    Route::get('/', 'VagasController@home')->name('vagas');
    Route::get('/detalhes/{id}', ['uses' => 'VagasController@detalhes']);
    Route::get('/cadastrar', ['uses' => 'VagasController@cadastrar']);
    Route::get('/cadastro', ['uses' => 'VagasController@index']);
    Route::post('/gravar', ['uses' => 'VagasController@create']);
    Route::get('/lista', ['uses' => 'VagasController@store']);
    Route::get('/admin', ['uses' => 'VagasController@admin']);
    Route::post('/getdetalhe/{id}', ['uses' => 'VagasController@getvagadetalhe']);
    Route::post('/destroy/{id}', ['uses' => 'VagasController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'VagasController@index']);
    Route::get('/buscar/{id}', ['uses' => 'VagasController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'VagasController@update']);
    Route::get('/candidatos/{id}', ['uses' => 'VagasController@listagemcandidatos']);
    Route::get('/destaques', ['uses' => 'VagasController@destaques']);
    Route::get('/lista/admin', ['uses' => 'VagasController@storeadmin']);
});

# Areas
Route::group(['prefix' => 'areas'], function () {
    Route::get('/cadastro', ['uses' => 'AreasController@index']);
    Route::post('/gravar', ['uses' => 'AreasController@create']);
    Route::get('/lista', ['uses' => 'AreasController@store']);
    Route::get('/admin', ['uses' => 'AreasController@admin']);
    Route::post('/destroy/{id}', ['uses' => 'AreasController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'AreasController@index']);
    Route::get('/buscar/{id}', ['uses' => 'AreasController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'AreasController@update']);
});

# Cargos
Route::group(['prefix' => 'cargos'], function () {
    Route::get('/cadastro', ['uses' => 'CargosController@index']);
    Route::post('/gravar', ['uses' => 'CargosController@create']);
    Route::get('/lista/{id}', ['uses' => 'CargosController@store']);
    Route::get('/lista', ['uses' => 'CargosController@listagem']);
    Route::get('/listagem', ['uses' => 'CargosController@listagem']);
    Route::get('/admin', ['uses' => 'CargosController@admin']);
    Route::post('/destroy/{id}', ['uses' => 'CargosController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'CargosController@index']);
    Route::get('/buscar/{id}', ['uses' => 'CargosController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'CargosController@update']);
});

# Estados
Route::group(['prefix' => 'estados'], function () {
    Route::get('/lista', ['uses' => 'EstadosController@store']);
    Route::get('/buscar/{id}', ['uses' => 'EstadosController@edit']);
});

# Cidades
Route::group(['prefix' => 'cidades'], function () {
    Route::get('/lista', ['uses' => 'CidadesController@store']);
    Route::get('/lista/{id}', ['uses' => 'CidadesController@store']);
});

# Hoteis
Route::group(['prefix' => 'hoteis'], function () {
    Route::get('/cadastro', ['uses' => 'HoteisController@index']);
    Route::post('/gravar', ['uses' => 'HoteisController@create']);
    Route::get('/lista', ['uses' => 'HoteisController@store']);
    Route::get('/admin', ['uses' => 'HoteisController@admin']);
    Route::get('/listagem/{id}', ['uses' => 'HoteisController@listagem']);
    Route::post('/destroy/{id}', ['uses' => 'HoteisController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'HoteisController@index']);
    Route::get('/buscar/{id}', ['uses' => 'HoteisController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'HoteisController@update']);
});

# Categorias de Perguntas
Route::group(['prefix' => 'categoriasperguntas'], function () {
    Route::get('/cadastro', ['uses' => 'CategoriasPerguntasController@index']);
    Route::get('/lista', ['uses' => 'CategoriasPerguntasController@store']);
    Route::post('/gravar', ['uses' => 'CategoriasPerguntasController@create']);
    Route::get('/admin', ['uses' => 'CategoriasPerguntasController@admin']);
    Route::post('/destroy/{id}', ['uses' => 'CategoriasPerguntasController@destroy']);
    Route::get('/editar/{id}', ['uses' => 'CategoriasPerguntasController@index']);
    Route::get('/buscar/{id}', ['uses' => 'CategoriasPerguntasController@edit']);
    Route::post('/atualiza/{id}', ['uses' => 'CategoriasPerguntasController@update']);
});

# Candidatos
Route::group(['prefix' => 'candidatos'], function () {
    Route::get('/cadastro', ['uses' => 'CandidatosController@index']);
    Route::post('/upload', ['uses' => 'CandidatosController@upload']);
    Route::post('/gravar', ['uses' => 'CandidatosController@create']);
    Route::get('/excluir', ['uses' => 'CandidatosController@excluircv']);
    Route::get('/cadidatar/{id}', ['uses' => 'CandidatosController@index']);
    Route::post('/apagarcv', ['uses' => 'CandidatosController@apagarcv']);
    Route::get('/admin', ['uses' => 'CandidatosController@admin']);
    Route::get('/lista', ['uses' => 'CandidatosController@store']);
    Route::post('/destroy/{id}', ['uses' => 'CandidatosController@destroy']);
    Route::get('/detalhe/{id}', ['uses' => 'CandidatosController@detalhes']);
    Route::post('/getcandidatodetalhe/{id}', ['uses' => 'CandidatosController@getcandidatodetalhe']);
    Route::get('/listacandidato/{id}', ['uses' => 'CandidatosController@listacandidato']);
    Route::post('/entrevista', ['uses' => 'CandidatosController@entrevista']);
    Route::post('/reprovar/{id}', ['uses' => 'CandidatosController@reprovar']);
    Route::post('/aprovar/{id}', ['uses' => 'CandidatosController@aprovar']);
    Route::get('/confirmou', ['uses' => 'ActionsController@candaidatoconfirma']);
});
