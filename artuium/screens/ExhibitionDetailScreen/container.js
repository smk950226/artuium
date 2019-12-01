import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionDetailScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <ExhibitionDetailScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;