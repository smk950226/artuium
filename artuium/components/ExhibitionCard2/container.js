import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionCard2 from './presenter';

class Container extends Component{
    static propTypes = {
        exhibition: PropTypes.object.isRequired
    }
    
    render(){
        return(
            <ExhibitionCard2 
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default Container;