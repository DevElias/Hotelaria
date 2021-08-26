import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


export default class AdminAreas extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			areas : [],
		};

		this.changeHandler = e => {
			this.setState({ [e.target.name]: e.target.value});
		}

		this.submitHandler = e =>{
			e.preventDefault();
        }
        this.excluirArea = this.excluirArea.bind(this);
        this.ordernarAreas = this.ordernarAreas.bind(this);
    }
    excluirArea(e){
    	let id = e;
        axios
		.post('/areas/destroy/'+id, this.state)
		.then(response =>
		{
			 if(response.data.code = '200')
			 {
				window.location.replace('/areas/admin');
			 }
		})
		.catch(error =>
		{
			console.log(error);
		})
    }
    // Get Areas
	getAreas() {
        axios.get('/areas/lista')
            .then((response) =>
            {
                let areas = [];
                response.data.areas.map((area) =>
				areas.push(area));

                this.setState({
                	areas: [...areas]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }
	
	ordernarAreas(ordem){
		if(ordem == 'asc'){
			const myData = [].concat(this.state.areas)
			.sort((a, b) => a.area > b.area ? 1 : -1);
			this.setState({
				areas         : [...myData],
			})
		}else {
			const myData = [].concat(this.state.areas)
			.sort((a, b) => a.area < b.area ? 1 : -1);
			this.setState({
				areas         : [...myData],
			})
		}

	}
	
    componentDidMount() {
        this.getAreas();
    }
    render() {
        const { areas } = this.state;
        return (

            <div className="table-responsive-md">
            <div className="col-12 col-md-4 text-left">
				<div className="btn-group">
					<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Ordenar
					</button>
					<div className="dropdown-menu">
						<div className="dropdown-item" onClick={() => this.ordernarAreas('asc')}>Crescente</div>
						<div className="dropdown-item" onClick={() => this.ordernarAreas('desc')}>Decrescente</div>
					</div>
				</div>
			</div>
                <div className="row">
                    <div className="col-12 text-right marginbtm-50">
                    <a href="/areas/cadastro" className="btn btn-primary">Nova Área</a>
                    </div>
                </div>
                <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Área</th>
                    <th scope="col">Última atualização</th>
                    <th scope="col">Opções</th>
                </tr>
                </thead>
                <tbody>
                {
        			areas.map(area => (

                <tr key={area.id} id={area.id}>
                    <th scope="row">{area.id}</th>
                    <td>{area.area}</td>
                    <td>{area.DataAlt}</td>
                    <td><a href={'editar/'+area.id} className="btn btn-secondary btn-sm"><i className="far fa-edit"></i></a> <button onClick={() => this.excluirArea(area.id)} className="btn btn-danger btn-sm"><i className="far fa-trash-alt"></i></button></td>
                </tr>
                    ))
                }
                </tbody>
            </table>
          </div>
        );
    }
}
