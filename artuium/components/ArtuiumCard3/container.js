import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtuiumCard3 from './presenter';

class Container extends Component{
    static propTypes = {
        artwork: PropTypes.object.isRequired,
    }
    
    render(){
        return(
            <ArtuiumCard3 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;