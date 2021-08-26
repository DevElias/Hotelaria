import React, {Component, Fragment} from 'react';

class MenuEstados extends Component {
    constructor(props) {
        super();

        this.state =
		{
			estados: [],
		};
    }

	getEstados() {
        axios.get(`/estados/lista/`)
            .then((response) =>
            {
            	let estados = [];
                response.data.estados.map((estado) =>
				estados.push(estado));

                this.setState({
                    estados: [...estados]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
    }

	componentDidMount()
	{
		const { id } = this.props;
		this.getEstados();
    }

    render(){
    	const { estados } = this.state;

    	return (
    			<Fragment>
	        		{
	        			estados.map(estado => (
	        				<div key={estado.id} id={estado.id} className="form-check">
	        	                <input className="form-check-input" type="checkbox" id={'checkboxEstado'+estado.id} onClick={() => this.props.handler(estado.id)} />
	        	                <label className="form-check-label">{estado.nome}</label>
	                        </div>
	        			))
	        		}
	        	</Fragment>
        )
    }
}

export default MenuEstados;



