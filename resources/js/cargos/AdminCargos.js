import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class AdminCagos extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			cargos : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirCargo = this.excluirCargo.bind(this);
        this.ordernarCargos = this.ordernarCargos.bind(this);
    }
	// Exclusão de Cargos
	excluirCargo(e){
		 let id = e;
	        axios
			.post('/cargos/destroy/'+id, this.state)
			.then(response =>
			{
				 if(response.data.code = '200')
				 {
					window.location.replace('/cargos/admin');
				 }
			})
			.catch(error =>
			{
				console.log(error);
			})
    }
    // Get Cargos
	getCargos() {
        axios.get('/cargos/listagem')
            .then((response) =>
            {
                let cargos = [];
                response.data.cargos.map((cargo) =>
                cargos.push(cargo));

                this.setState({
                	cargos: [...cargos]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
	
	ordernarCargos(ordem){
		if(ordem == 'asc'){
			const myData = [].concat(this.state.cargos)
			.sort((a, b) => a.cargo > b.cargo ? 1 : -1);
			this.setState({
				cargos         : [...myData],
			})
		}else {
			const myData = [].concat(this.state.cargos)
			.sort((a, b) => a.cargo < b.cargo ? 1 : -1);
			this.setState({
				cargos         : [...myData],
			})
		}

	}
	
    componentDidMount() {
        this.getCargos();
    }
    render() {
        const { cargos } = this.state;
        return (

            <div className="table-responsive-md">
	            <div className="col-12 col-md-4 text-left">
					<div className="btn-group">
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Ordenar
						</button>
						<div className="dropdown-menu">
							<div className="dropdown-item" onClick={() => this.ordernarCargos('asc')}>Alfabética [a-z]</div>
							<div className="dropdown-item" onClick={() => this.ordernarCargos('desc')}>Alfabética [z-a]</div>
						</div>
					</div>
				</div>
            
                <div className="row">
                    <div className="col-12 text-right marginbtm-50">
                    <a href="/cargos/cadastro" className="btn btn-primary">Novo Cargo</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Cargo</th>
                    <th scope="col">Área</th>
                    <th scope="col">Última atualização</th>
                    <th scope="col">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			cargos.map(cargo => (

                <tr key={cargo.id} id={cargo.id}>
                    <th scope="row">{cargo.id}</th>
                    <td>{cargo.cargo}</td>
                    <td>{cargo.Area}</td>
                    <td>{cargo.DataAlt}</td>
                    <td><a href={'editar/'+cargo.id} className="btn btn-secondary btn-sm"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirCargo(cargo.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
