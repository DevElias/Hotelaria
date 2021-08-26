import React, {Component, Fragment} from 'react';

class MenuPalavras extends Component {
    constructor(props) {
        super();
    }

    render(){
        const { palavras } = this.props;
    	return (
    		<Fragment>
        		{
        			palavras.map(palavra => (
        					<a key={palavra} id={palavra} href="#"  data-target="#palavraschave" data-toggle="collapse" onClick={() => this.props.handler(palavra)}>{palavra}</a>
        			))
        		}
           </Fragment>
        )
    }
}

export default MenuPalavras;
