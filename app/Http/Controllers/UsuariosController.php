<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
//use PHPMailer\PHPMailer;
use App\Models\Mail;
use Google\Cloud\Storage\StorageClient;
use Google\Cloud\Core\Exception\GoogleException;

#require(dirname(__FILE__).'/../../../vendor/phpmailer/phpmailer/src/PHPMailer.php');
#require(dirname(__FILE__).'/../../../vendor/phpmailer/phpmailer/src/SMTP.php');
#require(dirname(__FILE__).'/../../../vendor/phpmailer/phpmailer/src/POP3.php');
#require(dirname(__FILE__).'/../../../vendor/phpmailer/phpmailer/src/Exception.php');

class UsuariosController extends Controller
{
    public function __construct()
    {
        session_start();
    }

    public function login(Request $request)
    {
        $input  = $request->all();

        # Acesso Email
        $results =  DB::table('usuarios')->
                    where('email', $input['email'])->
                    where('senha', $input['password'])->
                    where('status', 1)->get();

        if($results->isEmpty())
        {
            # Acesso CPF
            $results =  DB::table('usuarios')->
                        where('cpf', $input['email'])->
                        where('senha', $input['password'])->
                        where('status', 1)->get();
        }

        if($results->isNotEmpty())
        {
            $_SESSION['id']           = $results[0]->id;
            $_SESSION['nome']         = $results[0]->nome;
            $_SESSION['email']        = $results[0]->email;
            $_SESSION['cpf']          = $results[0]->cpf;
            $_SESSION['tipo_usuario'] = $results[0]->tipo_usuario;
            $_SESSION['tipo_admin']   = $results[0]->tipo_admin;
            $_SESSION['status']       = $results[0]->status;
            $_SESSION['cargo']        = $results[0]->id_cargo;
            $_SESSION['area']         = $results[0]->id_area;

            if($results[0]->img != '')
            {
                $_SESSION['foto']     = $results[0]->img;
            }
            else
            {
                $_SESSION['foto']     = '/img/perfilusuario.png';
            }

            if($_SESSION['status'] == 0)
            {
                $message[] = 'Usuario Inativo';
                $code      = 500;
                $redirect  = '';
                return response(['response' => $message, 'code' => $code, 'redirect' => $redirect]);
            }

            $message[] = 'Usuario logado com sucesso!';
            $code      = 200;

            if($_SESSION['tipo_usuario'] == '0')
            {
                $redirect  = '/dashboard-admin';
            }
            else
            {
                $redirect  = '/dashboard-cliente';
            }
        }
        else
        {
            $message[] = 'Usuario o Senha Incorreto';
            $code      = 500;
            $redirect  = '';
        }

        # feedback
        $code = (!empty($code)) ? $code : 200;
        return response(['message' => $message, 'code' => $code, 'redirect' => $redirect]);
    }

    public function logout()
    {
        session_destroy();
        header('Location: /login');
        die();
    }

    public function index()
    {
		if(empty($_SESSION)) {

			header('Location: /login');
			die();
		}

        return view('usuario/CadastroUsuarios');
    }

    public function create(Request $request)
    {
        $input   = $request->all();

        // Tratamento para Inclus�o
        $cpf                 = str_replace(".","",$input['cpf']);
        $cpf                 = str_replace("-","",$cpf);
        $input['cpf']        = $cpf;

        $nascimento          = str_replace("/","",$input['nascimento']);
        $input['nascimento'] = $nascimento;

        $telefone            = str_replace("(","",$input['telefone']);
        $telefone            = str_replace(")","",$telefone);
        $telefone            = str_replace(" ","",$telefone);
        $input['telefone']   = $telefone;

        $cep                 = str_replace("-","",$input['cep']);
        $input['cep']        = $cep;

        # Registra o Usuario
        $id_usuario =  DB::table('usuarios')->insertGetId([
            'nome'              => $input['nome'],
            'email'             => $input['email'],
            'senha'             => $input['senha'],
            'cpf'               => $input['cpf'],
            'data_nascimento'   => $input['nascimento'],
            'telefone'          => $input['telefone'],
            'cep'               => $input['cep'],
            'endereco'          => $input['endereco'],
            'numero'            => $input['numero'],
            'complemento'       => $input['complemento'],
            'bairro'            => $input['bairro'],
            'id_cidade'         => $input['id_cidade'],
            'id_estado'         => $input['id_estado'],
            'id_hotel'          => $input['id_hotel'],
            'tipo_usuario'      => $input['tipo_usuario'],
            'tipo_admin'        => $input['tipo_admin'],
            'status'            => '1',
            'id_area'           => $input['id_area'],
            'id_cargo'          => $input['id_cargo'],
            'img'               => $input['url'],
            'usuario_inclusao'  => $_SESSION['id'],
            'data_inclusao'     => date('Y-m-d H:i:s'),
            'usuario_alteracao' =>'0',
        ]);

        if (!empty($id_usuario))
        {
            $message[] = 'usuario criado: '.$id_usuario;
            $code      = 200;

            # Busca Usuario
            $results = DB::select('select * from usuarios where id =' . $id_usuario);
            $results = (array) $results;
        }
        else
        {
            $message[] = 'Erro ao criar usuario';
            $code      = 400;
            $results   = '';
        }

        # feedback
        return response(['message' => $message, 'code' => $code, 'usuario' => $results]);
    }

