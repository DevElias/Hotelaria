import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

export default class Cargos extends Component {
	constructor(props)
	{
		super(props);
		this.state =
		{
			cargo : '',
			id: '',
			id_area: '',
			areas: [],
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
				.post('/cargos/gravar', this.state)
				.then(response =>
				{
					window.location.replace('/cargos/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
			else
			{
				axios
				.post('/cargos/atualiza/'+this.state.id, this.state)
				.then(response =>
				{
					window.location.replace('/cargos/admin');
				})
				.catch(error =>
				{
					console.log(error);
				})
			}
		}

		this.getCargo = this.getCargo.bind(this);
	}

	// Get das Areas
	getAreas() {
        axios.get('/areas/lista')
            .then((response) =>
            {
            	const comboAreas = document.getElementById("id_area");
            	let option = '';
            	let areas = [];
                let areasCompleted = [];

                // Precisa adicionar o COmboBox ao State para manipular na edicao
                this.setState({
                	areas: [...response.data.areas]
				})

                response.data.areas.map((area) =>
                    (area.completed == 1) ? areasCompleted.push(areas) : areas.push(areas));

                response.data.areas.forEach((options_areas) => {
                	  option = new Option(options_areas.area, options_areas.id);
                	  comboAreas.options[comboAreas.options.length] = option;
                	});
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	// Busca Categoria de acordo com ID para Edicao
	getCargo(idCargo)
	{
		let id = idCargo;
		const comboAreas = document.getElementById("id_area");
		let option = '';
		axios
		.get('/cargos/buscar/'+id)
		.then(response =>
		{
			// Selected no Options
			this.state.areas.forEach(function(item, index){
				if(item.id == response.data.cargo[0].id_area)
				{
					 comboAreas.value = response.data.cargo[0].id_area;

				}
			});

			this.setState({
				 cargo: response.data.cargo[0].cargo,
                 id: [response.data.cargo[0].id],
                 id_area: response.data.cargo[0].id_area
			 })
		})
		.catch(error =>
		{
			console.log(error);
		})
	}

	componentDidMount() {
        this.getAreas();
        let url_atual   = window.location.href;
		let myarr       = url_atual.split("/");
		let idCargo = myarr[5];
        this.getCargo(idCargo);
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitHandler}>
	                <div className="form-group row">
			            <div className="col-12 col-md-6">
			                <label>Cargo</label>
			                <input id="cargo" type="text" className="form-control-rounded form-control" name="cargo" value={this.state.cargo} onChange={this.changeHandler} />
			            </div>
		                <div className="col-12 col-md-3">
			             	 <label>Área</label>
				             <select id="id_area" name="id_area"  className="form-control-rounded form-control" onChange={this.changeHandler} defaultValue={'DEFAULT'}>
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
