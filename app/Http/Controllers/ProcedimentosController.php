<?php

namespace App\Http\Controllers;

use Doctrine\DBAL\Query\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Google\Cloud\Storage\StorageClient;
use Google\Cloud\Core\Exception\GoogleException;

class ProcedimentosController extends Controller
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
        return view('procedimentos/index');
    }

    public function index()
    {
        return view('procedimentos/CadastroProcedimentos');
    }

    public function upload(Request $request)
    {
    	if (env('APP_ENV') == 'local') {
			$arquivo = str_replace('data:application/pdf;base64,', '', $request->input('files'));
			$newname = date("dmYHis");
			$destinationPath = base_path('public/procedimentos/');
			$file = file_put_contents($destinationPath.$newname.'.pdf', base64_decode($arquivo));

			if(!empty($file))
			{
				$url = '/procedimentos/'.$newname.'.pdf';
				return response(['url' => $url]);
			}
		} else {
			if ($request->get('files')) {
				$image = $request->get('files');
				$name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
			}
			if (!empty($name) && !empty($image)) {
				$prefix = 'procedimentos';
				$file_name = $prefix.'/'.$name;
				$bucket_name =  'staging.rpl-works-portal-do-rh-qa.appspot.com';
				$url = 'https://storage.cloud.google.com/'.$bucket_name.'/'.$file_name;
				$data = explode( ',', $image);
				$dir = sys_get_temp_dir();
				$tmp = tempnam($dir, $prefix);
				file_put_contents($tmp, base64_decode($data[1]));
				$storage = new StorageClient();
				$bucket = $storage->bucket($bucket_name);
				$uploader = $bucket->getStreamableUploader(
					file_get_contents($tmp),
					['name' => $file_name, 'predefinedAcl' => 'publicRead']
				);
				try {
					$object = $uploader->upload();
				} catch (GoogleException $ex) {
					$resumeUri = $uploader->getResumeUri();
					$object = $uploader->resume($resumeUri);
				}
				return (!empty($object)) ? response(['url' => $url]) : false;
			}
    	}
    }

    public function create(Request $request)
    {
        $input   = $request->all();

        # Registra Procedimento
        $id_procedimento =  DB::table('procedimentos')->insertGetId([
                'titulo'            => $input['procedimento'],
                'descricao'         => utf8_encode($input['descricao']),
                'url_arquivo'       => $input['url'],
                'palavras_chave'    => $input['palavras_chave'],
                'id_categoria'      => $input['id_categoria'],
                'id_subcategoria'   => $input['id_subcategoria'],
                'destacado'         => $input['destacado'],
                'liberado'          => $input['liberado'],
                'status'            => '1',
                'usuario_inclusao'  => $_SESSION['id'],
                'data_inclusao'     => date('Y-m-d H:i:s'),
                'usuario_alteracao' =>'0',
        ]);

        if (!empty($id_procedimento))
        {
            $message[] = 'Procedimento Cadastrado com Sucesso!';
            $code      = 200;

            # Busca Usuario
            $results = DB::select('select * from procedimentos where id =' . $id_procedimento);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar procedimento';
            $code      = 400;
            $results   = '';
        }

        # feedback
        return response(['message' => $message, 'code' => $code, 'procedimento' => $results]);
    }

    public function store(Request $request)
    {
        # Lista Procedimentos
        $results = DB::select('select
                                    procedimentos.id as id,
                                    procedimentos.titulo as titulo,
                                    categorias.categoria as categoria,
                                    subcategorias.subcategoria as subcategoria,
                                    subcategorias.id as subcategoria_id,
                                    procedimentos.url_arquivo as url,
                                    procedimentos.liberado as liberado,
                                    CASE
                                        WHEN  procedimentos.destacado = 0 THEN "Nao"
                                        ELSE "Sim" END as Destacado,  
                                    procedimentos.destacado as destacado,
                                    CASE
                                        WHEN  procedimentos.liberado = 0 THEN "Nao"
                                        ELSE "Sim" END as Liberado 
                               from procedimentos
                                    inner join categorias on categorias.id = procedimentos.id_categoria
                                    inner join subcategorias on subcategorias.id = procedimentos.id_subcategoria
                               where procedimentos.status = 1');
        $results = (array) $results;

        return response()->json([
            'procedimentos' => $results,
        ]);
    }

    public function admin()
    {
        return view('procedimentos/AdminProcedimentos');
    }

    public function edit($id)
    {
        # Lista Procedimentos
        $results = DB::select('select
                                    procedimentos.id as id,
                                    procedimentos.titulo as titulo,
                                    procedimentos.descricao as descricao,
                                    procedimentos.palavras_chave as palavras_chave,
                                    categorias.categoria as categoria,
                                    subcategorias.subcategoria as subcategoria,
                                    subcategorias.id as subcategoria_id,
                                    procedimentos.url_arquivo as url,
                                    procedimentos.id_categoria as id_categoria,
                                    procedimentos.id_subcategoria as id_subcategoria,
                                    procedimentos.destacado as destacado,
                                    procedimentos.liberado as liberado
                               from procedimentos
                                    inner join categorias on categorias.id = procedimentos.id_categoria
                                    inner join subcategorias on subcategorias.id = procedimentos.id_subcategoria
                               where procedimentos.status = 1 and procedimentos.id =' . $id);
        $results = (array) $results;
        
        return response()->json([
            'procedimento' => $results,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        
        $results = DB::table('procedimentos')
        ->where('id', $id)
        ->update(['titulo'       => $input['procedimento'],
            'descricao'          => $input['descricao'],
            'url_arquivo'        => $input['url'],
            'palavras_chave'     => $input['palavras_chave'],
            'id_categoria'       => $input['id_categoria'],
            'id_subcategoria'    => $input['id_subcategoria'],
            'destacado'          => $input['destacado'],
            'liberado'           => $input['liberado'],
            'usuario_alteracao'  => $_SESSION['id'],
            'data_alteracao'     => date('Y-m-d H:i:s')
        ]);
        
        $message[] = 'Procedimento Alterado com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function destroy($id)
    {
        $results = DB::table('procedimentos')
        ->where('id', $id)
        ->update(['status' => '0']);
        
        $message[] = 'Procedimento Excluido com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }
    
    public function destaques(Request $request)
    {
        if (!empty($request)) {
            # Lista Procedimentos
            try {
                $results = DB::select('select
                                    procedimentos.id as id,
                                    procedimentos.titulo as titulo,
                                    categorias.categoria as categoria,
                                    subcategorias.subcategoria as subcategoria,
                                    subcategorias.id as subcategoria_id,
                                    procedimentos.url_arquivo as url,
                                    procedimentos.liberado as liberado,
                                    CASE
                                        WHEN  procedimentos.destacado = 0 THEN "Nao"
                                        ELSE "Sim" END as Destacado,
                                    procedimentos.destacado as destacado,
                                    CASE
                                        WHEN  procedimentos.liberado = 0 THEN "Nao"
                                        ELSE "Sim" END as Liberado
                               from procedimentos
                                    inner join categorias on categorias.id = procedimentos.id_categoria
                                    inner join subcategorias on subcategorias.id = procedimentos.id_subcategoria
                               where procedimentos.status = 1 and procedimentos.destacado = 1 order by procedimentos.id asc limit 4');
            } catch (QueryException $exception) {
                dd($exception);
            }
            $results = (array) $results;
        }
        return (!empty($results)) ? response()->json(['procedimentos' => $results]) : response()->json(['procedimentos' => []]);
    }
}
