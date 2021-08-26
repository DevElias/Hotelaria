import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class AdminHoteis extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			hoteis : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirHotel = this.excluirHotel.bind(this);
        this.ordernarHoteis = this.ordernarHoteis.bind(this);
    }
	excluirHotel(e){
		let id = e;
        axios
		.post('/hoteis/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/hoteis/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }
    // Get Hoteis
	getHoteis() {
        axios.get('/hoteis/lista')
            .then((response) =>
            {
                let hoteis = [];
                response.data.hoteis.map((hotel) =>
				hoteis.push(hotel));

                this.setState({
                	hoteis: [...hoteis]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
	
	ordernarHoteis(ordem){
		if(ordem == 'asc'){
			const myData = [].concat(this.state.hoteis)
			.sort((a, b) => a.hotel > b.hotel ? 1 : -1);
			this.setState({
				hoteis         : [...myData],
			})
		}else {
			const myData = [].concat(this.state.hoteis)
			.sort((a, b) => a.hotel < b.hotel ? 1 : -1);
			this.setState({
				hoteis         : [...myData],
			})
		}

	}
	
    componentDidMount() {
        this.getHoteis();
    }
    render() {
        const { hoteis } = this.state;
        return (

            <div className="table-responsive-md">
	            <div className="col-12 col-md-4 text-left">
					<div className="btn-group">
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Ordenar
						</button>
						<div className="dropdown-menu">
							<div className="dropdown-item" onClick={() => this.ordernarHoteis('asc')}>Alfabética [a-z]</div>
							<div className="dropdown-item" onClick={() => this.ordernarHoteis('desc')}>Alfabética [z-a]</div>
						</div>
					</div>
				</div>
            	
                <div className="row">
                    <div className="col-12 text-right marginbtm-50">
                    <a href="/hoteis/cadastro" className="btn btn-primary">Novo Hotel</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Hotel</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">Último alterador</th>
                    <th scope="col">Última atualização</th>
                    <th scope="col">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			hoteis.map(hotel => (

                <tr key={hotel.id} id={hotel.id}>
                    <th scope="row">{hotel.id}</th>
                    <td>{hotel.hotel}</td>
                    <td>{hotel.Estado}</td>
                    <td>{hotel.Cidade}</td>
                    <td>{hotel.Alterador}</td>
                    <td>{hotel.DataAlt}</td>
                    <td><a href={'editar/'+hotel.id} className="btn btn-secondary btn-sm"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirHotel(hotel.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
