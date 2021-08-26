<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use PHPMailer\PHPMailer;
use Google\Cloud\Storage\StorageClient;
use Google\Cloud\Core\Exception\GoogleException;

require(dirname(__FILE__).'/../../../vendor/phpmailer/phpmailer/src/PHPMailer.php');
require(dirname(__FILE__).'/../../../vendor/phpmailer/phpmailer/src/SMTP.php');
require(dirname(__FILE__).'/../../../vendor/phpmailer/phpmailer/src/POP3.php');
require(dirname(__FILE__).'/../../../vendor/phpmailer/phpmailer/src/Exception.php');

class CandidatosController extends Controller
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
        return view('candidatos/CadastroCandidatos');
    }

    public function upload(Request $request)
    {
		if (env('APP_ENV') == 'local') {
			$arquivo = str_replace('data:application/pdf;base64,', '', $request->input('files'));
			$newname = date("dmYHis");
			$destinationPath = base_path('public/candidatos/');
			$file = file_put_contents($destinationPath.$newname.'.pdf', base64_decode($arquivo));

			if(!empty($file))
			{
				$url = '/candidatos/'.$newname.'.pdf';
				return response(['url' => $url]);
			}
		} else {
			if ($request->get('files')) {
				$image = $request->get('files');
				$name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
			}
			if (!empty($name) && !empty($image)) {
				$prefix = 'candidatos';
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
				//return (!empty($object)) ? response(['url' => $url]) : false;
				return response(['url' => $url]);
			}
		}
    }

    public function create(Request $request)
    {
        $input = $request->all();

        // Tratamento para Inclusao
        $cpf                 = str_replace(".","",$input['cpf']);
        $cpf                 = str_replace("-","",$cpf);
        $input['cpf']        = $cpf;

        $telefone            = str_replace("(","",$input['telefone']);
        $telefone            = str_replace(")","",$telefone);
        $telefone            = str_replace("-","",$telefone);
        $telefone            = str_replace(" ","",$telefone);
        $input['telefone']   = $telefone;

        $celular            = str_replace("(","",$input['celular']);
        $celular            = str_replace(")","",$celular);
        $celular            = str_replace("-","",$celular);
        $celular            = str_replace(" ","",$celular);
        $input['celular']   = $celular;

        $cep                 = str_replace("-","",$input['cep']);
        $input['cep']        = $cep;

        if(array_key_exists('1', $input['aFiltroArea']))
        {
            $um = $input['aFiltroArea'][1];
        }
        else
        {
            $um = 0;
        }

        if(array_key_exists('2', $input['aFiltroArea']))
        {
            $dois = $input['aFiltroArea'][2];
        }
        else
        {
            $dois = 0;
        }

        if($input['id_vaga'] != '')
        {
            $vaga = $input['id_vaga'];
        }
        else
        {
            $vaga = 0;
        }

        # Verifica se o Cpf e Email ja esta cadastrado
        $aDados = DB::select("select * from candidatos where cpf = '" . $input['cpf'] . "' and email = '". $input['email'] . "'");
        $aDados = (array) $aDados;

        if(empty($aDados))
        {
            # Registra Candidato
            $id_candidato =  DB::table('candidatos')->insertGetId([
                'nome'                      => $input['nome'],
                'email'                     => $input['email'],
                'cpf'                       => $input['cpf'],
                'telefone'                  => $input['telefone'],
                'celular'                   => $input['celular'],
                'url_linkedin'              => $input['url_linkedin'],
                'url_curriculo'             => $input['url'],
                'cep'                       => $input['cep'],
                'endereco'                  => $input['endereco'],
                'numero'                    => $input['numero'],
                'complemento'               => $input['complemento'],
                'id_estado'                 => $input['id_estado'],
                'id_cidade'                 => $input['id_cidade'],
                'bairro'                    => $input['bairro'],
                'id_area1'                  => $input['aFiltroArea'][0],
                'id_area2'                  => $um,
                'id_area3'                  => $dois,
                'id_estado_gostaria'        => $input['id_estado_gostaria'],
                'id_cidade_gostaria'        => $input['id_cidade_gostaria'],
                'trabalhou_hotelariaBrasil' => $input['trabalhou_hotelariaBrasil'],
                'aceito_termos'             => $input['aceito_termos'],
                'aceito_politica'           => $input['aceito_politica'],
                'aceito_codigo'             => $input['aceito_codigo'],
                'id_vaga'                   => $vaga,
                'data_inclusao'             => date('Y-m-d H:i:s'),
            ]);

            if (!empty($id_candidato))
            {
                $message[] = 'Candidato Cadastrado com Sucesso!';
                $code      = 200;

                # Busca Usuario
                $results = DB::select('select * from candidatos where id =' . $id_candidato);
                $results = (array) $results;
            }
            else
            {
                $message[] = 'Erro ao Cadastrar Currículo';
                $code      = 400;
                $results   = '';
            }
        }
        else
        {
            $results = DB::table('candidatos')
            ->where('id', $aDados[0]->id)
            ->update(['nome'                => $input['nome'],
                'email'                     => $input['email'],
                'cpf'                       => $input['cpf'],
                'telefone'                  => $input['telefone'],
                'celular'                   => $input['celular'],
                'url_linkedin'              => $input['url_linkedin'],
                'url_curriculo'             => $input['url'],
                'cep'                       => $input['cep'],
                'endereco'                  => $input['endereco'],
                'numero'                    => $input['numero'],
                'complemento'               => $input['complemento'],
                'id_estado'                 => $input['id_estado'],
                'id_cidade'                 => $input['id_cidade'],
                'bairro'                    => $input['bairro'],
                'id_area1'                  => $input['aFiltroArea'][0],
                'id_area2'                  => $um,
                'id_area3'                  => $dois,
                'id_estado_gostaria'        => $input['id_estado_gostaria'],
                'id_cidade_gostaria'        => $input['id_cidade_gostaria'],
                'trabalhou_hotelariaBrasil' => $input['trabalhou_hotelariaBrasil'],
                'aceito_termos'             => $input['aceito_termos'],
                'aceito_politica'           => $input['aceito_politica'],
                'aceito_codigo'             => $input['aceito_codigo'],
                'id_vaga'                   => $vaga,
                'data_alteracao'            => date('Y-m-d H:i:s')
            ]);

            $message[] = 'Currículo Alterado com Sucesso';
            $code      = 200;
            $results   = (array) $results;
        }

        # feedback
        return response(['message' => $message, 'code' => $code, 'candidato' => $results]);
    }

    public function excluircv()
    {
        return view('candidatos/Excluir');
    }

    public function apagarcv(Request $request)
    {
        $input = $request->all();

        $cpf                 = str_replace(".","",$input['cpf']);
        $cpf                 = str_replace("-","",$cpf);
        $input['cpf']        = $cpf;

        // Verifica se usuario existe
        # Busca Usuario
        $results = DB::select("select * from candidatos where cpf = '" . $input['cpf'] . "' and email = '". $input['email'] . "' and status = 1");
        $results = (array) $results;

        if(!empty($results))
        {
            //Exclui o CV

            $results = DB::table('candidatos')
            ->where('id', $results[0]->id)
            ->update(['status' => '0']);

            $message[] = 'Currículo Excluido com Sucesso';
            $code      = 200;
        }
        else
        {
            $message[] = 'Currículo não Localizado';
            $code      = 400;
        }

        # feedback
        return response(['message' => $message, 'code' => $code]);
    }

    public function store(Request $request)
    {
        # Lista de Candidatos
        $results = DB::select('select candidatos.*, cargos.cargo as "Vaga"
                               from candidatos
                               left join vagas on vagas.id = candidatos.id_vaga
                               left join cargos on cargos.id = vagas.id_cargo
                               where candidatos.status = 1');
        $results = (array) $results;

        return response()->json([
            'candidatos' => $results,
        ]);
    }

    public function admin()
    {
        return view('candidatos/AdminCandidatos');
    }

    public function destroy($id)
    {
        $results = DB::table('candidatos')
        ->where('id', $id)
        ->update(['status' => '0']);

        $message[] = 'Candidato Excluido com Sucesso';
        $code      = 200;

        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }
    
    public function detalhes()
    {

        return view('candidatos/Detalhes');
    }
    
    public function getcandidatodetalhe($id)
    {
        # Lista de Candidatos
        $results = DB::select('select candidatos.*, cargos.cargo as "Vaga"
                               from candidatos
                               left join vagas on vagas.id = candidatos.id_vaga
                               left join cargos on cargos.id = vagas.id_cargo
                               where candidatos.id =' . $id);
        $results = (array) $results;

        return response()->json([
            'candidatos' => $results,
        ]);
    }

    public function listacandidato($id)
    {
        # Lista de Candidatos
        $results = DB::select('select candidatos.*, cargos.cargo as "Vaga",
                                CASE 
                                    WHEN candidatos.status_candidato = 0 THEN "Aguardando" 
                                    WHEN candidatos.status_candidato = 1 THEN "Pre Selecionado" 
                                    WHEN candidatos.status_candidato = 2 THEN "Reprovado" 
                                    ELSE "Aprovado"
                                END  as StatusCandidato
                               from candidatos
                               left join vagas on vagas.id = candidatos.id_vaga
                               left join cargos on cargos.id = vagas.id_cargo
                               where candidatos.status = 1 AND candidatos.id_vaga = ' . $id);
        $results = (array) $results;

        return response()->json([
            'candidatos' => $results,
        ]);
    }

    public function entrevista(Request $request)
    {
        $input = $request->all();

        $aCandidatos = $input['aCandidatos'];
        $data        = $input['data'];
        $hora        = $input['hora'];
        $local       = $input['local'];
        $procurar    = $input['procurar'];
        $vaga        = $input['candidatos'][0]['Vaga'];

        $mail        = new PHPMailer\PHPMailer();

        foreach($aCandidatos as $aItem)
        {
            $aUsuario =  DB::select("SELECT * FROM candidatos WHERE candidatos.id = " . $aItem);

            if(!empty($aUsuario))
            {
                //Server settings
                $mail->isSMTP();
                $mail->Host = 'smtp.kinghost.net';
                $mail->Port = 587;
                $mail->SMTPSecure = 'tls';
                $mail->SMTPAuth = true;
                $mail->Username = "noreply@santistacontroleambiental.com.br";
                $mail->Password = "WMorais@20";

                //Recipients
                $mail->setFrom('noreply@santistacontroleambiental.com.br', 'Hotelaria Brasil');
                $mail->addAddress($aUsuario[0]->email, utf8_decode($aUsuario[0]->nome));

                // Content
                $mail->isHTML(true);
                $mail->Subject = 'Convoca��o para entrevista';
                $mail->Body    = '<html>
                                        <head>
                                        	<meta charset="utf-8"/>
                                        	<meta http-equiv="X-UA-Compatible" content="IE=edge">
                                        	<title>Convocação para entrevista</title>
                                        </head>
                                        <body>
                                            <style>
                                            	* {
                                            		font-size: 14px;
                                            		line-height: 1.8em;
                                            		font-family: arial;
                                            	}
                                            </style>
                                        	<table style="margin:0 auto; max-width:660px;">
                                        		<thead>
                                        			<tr>
                                        				<th><img src="#" />  </th>
                                        			</tr>
                                        		</thead>
                                        		<tbody>
                                        			<tr>
                                        				<td><p style="padding-bottom:20px; text-align:center;">Prezado '. utf8_decode($aUsuario[0]->nome).'</p>
                                            				Convidamos voc&ecirc; para participar do nosso processo sele&ccedil;&atilde;o.<br>
                                                            Veja abaixo as informa&ccedil;&otilde;es, e caso tenha interesse em participarpor favor confirme sua presen&ccedil;a.<br>
                                                            <p><strong>Cargo: </strong> '. $vaga .'</p>
                                                            <p><strong>Data da Entrevista: </strong>'. $data .' </p>
                                                            <p><strong>Hor&aacute;rio: </strong>'. $hora .' </p>
                                                            <p><strong>Local: </strong> '. $local .'</p>
                                                            <p><strong>Procurar Por: </strong> '. $procurar .'</p>
                                                            <a style="font-size:16px; color:#fff;background:#056a7d; padding:10px 15px;" href="http://'.$_SERVER['HTTP_HOST'].'/candidatos/confirmou" target="_blank">Confirmar Presen�a</a>
                                        				</td>
                                        			</tr>
                                        			<tr>
                                        				<td>
                                        				</td>
                                        			</tr>
                                        		</tbody>
                                        	</table>
                                           </body>
                                        </html>';

                $mail->send();

                $mail->ClearAllRecipients();
                $mail->ClearAttachments();

                $message[] = 'Convite enviado com sucesso!';
                $code      = 200;
                $redirect  = '/';
                
                # Update no Status do Candidato - Para Pre Selecionado
                $results = DB::table('candidatos')
                        ->where('id', $aUsuario[0]->id)
                        ->update(['status_candidato' => '1']);
                
                # Update data da entrevista
                $results = DB::table('candidatos')
                    ->where('id', $aUsuario[0]->id)
                    ->update(['data_entrevista' => $data]);
                
            }
            else
            {
                $message[] = 'E-mail n&atilde;o localizado';
                $code      = 500;
                $redirect  = '';
            }
        }

        # feedback
        $code = (!empty($code)) ? $code : 200;
        return response(['response' => $message, 'code' => $code]);
    }
    
    public function reprovar($id)
    {
        $results = DB::table('candidatos')
        ->where('id', $id)
        ->update(['status_candidato' => '2']);
        
        $message[] = 'Candidato Reprovado com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }
    
    public function aprovar($id)
    {
        $results = DB::table('candidatos')
        ->where('id', $id)
        ->update(['status_candidato' => '3']);
        
        $message[] = 'Candidato Aprovado com Sucesso';
        $code      = 200;
        
        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }
}
