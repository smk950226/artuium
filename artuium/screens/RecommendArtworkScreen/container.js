import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecommendArtworkScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <RecommendArtworkScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;