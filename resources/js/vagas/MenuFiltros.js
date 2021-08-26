import React, {Component, Fragment} from 'react';

class MenuFiltros extends Component {
    constructor(props) {
        super();
    }

    render(){
        const { filtros } = this.props;
    	return (
    		<Fragment>
        		{
        			filtros.map(filtro => (
        					<button key={filtro.nTipo+filtro.id} id={filtro.nTipo+filtro.id} onClick={() => this.props.handler(filtro.id, filtro.nTipo)}><img src="/img/ico-fechar-tag.svg" alt="filtro" /> {filtro.TFiltro}</button>
        			))
        		}
           </Fragment>
        )
    }
}

export default MenuFiltros;
