import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditProfileScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <EditProfileScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;