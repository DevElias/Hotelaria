import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class AdminPerguntas extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			perguntas : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirPerguntas = this.excluirPerguntas.bind(this);
    }
    excluirPerguntas(e){
    	let id = e;
        axios
		.post('/perguntas/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/perguntas/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }
    // Get Perfil
	getPerguntas() {
        axios.get('/perguntas/listagem')
            .then((response) =>
            {
                let perguntas = [];
                response.data.perguntas.map((pergunta) =>
				perguntas.push(pergunta));

                this.setState({
                	perguntas: [...perguntas]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
    componentDidMount() {
        this.getPerguntas();
    }
    render() {
        const { perguntas } = this.state;
        return (

            <div className="table-responsive-md">
                <div className="row">
                    <div className="col-12 text-right marginbtm-50">
                    <a href="/perguntas/cadastro" className="btn btn-primary">Nova Pergunta</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pergunta</th>
                    <th scope="col">Destacado</th>
                    <th scope="col">Palavras-chave</th>
                    <th scope="col">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			perguntas.map(pergunta => (

                <tr key={pergunta.id} id={pergunta.id}>
                    <th scope="row">{pergunta.id}</th>
                    <td>{pergunta.pergunta}</td>
                    <td>{pergunta.Destacado}</td>
                    <td>{pergunta.palavras_chave}</td>
                    <td><a href={'editar/'+pergunta.id} className="btn btn-secondary btn-sm"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirPerguntas(pergunta.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
