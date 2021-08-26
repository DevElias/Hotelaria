import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

export default class Hoteis extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			hotel     : '',
			id        : '',
			estados   : [],
			id_estado : '',
			cidades   : [],
			id_cidade : '',
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
			
			// Carrega Cidades de Acordo com Estado
			if(e.target.name == 'id_estado')
			{
				$("#id_cidade").empty();
				let idEstado = e.target.value;
				this.getCidades(idEstado);
			}
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
			if(this.state.id == '')
			{
				axios
				.post('/hoteis/gravar', this.state)
				.then(response =>
				{
					window.location.replace('/hoteis/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
			else
			{
				axios
				.post('/hoteis/atualiza/'+this.state.id, this.state)
				.then(response =>
				{
					window.location.replace('/hoteis/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}	
			
		}
		
		this.getHotel = this.getHotel.bind(this);
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
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
	
	// Busca Hotel de acordo com ID para Edicao
	getHotel(idHotel)
	{
		let id = idHotel;
		const comboEstados = document.getElementById("id_estado");
		const comboCidades = document.getElementById("id_cidade");

		axios
		.get('/hoteis/buscar/'+id)
		.then(response =>
		{

			this.setState({
				id: response.data.hotel[0].id,
				hotel: response.data.hotel[0].hotel,
                id_estado: response.data.hotel[0].id_estado,
                id_cidade: response.data.hotel[0].id_cidade
			 })
		})
		.catch(error =>
		{
			console.log(error);
		})
	}
	
	componentDidMount() {
		let url_atual   = window.location.href;
		let myarr       = url_atual.split("/");
		let idHotel     = myarr[5];
		this.getHotel(idHotel);
        this.getEstados();
    }
	
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitHandler}>
	                <div className="form-group row">
			            <div className="col-12 col-md-12">
			                <label>Hotel</label>
			                <input id="hotel" type="text" className="form-control-rounded form-control" name="hotel" value={this.state.hotel} onChange={this.changeHandler} />
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
					</div> 
			        <button type="submit" id="gravar" className="btn btn-primary btn-block btn-rounded mt-3">Salvar</button>
                </form>
            </div>
        );
    }
}