    public function store(Request $request)
    {
    	// <th scope="col">Hotel</th>
    	// <td>{usuario.hotel}</td>
    	// CASE WHEN usuarios.id_hotel IS NOT NULL THEN (SELECT hotel FROM hoteis WHERE hotel.id = usuarios.id_hotel) ELSE "" END AS hotel,
        # Lista Usuarios
        $results = DB::select('
			SELECT
				usuarios.*, 
				CASE WHEN usuarios.tipo_admin = 0 THEN "Master" ELSE "Editor" END AS Tipo_Admin,
				CASE WHEN usuarios.tipo_usuario = 0 THEN "Administrador" ELSE "Normal" END AS Tipo_Usuario
			from 
				usuarios
		');
        $results = (array) $results;

        return response()->json([
            'usuarios' => $results,
        ]);
    }
    public function buscaPerfil(Request $request)
    {
        # Busca Usuario
        $results = DB::select('select * from usuarios where id =' . $_SESSION['id']);
        $results = (array) $results;
        return response()->json([
            'perfil' => $results,
        ]);
    }
    public function perfil(Request $request)
    {
        return view('usuario/PerfilUsuario');
    }

    public function admin()
    {
        return view('usuario/AdminUsuarios');
    }

    public function esqueci()
    {
        $array1 = array();
        $array2 = array();
        
        $aTeste = DB::select("select * from perguntas where login = 1");
        
        if(!empty($aTeste))
        {
            list($array1, $array2) = array_chunk($aTeste, ceil(count($aTeste) / 2));
        }
        
        $data=[
            'array1'  => $array1,
            'array2' => $array2,
        ];
        
        return view('usuario/Esqueci')->with('detalhes', $data);
        
    }

    public function edit($id)
    {
        # Lista Usuario para Edicao no Admin
        $results = DB::select('select * from usuarios where id = ' . $id);
        $results = (array) $results;

        return response()->json([
            'usuario' => $results,
        ]);
    }

    public function update(Request $request)
    {
        $input   = $request->all();

        // Tratamento para Inclus�o
        $cpf                 = str_replace(".","",$input['cpf']);
        $cpf                 = str_replace("-","",$cpf);
        $input['cpf']        = $cpf;

        $nascimento          = str_replace("/","",$input['nascimento']);
        $input['nascimento'] = $nascimento;

        $telefone            = str_replace("(","",$input['telefone']);
        $telefone            = str_replace(")","",$telefone);
        $telefone            = str_replace("-","",$telefone);
        $telefone            = str_replace(" ","",$telefone);
        $input['telefone']   = $telefone;

        $cep                 = str_replace("-","",$input['cep']);
        $input['cep']        = $cep;

        $results = DB::table('usuarios')
                ->where('id', $input['id'])
                ->update(['nome'   => $input['nome'],
                          'email'   => $input['email'],
                          'data_nascimento'   => $input['nascimento'],
                          'cep'               => $input['cep'],
                          'endereco'          => $input['endereco'],
                          'numero'            => $input['numero'],
                          'complemento'       => $input['complemento'],
                          'bairro'            => $input['bairro'],
                          'id_cidade'         => $input['id_cidade'],
                          'telefone'          => $input['telefone'],
                          'id_estado'         => $input['id_estado'],
                          'id_hotel'          => $input['id_hotel'],
                          'id_area'           => $input['id_area'],
                          'id_cargo'          => $input['id_cargo'],
                          'tipo_admin'        => $input['tipo_admin'],
                          'tipo_usuario'      => $input['tipo_usuario'],
                          'img'               => $input['url'],
                          'senha'             => $input['senha'],
                          'usuario_alteracao' => $_SESSION['id'],
                          'data_alteracao'    => date("Y-m-d H:i:s")
                ]);

                if(!empty($results))
                {
                    $message[] = 'Dados Alterados com Sucesso!';
                    $code = 200;
                    $redirect = '';
                }
                else
                {
                    $message[] = 'Erro ao tentar alterar Dados';
                    $code = 500;
                    $redirect = '';
                }

                # feedback
                return response()->json([
                    'message' => $message,
                    'code'    => $code,
                    'result'  => $results,
                ]);
    }

    public function destroy($id)
    {
        $results = DB::table('usuarios')
        ->where('id', $id)
        ->update(['status' => '0']);

        $message[] = 'Usu�rio Excluido com Sucesso';
        $code      = 200;

        return response()->json([
            'message' => $message,
            'code'    => $code,
            'result'  => $results,
        ]);
    }

    public function upload(Request $request)
    {
		if (env('APP_ENV') == 'local') {
			if($request->get('file'))
			{
				$image = $request->get('file');
				$name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
			}
			$data = explode( ',', $image );
			$destinationPath = base_path('public/fotos/');
			$file = file_put_contents($destinationPath.$name, base64_decode($data[1]));
			if(!empty($name))
			{
				$url = '/fotos/'.$name;
				return response(['url' => $url]);
			}
		} else {
			if ($request->get('file')) {
				$image = $request->get('file');
				$name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
			}
			if (!empty($name) && !empty($image)) {
				$prefix = 'fotos';
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

    public function enviasenha(Request $request, Mail $mail)
    {
        $input   = $request->all();

        $aUsuario =  DB::select("SELECT * FROM usuarios WHERE usuarios.email = '" . $input['email'] . "'");
        
        if(!empty($aUsuario))
        {
            $body = '
            <html>
                <head>
                    <meta charset="utf-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <title>Esqueci minha Senha</title>
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
                                <td><p style="padding-bottom:20px; text-align:center;">Ol&aacute;,'. utf8_decode($aUsuario[0]->nome).'</p>
                                    Foi solicitado o envio de sua senha para acessar o sistema.<br>
                                    <p><strong>Email: </strong>'.$aUsuario[0]->email.'</p>
                                    <p><strong>Senha: </strong>'.$aUsuario[0]->senha.'</p>
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

            $send = $mail->sendMessage([[$aUsuario[0]->email, $aUsuario[0]->nome]], 'Esqueci minha senha', $body);

            if(!$send->error)
            {
                $message[] = 'Senha enviada com sucesso!';
                $code      = 200;
                $redirect  = '/';
            }else
            {
                $message[] = $send->response;
                $code      = 500;
                $redirect  = '';
            }
        }
        else
        {
            $message[] = 'E-mail não localizado';
            $code      = 500;
            $redirect  = '';
        }

        # feedback
        $code = (!empty($code)) ? $code : 200;
        return response(['response' => $message, 'code' => $code]);
    }

    /*
    public function enviasenha(Request $request)
    {
        $input   = $request->all();

        $aUsuario =  DB::select("SELECT * FROM usuarios WHERE usuarios.email = '" . $input['email'] . "'");
        $mail     = new PHPMailer\PHPMailer();

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
            $mail->addAddress($input['email'], utf8_decode($aUsuario[0]->nome));

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Esqueci minha senha';
            $mail->Body    = '<html>
                                        <head>
                                        	<meta charset="utf-8"/>
                                        	<meta http-equiv="X-UA-Compatible" content="IE=edge">
                                        	<title>Esqueci minha Senha</title>
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
                                        				<td><p style="padding-bottom:20px; text-align:center;">Ol&aacute;,'. utf8_decode($aUsuario[0]->nome).'</p>
                                            				Foi solicitado o envio de sua senha para acessar o sistema.<br>
                                                            <p><strong>Email: </strong>'.$aUsuario[0]->email.'</p>
                                                            <p><strong>Senha: </strong>'.$aUsuario[0]->senha.'</p>
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

            $message[] = 'Senha enviada com sucesso!';
            $code      = 200;
            $redirect  = '/';
        }
        else
        {
            $message[] = 'E-mail não localizado';
            $code      = 500;
            $redirect  = '';
        }

        # feedback
        $code = (!empty($code)) ? $code : 200;
        return response(['response' => $message, 'code' => $code]);
    }
    */
}
