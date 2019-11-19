import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <ExhibitionScreen 
                {...this.props}
                {...this.state}
            />
        )
    }
}

export default Container;