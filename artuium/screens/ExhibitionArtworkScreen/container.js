import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionArtworkScreen from './presenter';

class Container extends Component{
    constructor(props){
        super(props);
        const exhibition = props.navigation.getParam('exhibition', null)
        const { is_liked, like_count, review_count } = exhibition;
        this.state = {
            exhibition,
            is_liked,
            like_count,
            review_count,
            showExhibition: false
        }
    }
    render(){
        return(
            <ExhibitionArtworkScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;