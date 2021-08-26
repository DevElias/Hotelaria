<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class VagasController extends Controller
{
    public function __construct()
    {
        session_start();
        
        if(empty($_SESSION)) {
            
            header('Location: /login');
            die();
        }
    }

    public function home()
    {
        return view('vagas/index');
    }

    public function index()
    {
        return view('vagas/CadastroVagas');
    }

    public function detalhes()
    {

        return view('vagas/detalhes');
    }

    public function listagemcandidatos()
    {
        return view('vagas/AdminVagasCandidatos');
    }

    public function getvagadetalhe($id)
    {
        # Lista Vagas Detalhe
        $results = DB::select('select
                                vagas.*,
                                DATE_FORMAT(vagas.vaga_expira, "%d/%m/%Y") as DtExpira,
                                areas.area as Area,
                                cargos.cargo as Cargo,
                                estados.sigla as Sigla,
                                estados.nome as Estado,
                                cidades.nome as Cidade,
                                hoteis.hotel as Hotel,
                                usuarios.nome as Responsavel
                               from vagas
                                inner join cargos on cargos.id = vagas.id_cargo
                                inner join areas on areas.id = vagas.id_area
                                inner join estados on estados.id = vagas.id_estado
                                inner join cidades on cidades.id = vagas.id_cidade
                                left join hoteis on hoteis.id = vagas.id_hotel
                                left join usuarios on usuarios.id = vagas.id_responsavel
                               where vagas.status = 1 and vagas.id =' . $id);
        $results = (array) $results;

        # feedback
        return response([ 'vaga' => $results]);
    }

    public function cadastrar()
    {
        return view('vagas/cadastrar');
    }

    public function create(Request $request)
    {
        $input = $request->all();

        $data =  explode('/', $input['vaga_expira']);
        $dt   = $data[2] . '-' . $data[1] . '-' . $data[0];

        # Registra a Vaga
        $id_vaga =  DB::table('vagas')->insertGetId([
            'id_area'           => $input['id_area'],
            'id_cargo'          => $input['id_cargo'],
            'id_estado'         => $input['id_estado'],
            'id_cidade'         => $input['id_cidade'],
            'id_hotel'          => $input['id_hotel'],
            'tipo_contratacao'  => $input['tipo_contratacao'],
            'carga_horaria_de'  => $input['carga_horaria_de']  . ':00',
            'carga_horaria_ate' => $input['carga_horaria_ate'] . ':00',
            'faixa_salarial'    => $input['faixa_salarial'],
            'vaga_expira'       => $dt,
            'descricao'         => $input['descricao'],
            'requisitos'        => $input['requisitos'],
            'id_responsavel'    => $input['id_responsavel'],
            'status'            => '1',
            'destacado'         => $input['destacado'],
            'status_vaga'       => $input['status_vaga'],
            'usuario_inclusao'  => $_SESSION['id'],
            'data_inclusao'     => date('Y-m-d H:i:s'),
            'usuario_alteracao' =>'0',
        ]);

        if (!empty($id_vaga))
        {
            $message[] = 'Vaga Cadastrada com Sucesso!';
            $code      = 200;

            # Busca Categoria
            $results = DB::select('select * from vagas where id =' . $id_vaga);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar vaga';
            $code      = 400;
            $results   = '';
        }

        # feedback
        return response(['message' => $message, 'code' => $code, 'vaga' => $results]);
    }

    public function store(Request $request)
    {
        # Lista Vagas
        $results = DB::select('select
                                vagas.*,
                                DATE_FORMAT(vagas.vaga_expira, "%d/%m/%Y") as DtExpira,
                                areas.area as Area,
                                cargos.cargo as Cargo,
                                estados.sigla as Sigla,
                                estados.nome as Estado,
                                cidades.nome as Cidade,
                                hoteis.hotel as Hotel,
                                usuarios.nome as Responsavel,
                                CASE WHEN vagas.destacado = 0 THEN "Nao" ELSE "Sim" END as Destacado
                               from vagas
                                inner join cargos on cargos.id = vagas.id_cargo
                                inner join areas on areas.id = vagas.id_area
                                inner join estados on estados.id = vagas.id_estado
                                inner join cidades on cidades.id = vagas.id_cidade
                                left join hoteis on hoteis.id = vagas.id_hotel
                                left join usuarios on usuarios.id = vagas.id_responsavel
                               where vagas.status = 1 and vagas.status_vaga = 1');
        $results = (array) $results;

        return response()->json([
            'vagas' => $results,
        ]);
    }

    public function edit($id)
    {
        # Lista Vagas especificando ID
        $results = DB::select('select
                                vagas.*,
                                DATE_FORMAT(vagas.vaga_expira, "%d/%m/%Y") as DtExpira,
                                areas.area as Area,
                                cargos.cargo as Cargo,
                                estados.sigla as Sigla,
                                estados.nome as Estado,
                                cidades.nome as Cidade,
                                hoteis.hotel as Hotel,
                                usuarios.nome as Responsavel
                               from vagas
                                inner join cargos on cargos.id = vagas.id_cargo
                                inner join areas on areas.id = vagas.id_area
                                inner join estados on estados.id = vagas.id_estado
                                inner join cidades on cidades.id = vagas.id_cidade
                                left join hoteis on hoteis.id = vagas.id_hotel
                                left join usuarios on usuarios.id = vagas.id_responsavel
                               where vagas.status = 1 and vagas.id =' .$id);
        $results = (array) $results;

        return response()->json([
            'vaga' => $results,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();

        $data =  explode('/', $input['vaga_expira']);
        $dt   = $data[2] . '-' . $data[1] . '-' . $data[0];

        $results = DB::table('vagas')
        ->where('id', $id)
        ->update(['id_area'          => $input['id_area'],
                 'id_cargo'          => $input['id_cargo'],
                 'id_estado'         => $input['id_estado'],
                 'id_cidade'         => $input['id_cidade'],
                 'id_hotel'          => $input['id_hotel'],
                 'tipo_contratacao'  => $input['tipo_contratacao'],
                 'carga_horaria_de'  => $input['carga_horaria_de'],
                 'carga_horaria_ate' => $input['carga_horaria_ate'],
                 'faixa_salarial'    => $input['faixa_salarial'],
                 'vaga_expira'       => $dt,
                 'descricao'         => $input['descricao'],
                 'requisitos'        => $input['requisitos'],
                 'id_responsavel'    => $input['id_responsavel'],
                 'destacado'         => $input['destacado'],
                'status_vaga'        => $input['status_vaga'],
                 'usuario_alteracao' => $_SESSION['id'],
                 'data_alteracao'    => date('Y-m-d H:i:s')
        ]);

        $message[] = 'Vaga Alterada com Sucesso';
        $code      = 200;

        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function destroy($id)
    {
        $results = DB::table('vagas')
        ->where('id', $id)
        ->update(['status' => '0']);

        $message[] = 'Vaga Excluida com Sucesso';
        $code      = 200;

        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function admin()
    {
        return view('vagas/AdminVagas');
    }

    public function destaques(Request $request)
    {
        # Lista Vagas
        $results = DB::select('select
                                vagas.*,
                                DATE_FORMAT(vagas.vaga_expira, "%d/%m/%Y") as DtExpira,
                                areas.area as Area,
                                cargos.cargo as Cargo,
                                estados.sigla as Sigla,
                                estados.nome as Estado,
                                cidades.nome as Cidade,
                                hoteis.hotel as Hotel,
                                usuarios.nome as Responsavel
                               from vagas
                                inner join cargos on cargos.id = vagas.id_cargo
                                inner join areas on areas.id = vagas.id_area
                                inner join estados on estados.id = vagas.id_estado
                                inner join cidades on cidades.id = vagas.id_cidade
                                left join hoteis on hoteis.id = vagas.id_hotel
                                left join usuarios on usuarios.id = vagas.id_responsavel
                               where vagas.status = 1 and vagas.destacado = 1 and vagas.status_vaga = 1 order by vagas.id asc limit 2');
        $results = (array) $results;

        return response()->json([
            'vagas' => $results,
        ]);
    }
    
    public function storeadmin(Request $request)
    {
        # Lista Vagas tela admin
        $results = DB::select('select
                                vagas.*,
                                DATE_FORMAT(vagas.vaga_expira, "%d/%m/%Y") as DtExpira,
                                areas.area as Area,
                                cargos.cargo as Cargo,
                                estados.sigla as Sigla,
                                estados.nome as Estado,
                                cidades.nome as Cidade,
                                hoteis.hotel as Hotel,
                                usuarios.nome as Responsavel,
                                CASE WHEN vagas.destacado = 0 THEN "Nao" ELSE "Sim" END as Destacado,
                                CASE 
                                    WHEN vagas.status_vaga = 0 THEN "Rascunho" 
                                    WHEN vagas.status_vaga = 1 THEN "Publicado" 
                                    WHEN vagas.status_vaga = 2 THEN "Encerrado" 
                                    ELSE "Finalizado" 
                               END as status_vaga
                               from vagas
                                inner join cargos on cargos.id = vagas.id_cargo
                                inner join areas on areas.id = vagas.id_area
                                inner join estados on estados.id = vagas.id_estado
                                inner join cidades on cidades.id = vagas.id_cidade
                                left join hoteis on hoteis.id = vagas.id_hotel
                                left join usuarios on usuarios.id = vagas.id_responsavel
                               where vagas.status = 1 order by id desc');
        $results = (array) $results;
        
        return response()->json([
            'vagas' => $results,
        ]);
    }
}
