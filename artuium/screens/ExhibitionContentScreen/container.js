import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionContentScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <ExhibitionContentScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;