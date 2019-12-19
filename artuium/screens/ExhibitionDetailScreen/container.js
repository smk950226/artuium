import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionDetailScreen from './presenter';

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
        console.log(exhibition)
    }

    _goExhibition = () => {
        this.setState({
            showExhibition: true
        })
    }

    _exitExhibition = () => {
        this.setState({
            showExhibition: false
        })
    }

    render(){
        return(
            <ExhibitionDetailScreen 
            {...this.props}
            {...this.state}
            goExhibition={this._goExhibition}
            exitExhibition={this._exitExhibition}
            />
        )
    }
}

export default Container;