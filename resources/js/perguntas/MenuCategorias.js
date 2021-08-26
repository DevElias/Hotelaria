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
        				<div key={categoria.id} id={categoria.id} className="media dropright">
        					<a href="#" onClick={() => this.props.handler(categoria.id)}>{categoria.categoria}</a>
                        </div>
        			))
        		}
           </Fragment>
        )
    }
}

export default MenuCategorias;
