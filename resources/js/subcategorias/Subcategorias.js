import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

export default class Subcategorias extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			subcategoria : '',
			id_categoria : '',
			categorias   : '',   
			id           : '',
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
			console.log(this.state);
			if(this.state.id == '')
			{
				axios
				.post('/subcategorias/gravar', this.state)
				.then(response =>
				{
					window.location.replace('/subcategorias/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
			else
			{
				axios
				.post('/subcategorias/atualiza/'+this.state.id, this.state)
				.then(response =>
				{
					window.location.replace('/subcategorias/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}	
		}
		
		this.getSubCategoria = this.getSubCategoria.bind(this);
	}
	
	// Get de Categorias para preenchcer o ComboBox
	getCategorias() {
		// Desabilita ComboBox ate que carregue os options
		document.getElementById("id_categoria").disabled = true;
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
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
	
	// Busca SubCategoria de acordo com ID para Edicao
	getSubCategoria(idSubCategoria)
	{
		let id = idSubCategoria;
		if(id != '')
		{
			axios
			.get('/subcategorias/buscar/'+id)
			.then(response =>
			{
				console.log(response.data.subcategoria[0]);
				 this.setState({
	                 id: response.data.subcategoria[0].id,
	                 subcategoria: response.data.subcategoria[0].subcategoria,
	                 id_categoria: response.data.subcategoria[0].id_categoria
					})
			})
			.catch(error =>
			{
				console.log(error);
			})
		}
	}
	
	componentDidMount() {
        let url_atual      = window.location.href;
		let myarr          = url_atual.split("/");
		let idSubCategoria = myarr[5];
		this.getSubCategoria(idSubCategoria);
		this.getCategorias();
    }
	
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitHandler}>
	                <div className="form-group row">
			            <div className="col-12 col-md-6">
			                <label>Subcategoria</label>
			                <input id="subcategoria" type="text" className="form-control-rounded form-control" name="subcategoria" value={this.state.subcategoria} onChange={this.changeHandler} />
			            </div>
		                <div className="col-12 col-md-3">
			             <label>Categoria</label>
			             <select id="id_categoria" name="id_categoria"  className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
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
