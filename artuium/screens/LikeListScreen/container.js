import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LikeListScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <LikeListScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;