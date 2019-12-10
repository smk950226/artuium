import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtworkCard from './presenter';

class Container extends Component{
    static propTypes = {
        artwork: PropTypes.object.isRequired
    }
    
    render(){
        return(
            <ArtworkCard 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;