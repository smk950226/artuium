import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <LoginScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;