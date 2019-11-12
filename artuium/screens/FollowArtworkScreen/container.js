import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FollowArtworkScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <FollowArtworkScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;