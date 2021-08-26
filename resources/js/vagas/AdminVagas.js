import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";

export default class AdminVagas extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			vagas  : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }

        this.excluirVaga = this.excluirVaga.bind(this)
    }
    // Get Vagas
    getVagas() {
        axios.get(`/vagas/lista/admin`)
            .then((response) =>
            {
                let vagas = [];
                response.data.vagas.map((vaga) =>
                vagas.push(vaga));

                this.setState({
                    vagas: [...vagas]
                })
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

    excluirVaga(e){
    	let id = e;
        axios
		.post('/vagas/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/vagas/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }


    componentDidMount() {
        this.getVagas();
    }
    render() {
        const { vagas } = this.state;
        return (

            <div className="table-responsive-md">
                <div className="row">
                <div className="col12 col-md-2 marginbtm-50">
	                    	<CSVLink data={this.state.vagas} separator={";"} className="btn btn-outline-info">Download Excel</CSVLink>
	                    </div>
                    <div className="col-12 col-md-10 text-right marginbtm-50">
                    <a href="/vagas/cadastro" className="btn btn-primary">Nova Vaga</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">Area</th>
                    <th scope="col">Cargo</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">Hotel</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Destacado</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="opcoes-tabela">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			vagas.map(vaga => (

                <tr key={vaga.id} id={vaga.id}>
                    <td scope="row">{vaga.Area}</td>
                    <td>{vaga.Cargo}</td>
                    <td>{vaga.Cidade}</td>
                    <td>{vaga.Hotel}</td>
                    <td>{vaga.tipo_contratacao}</td>
                    <td>{vaga.Destacado}</td>
                    <td>{vaga.status_vaga}</td>
                    <td><a href={'editar/'+vaga.id} className="btn btn-secondary btn-sm"  title="Editar"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirVaga(vaga.id)} className="btn btn-danger btn-sm"  title="Excluir"><i className="far fa-trash-alt"></i></button> <a href={'/vagas/candidatos/'+vaga.id} className="btn btn-secondary btn-sm" title="Candidatos"> <i className="fas fa-users"></i></a></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
