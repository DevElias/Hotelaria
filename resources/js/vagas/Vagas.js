import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import InputMask from 'react-input-mask';
import { Editor } from '@tinymce/tinymce-react';

export default class Vagas extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			id_cargo : '',
			cargos: [],
			id_area : '',
			areas: [],
			id_estado : '',
			estados: [],
			id_cidade : '',
			cidades: [],
			tipo_contratacao : '',
			carga_horaria_de : '',
			carga_horaria_ate : '',
			faixa_salarial : '',
			vaga_expira : '',
			descricao : '',
			requisitos : '',
			id_responsavel : '',
			responsaveis: [],
			id_hotel:'',
			hoteis: [],
			id:'',
			destacado: '',
			status_vaga: '',
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});

			// Carrega Cidades de Acordo com Estado
			if(e.target.name == 'id_estado')
			{
				$("#id_cidade").empty();
				$("#id_hotel").empty();
				let idEstado = e.target.value;
				this.getCidades(idEstado);
			}

			// Carrega Cargos de Acordo com Area
			if(e.target.name == 'id_area')
			{
				$("#id_cargo").empty();
				let idArea = e.target.value;
				this.getCargos(idArea);
			}

			// Carrega Hoteis de Acordo com Cidade
			if(e.target.name == 'id_cidade')
			{
				$("#id_hotel").empty();
				let idCidade = e.target.value;
				this.getHoteis(idCidade);
			}
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
			
			if(this.state.id == '')
			{
				axios
				.post('/vagas/gravar', this.state)
				.then(response =>
				{
					window.location.replace('/vagas/admin');
				})
				.catch(error =>
				{
					window.location.replace('/vagas/admin');
				})
			}
			else
			{
				axios
				.post('/vagas/atualiza/'+this.state.id, this.state)
				.then(response =>
				{
					window.location.replace('/vagas/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}	
		}

		this.getVaga = this.getVaga.bind(this);
		this.handleEditorChange = this.handleEditorChange.bind(this);
		this.handleEditorRequisitosChange = this.handleEditorRequisitosChange.bind(this);
	}

	// Get das Areas
	getAreas() {
		document.getElementById("id_cargo").disabled = true;
        axios.get('/areas/lista')
            .then((response) =>
            {
            	const comboAreas = document.getElementById("id_area");
            	let option = '';
            	let areas = [];
                let areasCompleted = [];
                response.data.areas.map((area) =>
                    (area.completed == 1) ? areasCompleted.push(categoria) : areas.push(areas));

                // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	areas: [...response.data.areas]
				})

                response.data.areas.forEach((options_areas) => {
                	  option = new Option(options_areas.area, options_areas.id);
                	  comboAreas.options[comboAreas.options.length] = option;
					});
					// Selected no Options
					const selectarea = this.state.id_area;
					this.state.areas.forEach(function(item, index){
						if(item.id == selectarea)
						{
							comboAreas.value = selectarea;
						}
					});
					this.getCargos(selectarea);
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	 // Get dos Cargos
	getCargos(idArea) {
		let id = idArea;
        axios.get('/cargos/lista/'+id)
            .then((response) =>
            {
            	document.getElementById("id_cargo").disabled = false;
            	const comboCargos = document.getElementById("id_cargo");
            	let option = '';
            	let cargos = [];
                let cargosCompleted = [];
                response.data.cargos.map((cargo) =>
                    (cargo.completed == 1) ? cargosCompleted.push(cargo) : cargos.push(cargos));

                // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	cargos: [...response.data.cargos]
				})

				// Adiciona o Elemento 0 no ComboBox
				$("#id_cargo").empty();
                var newoption = new Option('-- SELECIONAR --', 'DEFAULT');
                comboCargos.add(newoption);

                response.data.cargos.forEach((options_cargos) => {
                	  option = new Option(options_cargos.cargo, options_cargos.id);
                	  comboCargos.options[comboCargos.options.length] = option;
					});
					// Selected no Options

					const selectcargo = this.state.id_cargo;
					this.state.cargos.forEach(function(item, index){
						if(item.id == selectcargo)
						{
							comboCargos.value = selectcargo;
						}
					});
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get dos Estados
	getEstados() {
		document.getElementById("id_cidade").disabled = true;
		document.getElementById("id_hotel").disabled = true;
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
                
                const selectestado = this.state.id_estado;
				this.state.estados.forEach(function(item, index){
					if(item.id == selectestado)
					{
						comboEstados.value = selectestado;
					}
				});
				this.getCidades(selectestado);
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

                // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	cidades: [...response.data.cidades]
				})

                // Adiciona o Elemento 0 no ComboBox
				$("#id_cidade").empty();
                var newoption = new Option('-- SELECIONAR --', 'DEFAULT');
                comboCidades.add(newoption);

                response.data.cidades.forEach((options_cidades) => {
                	  option = new Option(options_cidades.nome, options_cidades.id);
                	  comboCidades.options[comboCidades.options.length] = option;
                	});
                
                const selectcidade = this.state.id_cidade;
				this.state.cidades.forEach(function(item, index){
					if(item.id == selectcidade)
					{
						comboCidades.value = selectcidade;
					}
				});
				this.getHoteis(selectcidade);
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get Hoteis
	getHoteis(idCidade) {
		let id = idCidade;
        axios.get('/hoteis/listagem/'+id)
            .then((response) =>
            {
            	document.getElementById("id_hotel").disabled = false;
            	const comboHoteis = document.getElementById("id_hotel");
            	let option = '';
            	let hoteis = [];
                let hoteisCompleted = [];
                response.data.hoteis.map((hotel) =>
                    (hotel.completed == 1) ? hoteisCompleted.push(hotel) : hoteis.push(hoteis));

                // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	hoteis: [...response.data.hoteis]
				})

                // Adiciona o Elemento 0 no ComboBox
				$("#id_hotel").empty();
                var newoption = new Option('-- SELECIONAR --', 'DEFAULT');
                comboHoteis.add(newoption);

                response.data.hoteis.forEach((options_hoteis) => {
                	  option = new Option(options_hoteis.hotel, options_hoteis.id);
                	  comboHoteis.options[comboHoteis.options.length] = option;
                	});
                
                const selecthotel = this.state.id_hotel;
				this.state.hoteis.forEach(function(item, index){
					if(item.id == selecthotel)
					{
						comboHoteis.value = selecthotel;
					}
				});
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get dos Reponsaveis/Administradores
	getResponsaveis() {
        axios.get('/usuarios/lista')
        .then((response) =>
        {
        	const comboResponsaveis = document.getElementById("id_responsavel");
        	let option = '';
        	let responsaveis = [];
            let responsaveisCompleted = [];
            response.data.usuarios.map((responsavel) =>
                (responsavel.completed == 1) ? responsaveisCompleted.push(responsavel) : responsaveis.push(responsaveis));

            // Precisa adicionar o COmboBox ao State para manipular na edicao
            this.setState({
            	responsaveis: [...response.data.usuarios]
			})

            response.data.usuarios.forEach((options_responsaveis) => {
            	  option = new Option(options_responsaveis.nome, options_responsaveis.id);
            	  comboResponsaveis.options[comboResponsaveis.options.length] = option;
            	});
            
            const selectresponsavel = this.state.id_responsavel;
			this.state.responsaveis.forEach(function(item, index){
				if(item.id == selectresponsavel)
				{
					comboResponsaveis.value = selectresponsavel;
				}
			});
        })
        .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Busca Vaga de acordo com ID para Edicao
	getVaga(idVaga)
	{
		let id = idVaga;
		const comboAreas   = document.getElementById("id_area");
		const comboCargos  = document.getElementById("id_cargo");
		const comboEstados = document.getElementById("id_estado");
		const comboCidades = document.getElementById("id_cidade");
		const comboHoteis  = document.getElementById("id_hotel");
		const comboResponsaveis = document.getElementById("id_responsavel");
		let option = '';

		axios
		.get('/vagas/buscar/'+id)
		.then(response =>
		{

			this.setState({
				id: response.data.vaga[0].id,
                id_area: response.data.vaga[0].id_area,
                id_cargo: response.data.vaga[0].id_cargo,
                id_estado: response.data.vaga[0].id_estado,
                id_cidade: response.data.vaga[0].id_cidade,
                id_hotel: response.data.vaga[0].id_hotel,
                id_responsavel: response.data.vaga[0].id_responsavel,
				tipo_contratacao: response.data.vaga[0].tipo_contratacao,
				carga_horaria_de: response.data.vaga[0].carga_horaria_de,
				carga_horaria_ate: response.data.vaga[0].carga_horaria_ate,
				faixa_salarial: response.data.vaga[0].faixa_salarial,
				vaga_expira: response.data.vaga[0].DtExpira,
				descricao: response.data.vaga[0].descricao,
				requisitos: response.data.vaga[0].requisitos,
				destacado: response.data.vaga[0].destacado,
				status_vaga: response.data.vaga[0].status_vaga,
			 })
			 
			 this.getDestaque(response.data.vaga[0].destacado);
			this.getStatus(response.data.vaga[0].status_vaga);
		})
		.catch(error =>
		{
			console.log(error);
		})
	}

	handleEditorChange(content, editor) {
		this.setState({ descricao: content });
	}
	handleEditorRequisitosChange(content, editor) {
		this.setState({ requisitos: content });
    }
	
	// ComboBox de Destaque na Edicao
	getDestaque(idDestaque) {
		const selectdestaque = idDestaque;
		let aDestacados = [];
		aDestacados = ["0", "1"];
		const comboDestaques = document.getElementById("destacado");
		
		aDestacados.forEach(function(item, index){
			if(item == selectdestaque)
			{
				comboDestaques.value = selectdestaque;
			}
		});
	}
	
	// ComboBox de Status da Vaga
	getStatus(idStatus) {
		const selectstatus = idStatus;
		let aStatus = [];
		aStatus = ["0", "1", "2", "3"];
		const comboStatus = document.getElementById("status_vaga");
		
		aStatus.forEach(function(item, index){
			if(item == selectstatus)
			{
				comboStatus.value = selectstatus;
			}
		});
	}

	componentDidMount() {
		let url_atual   = window.location.href;
		let myarr       = url_atual.split("/");
		let idVaga      = myarr[5];
		this.getVaga(idVaga);
        this.getAreas();
        this.getEstados();
        this.getResponsaveis();

    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitHandler}>
	                <div className="form-group row">
						 <div className="col-12 col-md-6">
							<label>Área</label>
							<select id="id_area" className="form-control-rounded form-control" name="id_area" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
							</select>
						</div>
						<div className="col-12 col-md-6">
							<label>Cargo</label>
							<select id="id_cargo" className="form-control-rounded form-control" name="id_cargo" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
							</select>
						</div>
			        </div>
			        <div className="form-group row">
		                <div className="col-12 col-md-4">
							<label>Estado</label>
							<select id="id_estado" className="form-control-rounded form-control" name="id_estado" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
							</select>
						</div>
						 <div className="col-12 col-md-4">
							<label>Cidade</label>
							<select id="id_cidade" className="form-control-rounded form-control" name="id_cidade" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
							</select>
						</div>
						<div className="col-12 col-md-4">
						<label>Hotel</label>
						<select id="id_hotel" className="form-control-rounded form-control" name="id_hotel" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
							<option value="DEFAULT" disabled >-- SELECIONAR --</option>
						</select>
					</div>
					</div>
					<div className="form-group row">
						<div className="col-12 col-md-6">
							<label>Tipo de Contratação</label>
							<input id="tipo_contratacao" type="text"
								className="form-control-rounded form-control"
								name="tipo_contratacao" value={this.state.tipo_contratacao} onChange={this.changeHandler} />
						</div>
						<div className="col-12 col-md-3">
							<label>Carga horário Inicial</label>
							<InputMask mask="99:99" maskChar=" " id="carga_horaria_de" type="text"
								className="form-control-rounded form-control"
									name="carga_horaria_de" value={this.state.carga_horaria_de} onChange={this.changeHandler} />
						</div>
						<div className="col-12 col-md-3">
							<label>Carga horário Final</label>
							<InputMask mask="99:99" maskChar=" " id="carga_horaria_ate" type="text"
								className="form-control-rounded form-control"
									name="carga_horaria_ate" value={this.state.carga_horaria_ate} onChange={this.changeHandler} />
						</div>
					</div>
					<div className="form-group row">
						<div className="col-12 col-md-6">
							<label>Faixa Salárial</label>
							<input id="faixa_salarial" type="text"
								className="form-control-rounded form-control"
								name="faixa_salarial" value={this.state.faixa_salarial} onChange={this.changeHandler} />
						</div>
						<div className="col-12 col-md-6">
							<label>Vaga Expira</label>
							<InputMask mask="99/99/9999" maskChar=" " id="vaga_expira" type="text"
								className="form-control-rounded form-control"
									name="vaga_expira" value={this.state.vaga_expira} onChange={this.changeHandler} />
						</div>
					</div>
					<div className="form-group row">
						<div className="col-12 col-md-6">
							<label>Descrição</label>
							<Editor
									value={this.state.descricao}
									apiKey="vyq2m5pzxfbjsabijzmnjbzqu7xs2uew7fghz6m1mtla0rog"
                                    init={{
                                        height: 300,
										menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            'bold italic | bullist numlist | removeformat | code'
                                    }}
                                    onEditorChange={this.handleEditorChange}
                                />
						</div>
						<div className="col-12 col-md-6">
							<label>Requisitos</label>
							<Editor
									value={this.state.requisitos}
									apiKey="vyq2m5pzxfbjsabijzmnjbzqu7xs2uew7fghz6m1mtla0rog"
                                    init={{
                                        height: 300,
										menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            'bold italic | bullist numlist | removeformat | code'
                                    }}
                                    onEditorChange={this.handleEditorRequisitosChange}
                                />
						</div>
					</div>
					<div className="form-group row">
		                <div className="col-12 col-md-4">
							<label>Responsável</label>
							<select id="id_responsavel" className="form-control-rounded form-control" name="id_responsavel" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
								<option value="DEFAULT" disabled >-- SELECIONAR --</option>
							</select>
						</div>
						<div className="col-12 col-md-4">
	                	<label>Destaque?</label>
		                <select id="destacado" name="destacado" className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
			             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
			             	<option value="0">Não</option>
			             	<option value="1">Sim</option>
			            </select>
			        </div>
			        <div className="col-12 col-md-4">
                	<label>Status da Vaga?</label>
	                <select id="status_vaga" name="status_vaga" className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
		             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
		             	<option value="0">Rascunho</option>
		             	<option value="1">Publicado</option>
		             	<option value="2">Encerrado</option>
		             	<option value="3">Finalizado</option>
		            </select>
		        </div>
			        </div>
			        <button type="submit" id="gravar" className="btn btn-primary btn-block btn-rounded mt-3">Salvar</button>
                </form>
            </div>
        );
    }
}
