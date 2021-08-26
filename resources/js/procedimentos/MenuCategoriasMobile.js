import React, {Component, Fragment} from 'react';
import MenuSubCategoriasMobile  from "./MenuSubCategoriasMobile";

class MenuCategorias extends Component {
    constructor(props) {
        super();
    }

    render(){
        const { categorias } = this.props;
    	return (
    		<Fragment>
                <ul className="nav navbar-nav">
        		{
        			categorias.map(categoria => (
                        <li key={categoria.id} id={categoria.id} className="nav-item dropdown">
                            <div id={'heading'+categoria.id}>
                       <h5><a href="#" className="btn btn-link" data-toggle="collapse" data-target={'#categoria'+categoria.id} aria-expanded="true" aria-controls={'categoria'+categoria.id}>
                        {categoria.categoria}</a></h5></div>
                        <div className="collapse" id={'categoria'+categoria.id} aria-labelledby={'heading'+categoria.id} data-parent="#accordion">
                            <MenuSubCategoriasMobile id={categoria.id} handler={this.props.handler} />
                        </div>
                        </li>
        			))
        		}
                </ul>
           </Fragment>
        )
    }
}

export default MenuCategorias;
