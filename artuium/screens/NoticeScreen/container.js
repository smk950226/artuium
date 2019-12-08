import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoticeScreen from './presenter';

class Container extends Component{
    render(){
        return(
            <NoticeScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;