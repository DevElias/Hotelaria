import React, {Component, Fragment} from 'react';

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
        				<div key={categoria.id} id={categoria.id} className="nav-item dropdown">
        					<a href="#" className="dropdown-item" data-target="#accordion" data-toggle="collapse"  onClick={() => this.props.handler(categoria.id)}>{categoria.categoria}</a>
                        </div>
        			))
        		}
           </Fragment>
        )
    }
}

export default MenuCategorias;
