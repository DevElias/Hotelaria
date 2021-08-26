import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

export default class Areas extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			area : '',
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
				.post('/areas/gravar', this.state)
				.then(response =>
				{
					window.location.replace('/areas/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
			else
			{
				axios
				.post('/areas/atualiza/'+this.state.id, this.state)
				.then(response =>
				{
					window.location.replace('/areas/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}	
		}
	}
	
	// Busca Area de acordo com ID para Edicao
	getAreas(idArea)
	{
		let id = idArea;
		
		axios
		.get('/areas/buscar/'+id)
		.then(response =>
		{
			 this.setState({
                 area: [response.data.area[0].area],
                 id: [response.data.area[0].id],
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
		let idArea      = myarr[5];
        this.getAreas(idArea);
    }
	
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitHandler}>
	                <div className="form-group row">
			            <div className="col-12 col-md-6">
			                <label>Area</label>
			                <input id="area" type="text" className="form-control-rounded form-control" name="area" value={this.state.area} onChange={this.changeHandler} />
			            </div>
			        </div>   
			        <button type="submit" id="gravar" className="btn btn-primary btn-block btn-rounded mt-3">Salvar</button>
                </form>
            </div>
        );
    }
}
