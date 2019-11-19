import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllExhibitionScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <AllExhibitionScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;