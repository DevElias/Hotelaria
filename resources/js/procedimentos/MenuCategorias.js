import React, {Component, Fragment} from 'react';
import MenuSubCategorias  from "./MenuSubCategorias";

class MenuCategorias extends Component {
    constructor(props) {
        super();
    }

    render(){
        const { categorias } = this.props;
    	return (
    		<Fragment>
        		{
        			categorias.map(categoria => (
        				<div key={categoria.id} id={categoria.id} className="media dropright">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {categoria.categoria}</button>
                        <MenuSubCategorias id={categoria.id} handler={this.props.handler} />
                        </div>
        			))
        		}
           </Fragment>
        )
    }
}

export default MenuCategorias;
