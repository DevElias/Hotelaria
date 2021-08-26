import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

export default class CategoriasPerguntas extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			categoriapergunta : '',
			id: '',
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
				.post('/categoriasperguntas/gravar', this.state)
				.then(response =>
				{
					window.location.replace('/categoriasperguntas/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
			else
			{
				axios
				.post('/categoriasperguntas/atualiza/'+this.state.id, this.state)
				.then(response =>
				{
					window.location.replace('/categoriasperguntas/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
		}
	}
	
	// Busca Categoria de acordo com ID para Edicao
	getCategoria(idCategoria)
	{
		let id = idCategoria;
		
		axios
		.get('/categoriasperguntas/buscar/'+id)
		.then(response =>
		{
			 this.setState({
                 categoriapergunta: [response.data.categoria[0].categoria],
                 id: [response.data.categoria[0].id],
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
		let idCategoria = myarr[5];
        this.getCategoria(idCategoria);
    }
	
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitHandler}>
	                <div className="form-group row">
			            <div className="col-12 col-md-6">
			                <label>Categoria de Perguntas</label>
			                <input id="categoriapergunta" type="text" className="form-control-rounded form-control" name="categoriapergunta" value={this.state.categoriapergunta} onChange={this.changeHandler} />
			            </div>
			        </div>   
			        <button type="submit" id="gravar" className="btn btn-primary btn-block btn-rounded mt-3">Salvar</button>
                </form>
            </div>
        );
    }
}
