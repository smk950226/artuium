import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllArtworkScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <AllArtworkScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;