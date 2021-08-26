import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import InputMask from 'react-input-mask';
import MenuAreas from "./MenuAreas";
import IncludeVagas from "../vagas/IncludeVagas";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Cadidatos extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			nome: null,
			cpf: null,
			email: null,
			telefone: '',
			celular: '',
			endereço: '',
			numero: '',
			complemento: '',
			cep: '',
			estado: '',
			id_estado: '',
			cidades: '',
			id_cidade: '',
			aFiltroArea: [],
			areas: '',
			id_area_1: '',
			id_area_2: '',
			id_area_3: '',
			estados_gostaria: '',
			id_estado_gostaria: '',
			cidades_gistaria: '',
			id_cidade_gostaria: '',
			url_linkedin: '',
			url_curriculo: '',
			trabalhou_hotelariaBrasil: '',
			mensagem: '',
			aceito_termos: '',
			aceito_politica: '',
			aceito_codigo: '',
			id_vaga: '',
			id: '',
			url: '',
			status_candidato: '',
			errors: {
				nome: '',
				email: '',
				cpf: '',
				telefone: '',
				celular: '',
				endereco: '',
				numero: '',
				cep: '',
				bairro: '',
			  }
		};

		const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});

			// Carrega Cidades de Acordo com Estado
			if(e.target.name == 'id_estado')
			{
				$("#id_cidade").empty();
				let idEstado = e.target.value;
				this.getCidades(idEstado);
			}

			// Carrega Cidades de Acordo com Estado que gostaria de trabalhar
			if(e.target.name == 'id_estado_gostaria')
			{
				$("#id_cidade_gostaria").empty();
				let idEstado = e.target.value;
				this.getCidadesGostaria(idEstado);
			}

			// Upload Procedimento
			if(e.target.name == 'file')
			{
				let files = e.target.files;
				let reader= new FileReader();
				reader.readAsDataURL(files[0]);

				reader.onload=(e)=>{
					const formData = {files: e.target.result}
					axios
					.post('/candidatos/upload', formData)
					.then(response =>
					{
						document.getElementById('url').value = response.data.url;
						this.state.url = response.data.url;
						this.forceUpdate()
					})
					.catch(error =>
					{
						console.log(error);
					})
				}
			}

			const { name, value } = e.target;
			let errors = this.state.errors;

			switch (name) {
			  case 'nome':
				errors.nome =
				  value.length < 5
					? 'Digite seu nome completo!'
					: '';
				break;
				case 'email':
					errors.email =
				  validEmailRegex.test(value)
					? ''
					: 'Digite seu email!';
				break;
				case 'telefone':
					let retiramascara = parseInt(value.replace(/[().\s-]+/g,''));
					let telefonesemmask = retiramascara.toString().length;

					if(parseInt(telefonesemmask) < 10) {
						errors.telefone = 'Digite seu telefone!';
					} else {
						errors.telefone = '';
					}
					break;

			case 'cpf':
				let retiramascara5 = parseInt(value.replace(/[().\s-]+/g,''));
				let cpfsemmask = retiramascara5.toString().length;

				if(parseInt(cpfsemmask) < 11) {
					errors.cpf = 'Digite seu CPF!';
				} else {
					errors.cpf = '';
				}
				break;
			case 'celular':
				let retiramascara2 = parseInt(value.replace(/[().\s-]+/g,''));
				let telefonesemmask2 = retiramascara2.toString().length;

				if(parseInt(telefonesemmask2) < 11) {
					errors.celular = 'Digite seu celular!';
				} else {
					errors.celular = '';
				}
					break;
			case 'cep':
				let retiramascara3 = parseInt(value.replace(/[().\s-]+/g,''));
				let cepsemmaskara = retiramascara3.toString().length;
				if(parseInt(cepsemmaskara) < 11) {
					errors.celular = 'Digite seu celular!';
				} else {
					errors.celular = '';
				}
					break;
			case 'bairro':
				errors.bairro =
					value.length < 5
					? 'Digite seu bairro!'
					: '';
				break;

			}

			this.setState({errors, [name]: value});
		}

		const validateForm = (errors) => {
			let valid = true;
			Object.values(errors).forEach(
			  // if we have an error string set valid to false
			  (val) => val.length > 0 && (valid = false)
			);
			return valid;
		  }

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
			if(validateForm(this.state.errors) && (this.state.nome !== null)) {
				if(this.state.id == '')
					{
						axios
						.post('/candidatos/gravar', this.state)
						.then(response =>
						{
							if(response.data.code == 400)
							{
								return toast.error(response.data.message[0]);
							}
							if(response.data.code == 200)
							{
								document.getElementById("formularioCand").reset()
								return toast.success(response.data.message[0]);
							}
						})
						.catch(error =>
						{
							return toast.error(error);
						})
					}
					else
					{
						axios
						.post('/candidatos/atualiza/'+this.state.id, this.state)
						.then(response =>
						{
							window.location.replace('/candidatos/admin');
						})
						.catch(error =>
						{
							console.log(error);
						})
					}
			}

		}

		this.SetAreas     = this.SetAreas.bind(this);
		this.SetTermos    = this.SetTermos.bind(this);
		this.SetPolitica  = this.SetPolitica.bind(this);
		this.SetCodigo    = this.SetCodigo.bind(this);
		this.SetTrabalhou = this.SetTrabalhou.bind(this);
	}

	// Get dos Estados
	getEstados() {
		document.getElementById("id_cidade").disabled = true;
        axios.get('/estados/lista')
            .then((response) =>
            {
            	const comboEstados = document.getElementById("id_estado");
            	let option = '';
            	let estados = [];
                let estadosCompleted = [];
                response.data.estados.map((estado) =>
                    (estado.completed == 1) ? estadosCompleted.push(estado) : estados.push(estados));

                // Precisa adicionar o ComboBox ao State para manipular na edicao
                this.setState({
                	estados: [...response.data.estados]
				})

                response.data.estados.forEach((options_estados) => {
                	  option = new Option(options_estados.sigla, options_estados.id);
                	  comboEstados.options[comboEstados.options.length] = option;
					});

            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get dos Estados que gostaria de trabalhar
	getEstadosGostaria() {
		document.getElementById("id_cidade_gostaria").disabled = true;
        axios.get('/estados/lista')
            .then((response) =>
            {
            	const comboEstados = document.getElementById("id_estado_gostaria");
            	let option = '';
            	let estados = [];
                let estadosCompleted = [];
                response.data.estados.map((estado) =>
                    (estado.completed == 1) ? estadosCompleted.push(estado) : estados.push(estados));

                response.data.estados.forEach((options_estados) => {
                	  option = new Option(options_estados.sigla, options_estados.id);
                	  comboEstados.options[comboEstados.options.length] = option;
					});

            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get das Cidades
	getCidades(idEstado) {
		let id = idEstado;
        axios.get('/cidades/lista/'+id)
            .then((response) =>
            {
            	document.getElementById("id_cidade").disabled = false;
            	const comboCidades = document.getElementById("id_cidade");
            	let option = '';
            	let cidades = [];
                let cidadesCompleted = [];
                response.data.cidades.map((cidade) =>
                    (cidade.completed == 1) ? cidadesCompleted.push(cidade) : cidades.push(cidades));

                // Adiciona o Elemento 0 no ComboBox
                var newoption = new Option('-- SELECIONAR --', 'DEFAULT');
                comboCidades.add(newoption);

                response.data.cidades.forEach((options_cidades) => {
                	  option = new Option(options_cidades.nome, options_cidades.id);
                	  comboCidades.options[comboCidades.options.length] = option;
                	});
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get das Cidades
	getCidadesGostaria(idEstado) {
		let id = idEstado;
        axios.get('/cidades/lista/'+id)
            .then((response) =>
            {
            	document.getElementById("id_cidade_gostaria").disabled = false;
            	const comboCidadesGostaria = document.getElementById("id_cidade_gostaria");
            	let option = '';
            	let cidadesGostaria = [];
                let cidadesCompletedGostaria = [];
                response.data.cidades.map((cidade) =>
                    (cidadesGostaria.completed == 1) ? cidadesCompletedGostaria.push(cidade) : cidadesGostaria.push(cidadesGostaria));

                // Adiciona o Elemento 0 no ComboBox
                var newoption = new Option('-- SELECIONAR --', 'DEFAULT');
                comboCidadesGostaria.add(newoption);

                response.data.cidades.forEach((options_cidades) => {
                	  option = new Option(options_cidades.nome, options_cidades.id);
                	  comboCidadesGostaria.options[comboCidadesGostaria.options.length] = option;
                	});
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Seta no State as Areas
	SetAreas(idArea)
	{

		let chk = document.getElementById("checkboxArea"+idArea);

		// Se checked adiciona no State
		if (chk.checked == true)
		{
			this.setState({
	            aFiltroArea: [... this.state.aFiltroArea, idArea]
	        })
		}
		else
		{
		    this.setState({
				aFiltroArea: this.state.aFiltroArea.filter(
				function(areas){
		        return areas !== idArea
				})
			});
		}
	}

	// Seta no State se chechou ou nao os termos
	SetTermos()
	{

		let chk = document.getElementById("aceito_termos");

		// Se checked adiciona no State
		if (chk.checked == true)
		{
			this.setState({
				aceito_termos: 1
	        })
		}
		else
		{
			this.setState({
				aceito_termos: 0
	        })
		}
	}

	SetPolitica()
	{

		let chk = document.getElementById("aceito_politica");

		// Se checked adiciona no State
		if (chk.checked == true)
		{
			this.setState({
				aceito_politica: 1
	        })
		}
		else
		{
			this.setState({
				aceito_politica: 0
	        })
		}
	}

SetCodigo()
{

	let chk = document.getElementById("aceito_codigo");

	// Se checked adiciona no State
	if (chk.checked == true)
	{
		this.setState({
			aceito_codigo: 1
        })
	}
	else
	{
		this.setState({
			aceito_codigo: 0
        })
	}
}

SetTrabalhou(info)
{
	let tipo = info;

	let chk = document.getElementById("trabalhou_hotelariaBrasil");

	// Se checked adiciona no State
	if (tipo == 'sim')
	{
		this.setState({
			trabalhou_hotelariaBrasil: 1
        })
	}
	else
	{
		this.setState({
			trabalhou_hotelariaBrasil: 0
        })
	}
}

	componentDidMount() {
		let url_atual   = window.location.href;
		let myarr       = url_atual.split("/");

		if(myarr[4] == 'cadastro')
		{
			let idCandidato = myarr[5];
		}
		if(myarr[4] == 'cadidatar')
		{
			let idVaga = myarr[5];

			this.setState({
                id_vaga: idVaga
			})
		}

		this.getEstados();
		this.getEstadosGostaria();
    }

    render() {
		const {errors} = this.state;
    	return (
        		<div className="section-dashclient custom-headervagas">
					<IncludeVagas  menuexcluir="" menuvagas="" menuincluir="active" />
        	    <div className="container">
        	        <div className="row vagas">
        	            <div className="col-12">
        	                <h2>Cadastrar/Atualizar Currículo</h2>
        	            </div>
        	        </div>
        	        <div className="row">
        	            <div className="col-12 col-md-8">
        	                <form id="formularioCand" className="form-cadastrarcv" onSubmit={this.submitHandler} noValidate>
        	                	<ToastContainer />
        	                    <div className="form-group row">
        	                        <div className="col-12 col-md-8">
        	                            <label>Nome Completo*:</label>
        	                            <input id="nome" type="text" className={this.state.errors.nome.length === 0 ? 'form-control-rounded form-control' : 'form-control-rounded form-control has-error'} name="nome" onChange={this.changeHandler} noValidate />
										{errors.nome.length > 0 &&
                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.nome}</span>}
									</div>
        	                        <div className="col-12 col-md-4">
        	                            <label>CPF*:</label>
        	                            <InputMask mask="999.999.999-99" maskChar=" " id="cpf" type="text"
    										className="form-control-rounded form-control"
    										name="cpf" onChange={this.changeHandler} noValidate/>
        	                        {errors.cpf.length > 0 &&
                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.cpf}</span>}
									</div>
        	                    </div>
        	                    <div className="form-group row">
        	                        <div className="col-12 col-md-4">
        	                            <label>E-mail*:</label>
        	                            <input id="email" type="email" className={this.state.errors.email.length === 0 ? 'form-control-rounded form-control' : 'form-control-rounded form-control has-error'} name="email" onChange={this.changeHandler} noValidate />
										{errors.email.length > 0 &&
                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.email}</span>}
									</div>
        	                        <div className="col-12 col-md-4">
        	                            <label>Telefone*:</label>
        	                            <InputMask mask="(99) 9999-9999" maskChar=" " id="telefone" type="text"
											className={this.state.errors.telefone.length === 0 ? 'form-control-rounded form-control' : 'form-control-rounded form-control has-error'}
											name="telefone" onChange={this.changeHandler} noValidate />
        	                        {errors.telefone.length > 0 &&
                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.telefone}</span>}
									</div>
        	                        <div className="col-12 col-md-4">
        	                            <label>Celular*:</label>
        	                            <InputMask mask="(99) 99999-9999" maskChar=" " id="celular" type="text"
											className={this.state.errors.celular.length === 0 ? 'form-control-rounded form-control' : 'form-control-rounded form-control has-error'}
											name="celular" onChange={this.changeHandler} noValidate/>
											{errors.celular.length > 0 &&
                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.celular}</span>}
        	                        </div>
        	                    </div>
        	                    <div className="form-group row">
        	                        <div className="col-12 col-md-8">
        	                            <label>Endereço*:</label>
        	                            <input id="endereco" type="text" className="form-control-rounded form-control" name="endereco" onChange={this.changeHandler}/>
										{errors.endereco.length > 0 &&
                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.endereco}</span>}
				 </div>
        	                        <div className="col-12 col-md-4">
        	                            <label>Número*:</label>
        	                            <input id="numero" type="number" className="form-control-rounded form-control" name="numero" onChange={this.changeHandler}/>
										{errors.numero.length > 0 &&
                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.numero}</span>}
				</div>
        	                    </div>
        	                    <div className="form-group row">
        	                        <div className="col-12 col-md-4">
        	                            <label>Complemento:</label>
        	                            <input id="complemento" type="text" className="form-control-rounded form-control" name="complemento" onChange={this.changeHandler}/>
        	                        </div>
        	                        <div className="col-12 col-md-4">
        	                            <label>CEP*:</label>
        	                            <InputMask mask="99999-999" maskChar=" " id="cep" type="text"
    										className="form-control-rounded form-control"
    										name="cep" onChange={this.changeHandler} noValidate />
											{errors.cep.length > 0 &&
                <span className='error'><img src="/img/ico-input-erro.svg" alt="erro"/> {errors.cep}</span>}
        	                        </div>
        	                        <div className="col-12 col-md-4">
        	                            <label>Bairro*:</label>
        	                            <input id="bairro" type="text" className="form-control-rounded form-control" name="bairro" onChange={this.changeHandler}/>
        	                        </div>
        	                    </div>
        	                    <div className="form-group row">
        	                        <div className="col-12 col-md-6">
	        	                        <label>Estado</label>
	        							<select id="id_estado" className="form-control-rounded form-control" name="id_estado" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
	        								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
	        							</select>
        	                        </div>
        	                        <div className="col-12 col-md-6">
	        	                        <label>Cidade</label>
	        							<select id="id_cidade" className="form-control-rounded form-control" name="id_cidade" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
	        								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
	        							</select>
        	                        </div>
        	                        <div className="col-12">
        	                            <hr />
        	                        </div>
        	                    </div>
        	                    <div className="form-group row">
        	                        <div className="col-12">
        	                            <h3><strong>Área de interesse*</strong> (escolha até 3 Áreas e no minimo 1)</h3>
        	                        </div>
        	                        <MenuAreas areas={this.state.areas} handler={this.SetAreas}/>
        	                    </div>
        	                    <div className="form-group row">
        	                        <div className="col-12">
        	                            <hr />
        	                        </div>
        	                        <div className="col-12">
        	                            <h3><strong>Onde gostaria de trabalhar*</strong></h3>
        	                        </div>
        	                        <div className="col-12 col-md-6">
	        	                        <label>Estado</label>
	        							<select id="id_estado_gostaria" className="form-control-rounded form-control" name="id_estado_gostaria" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
	        								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
	        							</select>
        	                        </div>
        	                        <div className="col-12 col-md-6">
	        	                        <label>Cidade</label>
	        							<select id="id_cidade_gostaria" className="form-control-rounded form-control" name="id_cidade_gostaria" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
	        								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
	        							</select>
        	                        </div>
        	                        <div className="col-12">
        	                            <hr />
        	                        </div>
        	                    </div>
        	                    <div className="form-group row">
	        			            <div className="col-12">
	        			            	<label>Selecionar CV</label>
										<div className="upload-btn-wrapper">

										<input type="text" name="nomearquivo" defaultValue={this.state.url} className="form-nomearquivo"/>
										<input type="file" name="file" className="form-control-rounded form-control" accept="application/pdf,application/" onChange={this.changeHandler} />
										<button className="btn btn-anexarcv"><img src="/img/ico-anexar.svg" alt=""/> Anexar</button>
										</div>
										<p>Anexar arquivos em .doc ou .pdf de até 20 mb</p>

	        			            </div>
	        			        </div>
								<div className="col-12">
        	                            <hr />
        	                        </div>
        	                    <div className="form-group row">
        	                        <div className="col-12">
        	                            <h3><strong>Trabalha ou já trabalhou em algum hotel administrado pela Hotelaria Brasil?</strong></h3>
        	                        </div>
        	                        <div className="form-check col-12 col-md-2">
        	                            <input className="form-check-input" type="radio" name="trabalhou_hotelariaBrasil" onClick={() => this.SetTrabalhou('sim')}/>
        	                            <label className="form-check-label">Sim</label>
        	                        </div>
        	                        <div className="form-check col-12 col-md-2">
        	                            <input className="form-check-input" type="radio" name="trabalhou_hotelariaBrasil" onClick={() => this.SetTrabalhou('nao')}/>
        	                            <label className="form-check-label">
        	                                Não
        	                            </label>
        	                        </div>

        	                        <div className="col-12">
        	                            <hr />
        	                        </div>
        	                    </div>
        	                    <div className="form-group row">
        	                        <div className="form-check col-12">
        	                            <input className="form-check-input" type="checkbox" value="" name="aceito_termos" id="aceito_termos" onClick={() => this.SetTermos()}/>
        	                            <label className="form-check-label" >
        	                            *Li e concordo com os <a href="#"> Termos e condições</a> do banco de talentos da Hotelaria Brasil.</label>
        	                            <p className="italic">Os termos e condicoes devem informar que a Hotelaria Brasil irá utilizar esses dados apenas para fins de analise de curriculo para contratacao e que após o período de 180 dias sem atualização do cadastro, os dados serão excluídos.</p>
        	                        </div>
        	                        <div className="form-check col-12">
        	                            <input className="form-check-input" type="checkbox" value="" name="aceito_politica" id="aceito_politica" onClick={() => this.SetPolitica()}/>
        	                            <label className="form-check-label">
        	                            *Li e concordo com os <a href="#"> Política de Privacidade</a> da Hotelaria Brasil.
        	                            </label>
        	                        </div>
        	                        <div className="form-check col-12">
        	                            <input className="form-check-input" type="checkbox" value="" name="aceito_codigo" id="aceito_codigo" onClick={() => this.SetCodigo()}/>
        	                            <label className="form-check-label">
        	                            *Li e concordo com os <a href="#"> Código de Ética</a> da Hotelaria Brasil.
        	                            </label>
        	                        </div>
        	                        <div className="form-group row">
        				            <div className="col-12 col-md-6">
        				            <input id="url" type="hidden" className="form-control-rounded form-control" name="url" onChange={this.changeHandler} />
        				            </div>
        				         </div>
        	                        <div className="form-check col-12">
        	                        <button type="submit" id="gravar" className="btn btn-primary btn-azul-gravar btn-rounded mt-3">Salvar</button>
        	                        </div>
        	                    </div>
        	                </form>
        	            </div>
        	        </div>


        	    </div>
        	</div>
        );
    }
}
