import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionCard from './presenter';

class Container extends Component{
    static propTypes = {
    }
    
    render(){
        return(
            <ExhibitionCard 
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default Container;