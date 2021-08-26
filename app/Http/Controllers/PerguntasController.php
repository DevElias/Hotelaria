<?php

namespace App\Http\Controllers;

use Doctrine\DBAL\Query\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Google\Cloud\Storage\StorageClient;
use Google\Cloud\Core\Exception\GoogleException;

class PerguntasController extends Controller
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
        return view('perguntas/index');
    }

    public function index()
    {
        return view('perguntas/CadastroPerguntas');
    }

    public function create(Request $request)
    {
        $input   = $request->all();
		$url = !empty($input['url']) ? $input['url'] : 0;

		# Registra Pergunta
        $id_pergunta =  DB::table('perguntas')->insertGetId([
            'pergunta'              => $input['pergunta'],
            'resposta'              => $input['resposta'],
            'documento'             => $url,
            'palavras_chave'        => $input['palavras'],
            'destacado'             => $input['destacado'],
            'id_categoriaperguntas' => $input['id_categoria'],
            'login'                 => $input['login'],
            'status'                => '1',
            'usuario_inclusao'      => $_SESSION['id'],
            'data_inclusao'         => date('Y-m-d H:i:s'),
            'usuario_alteracao'     =>'0',
        ]); // 'login'                 => $input['login'],

        if (!empty($id_pergunta))
        {
            $message[] = 'Pergunta Cadastrada com Sucesso!';
            $code      = 200;

            # Busca Usuario
            $results = DB::select('select * from perguntas where id =' . $id_pergunta);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar perguntas';
            $code      = 400;
            $results   = '';
        }

        # feedback
        return response(['message' => $message, 'code' => $code, 'pergunta' => $results]);
    }

    public function upload(Request $request)
    {
		if (env('APP_ENV') == 'local') {
        	$arquivo = str_replace('data:application/pdf;base64,', '', $request->input('files'));
			$newname = date("dmYHis");
			$destinationPath = base_path('public/perguntas/');
			$file = file_put_contents($destinationPath.$newname.'.pdf', base64_decode($arquivo));

			if(!empty($file))
			{
				$url = '/perguntas/'.$newname.'.pdf';
				return response(['url' => $url]);
			}
		} else {
			if ($request->get('files')) {
				$image = $request->get('files');
				$name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
			}
			if (!empty($name) && !empty($image)) {
				$prefix = 'perguntas';
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

    public function admin()
    {
        return view('perguntas/AdminPerguntas');
    }

    public function store(Request $request)
    {
        # Lista Perguntas
        $results = DB::select(' select
                                    perguntas.*,
                                    CASE
                                    WHEN perguntas.destacado = 0 THEN "Nao"
                                    ELSE "Sim" END as Destacado,
                                    categoriasperguntas.categoria as Categoria
                                 from perguntas
                                    inner join categoriasperguntas on categoriasperguntas.id = perguntas.id_categoriaperguntas
                                 where perguntas.status = 1');
        $results = (array) $results;

        return response()->json([
            'perguntas' => $results,
        ]);
    }

    public function edit($id)
    {
        # Lista Pergunta para edicao
        $results = DB::select('select
                                perguntas.*,
                                categoriasperguntas.categoria as Categoria
                               from perguntas
                                inner join categoriasperguntas on categoriasperguntas.id = perguntas.id_categoriaperguntas
                               where perguntas.status = 1 and perguntas.id = ' . $id );
        $results = (array) $results;

        return response()->json([
            'pergunta' => $results,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
		$url = !empty($input['url']) ? $input['url'] : 0;

        $results = DB::table('perguntas')
        ->where('id', $id)
        ->update(['pergunta'         => $input['pergunta'],
            'resposta'               => $input['resposta'],
            'documento'              => $url,
            'palavras_chave'         => $input['palavras'],
            'destacado'              => $input['destacado'],
            'id_categoriaperguntas'  => $input['id_categoria'],
            'login'                  => $input['login'],
            'usuario_alteracao'      => $_SESSION['id'],
            'data_alteracao'         => date('Y-m-d H:i:s')
        ]); // *'login'                  => $input['login'],

        $message[] = 'Pergunta Alterada com Sucesso';
        $code      = 200;

        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function destroy($id)
    {
        $results = DB::table('perguntas')
        ->where('id', $id)
        ->update(['status' => '0']);

        $message[] = 'Pergunta Excluida com Sucesso';
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
            # Lista Perguntas
            try {
                $results = DB::select(' select
                                        perguntas.*,
                                        CASE
                                        WHEN perguntas.destacado = 0 THEN "Nao"
                                        ELSE "Sim" END as Destacado,
                                        categoriasperguntas.categoria as Categoria
                                    from perguntas
                                        inner join categoriasperguntas on categoriasperguntas.id = perguntas.id_categoriaperguntas
                                    where perguntas.status = 1 and perguntas.destacado = 1 and perguntas.login != 1 order by perguntas.id asc limit 4');
            } catch (QueryException $exception) {
                dd($exception);
            }
            $results = (array) $results;
        }
        return (!empty($results)) ? response()->json(['perguntas' => $results]) : response()->json(['perguntas' => []]);
    }

    public function palavras()
    {
        # Lista Perguntas
        $results   = DB::select(' select * from perguntas where perguntas.status = 1 order by perguntas.id asc limit 6');
        $results   = (array) $results;
        $aPalavras = array();
        $contador  = 0;

        foreach($results as $aItem)
        {
            $palavras  = explode(',', $aItem->palavras_chave);
            $aPalavras[$contador]['palavras'] = $palavras;

            $contador++;
        }

        $filteredArray = array_reduce(array_column($aPalavras, 'palavras'), 'array_merge', []);

        return response()->json([
            'palavras' => $filteredArray,
        ]);
    }
}
