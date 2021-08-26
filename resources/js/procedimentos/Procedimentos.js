import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Procedimentos extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
				procedimento : '',
				url : '',
				descricao : '',
				palavras_chave : '',
				categorias: [],
				id_categoria : '',
				subcategorias: [],
				id_subcategoria : '',
				destacado : '',
				liberado : '',
				id: '',
		};

		this.changeHandler = e =>
		{
			this.setState({ [e.target.name]: e.target.value});
			// Mudanca na Categoria
			if(e.target.name == 'id_categoria')
			{
				document.getElementById("id_subcategoria").disabled = true;
				$("#id_subcategoria").empty();
				let idSubCat = e.target.value;
				this.getSubcategorias(idSubCat);
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
					.post('/procedimentos/upload', formData)
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
		}

		this.submitHandler = e =>{
			e.preventDefault();
			//console.log(this.state);
			
			if(this.state.id == '')
			{
				axios
				.post('/procedimentos/gravar', this.state)
				.then(response =>
				{
					this.clearForm(document.getElementById("formularioProc"));
					//document.getElementById("formularioProc").reset()
					return toast.success(response.data.message[0]);
					//window.location.replace('/procedimentos/admin');
				})
				.catch(error =>
				{
					return toast.error(error);
				})
			}
			else
			{
				axios
				.post('/procedimentos/atualiza/'+this.state.id, this.state)
				.then(response =>
				{
					window.location.replace('/procedimentos/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}	
		}
		
		this.getDestaque     = this.getDestaque.bind(this);
		this.getProcedimento = this.getProcedimento.bind(this);
	}

	// Get de Categorias para preenchcer o ComboBox
	getCategorias() {
		// Desabilita ComboBox ate que carregue os options
		document.getElementById("id_categoria").disabled = true;
		document.getElementById("id_subcategoria").disabled = true;
        axios.get('/categorias/lista')
            .then((response) =>
            {
            	const comboCategorias = document.getElementById("id_categoria");
            	let option = '';
            	let categorias = [];
                let categoriasCompleted = [];
                response.data.categorias.map((categoria) =>
                    (categoria.completed == 1) ? categoriasCompleted.push(categoria) : categorias.push(categorias));
                
             // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	categorias: [...response.data.categorias]
				})

                response.data.categorias.forEach((cat) => {
                	  option = new Option(cat.categoria, cat.id);
                	  comboCategorias.options[comboCategorias.options.length] = option;
                	});

                const selectcategoria = this.state.id_categoria;
				this.state.categorias.forEach(function(item, index){
					if(item.id == selectcategoria)
					{
						comboCategorias.value = selectcategoria;
					}
				});
				
               // Libera o ComboBox
               document.getElementById("id_categoria").disabled = false;
               this.getSubcategorias(selectcategoria);
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Get das Subcategorias para preenchcer o ComboBox
	getSubcategorias(idSubCat) {
		let id = idSubCat;
		
		if(id && !isNaN(id))
		{
			axios.get('/subcategorias/lista/'+id)
				.then((response) =>
				{
					const comboSubcategorias = document.getElementById("id_subcategoria");
					let option = '';
					let subcategorias = [];
					let subcategoriasCompleted = [];
					response.data.subcategorias.map((subcategoria) =>
						(subcategoria.completed == 1) ? subcategoriasCompleted.push(subcategoria) : subcategorias.push(subcategorias));
					
				// Precisa adicionar o COmboBox ao State para manipular na edicao
					this.setState({
						subcategorias: [...response.data.subcategorias]
					})
					
					// Adiciona o Elemento 0 no ComboBox
					var newoption = new Option('-- SELECIONAR --', 'DEFAULT');
					comboSubcategorias.add(newoption);

					response.data.subcategorias.forEach((subcat) => {
						option = new Option(subcat.subcategoria, subcat.id);
						comboSubcategorias.options[comboSubcategorias.options.length] = option;
						});
					
					const selectsubcategoria = this.state.id_subcategoria;
					this.state.subcategorias.forEach(function(item, index){
						if(item.id == selectsubcategoria)
						{
							comboSubcategorias.value = selectsubcategoria;
						}
					});
				// Libera o ComboBox
				document.getElementById("id_subcategoria").disabled = false;
				})
				.catch(error => console.log("It was not possible to bring the data from the database."));
		}
    }
	
	// Busca Procedimento de acordo com ID para Edicao
	getProcedimento(idProcedimento)
	{
		let id = idProcedimento;
		
		if(id && !isNaN(id))
		{
			axios
			.get('/procedimentos/buscar/'+id)
			.then(response =>
			{
				console.log(response.data.procedimento[0]);
				this.setState({
					procedimento: response.data.procedimento[0].titulo,
					id: response.data.procedimento[0].id,
					descricao: response.data.procedimento[0].descricao,
					palavras_chave: response.data.procedimento[0].palavras_chave,
					destacado: response.data.procedimento[0].destacado,
					liberado: response.data.procedimento[0].liberado,
					id_categoria: response.data.procedimento[0].id_categoria,
					id_subcategoria: response.data.procedimento[0].id_subcategoria,
					url: response.data.procedimento[0].url
					})
					
					this.getDestaque(response.data.procedimento[0].destacado);
					this.getLiberado(response.data.procedimento[0].liberado);
					this.getCategorias(this.state.id_categoria);
			})
			.catch(error =>
			{
				console.log(error);
			})
		}
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
	
	// ComboBox de Liberado Download na Edicao
	getLiberado(idLiberado) {
		const selectdestaque = idLiberado;
		let aLiberados = [];
		aLiberados = ["0", "1"];
		const comboLiberados = document.getElementById("liberado");
		
		aLiberados.forEach(function(item, index){
			if(item == selectdestaque)
			{
				comboLiberados.value = selectdestaque;
			}
		});
	}

	componentDidMount()
	{
		let url_atual      = window.location.href;
		let myarr          = url_atual.split("/");
		let idProcedimento = myarr[5];
		this.getProcedimento(idProcedimento);
        this.getCategorias();
	}
	
	clearForm()
	{
		$.each(document.forms[0].elements, function(index, element)
		{
			let fieldType = element.type;

			switch(fieldType)
			{
				case "text":
				case "password":
				case "textarea":
				case "hidden":
					element.value = "";
					break;
				case "radio":
				case "checkbox":
					if(element.checked)
					{
						element.checked = false;
					}
					break;
				case "select-one":
				case "select-multi":
					element.selectedIndex = 0;
					break;			
				default:
					break;
			}
		});
	}

    render() {
        return (
            <div className="container">
                <form id="formularioProc" onSubmit={this.submitHandler}>
					<ToastContainer />
	                <div className="form-group row">
			            <div className="col-12 col-md-12">
			                <label>Procedimento</label>
			                <input id="procedimento" type="text" className="form-control-rounded form-control" name="procedimento" value={this.state.procedimento} onChange={this.changeHandler} />
			            </div>
			        </div>
			        <div className="form-group row">
			            <div className="col-12 col-md-6">
			            	<label>Selecionar Arquivo</label>
			            	<input type="file" name="file" className="form-control-rounded form-control" accept="application/pdf,application/" onChange={this.changeHandler} />
			            </div>
			        </div>
			        <div className="form-group row">
			            <div className="col-12 col-md-12">
			                <label>Descrição</label>
			                <textarea id="descricao" className="form-control-rounded form-control" name="descricao" value={this.state.descricao} onChange={this.changeHandler}>
			                </textarea>
			            </div>
			         </div>
			         <div className="form-group row">
			            <div className="col-12 col-md-4">
			                <label>Palavras Chave</label>
			                <input id="palavras_chave" type="text" className="form-control-rounded form-control" name="palavras_chave" value={this.state.palavras_chave} onChange={this.changeHandler} />
			            </div>
			            <div className="col-12 col-md-4">
				            <label>Categoria</label>
				             <select id="id_categoria" name="id_categoria" className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
				             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
				             </select>
			            </div>
			            <div className="col-12 col-md-4">
				            <label>Subcategoria</label>
				             <select id="id_subcategoria" name="id_subcategoria" className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
				             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
				             </select>
			            </div>
			        </div>
			        <div className="form-group row">
			            <div className="col-12 col-md-6">
			                <label>Destaque?</label>
				                <select id="destacado" name="destacado" className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
					             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
					             	<option value="0">Não</option>
					             	<option value="1">Sim</option>
					            </select>
			            </div>
			            <div className="col-12 col-md-6">
			                <label>Liberado para Download?</label>
				                <select id="liberado" name="liberado" className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
					             	<option value="DEFAULT" disabled >-- SELECIONAR --</option>
					             	<option value="0">Não</option>
					             	<option value="1">Sim</option>
					            </select>
			            </div>
			         </div>
			         <div className="form-group row">
			            <div className="col-12 col-md-6">
			            <input id="url" type="hidden" className="form-control-rounded form-control" name="url" onChange={this.changeHandler} />
			            </div>
			         </div>
			        <button type="submit" id="gravar" className="btn btn-primary btn-block btn-rounded mt-3">Salvar</button>
                </form>
            </div>
        );
    }
}
