import React, {Component} from 'react';

class MenuSubCategorias extends Component {
    constructor(props) {
        super();

        this.state =
		{
			subcategorias: [],
		};
    }

	getSubcategorias(id) {
        axios.get(`/subcategorias/lista/${id}`)
            .then((response) =>
            {
            	let subcategorias = [];
                response.data.subcategorias.map((subcategoria) =>
				subcategorias.push(subcategoria));

                this.setState({
                    subcategorias: [...subcategorias]
				})
            })
            .catch(error => console.log("It was not possible to bring the data from the database."));
	}


	componentDidMount()
	{
		const { id } = this.props;
		this.getSubcategorias(id);
    }

    render(){
    	const { subcategorias } = this.state;

    	return (
    		<div className="dropdown-menu">
	    		{
	    			subcategorias.map(subcategoria => (
	    				<a key={subcategoria.id} onClick={() => this.props.handler(subcategoria.id)} className="dropdown-item" href="#">{subcategoria.subcategoria}</a>
	    			))
	    		}
            </div>
        )
    }
}

export default MenuSubCategorias;



