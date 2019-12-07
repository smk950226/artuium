import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtuiumCard from './presenter';

class Container extends Component{
    static propTypes = {
        review: PropTypes.object.isRequired,
        size: PropTypes.string.isRequired
    }
    
    render(){
        return(
            <ArtuiumCard 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;