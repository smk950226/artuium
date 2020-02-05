import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionArtworkScreen from './presenter';

class Container extends Component{
    static propTypes = {
        likeExhibition: PropTypes.func.isRequired,
        unlikeExhibition: PropTypes.func.isRequired,
        viewExhibition: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        const exhibition = props.navigation.getParam('exhibition', null)
        const from = props.navigation.getParam('from', null)
        const { is_liked, like_count, review_count } = exhibition;
        this.state = {
            exhibition,
            is_liked,
            like_count,
            review_count,
            showExhibition: false,
            from,
            isSubmitting: false
        }
    }

    componentDidMount = () => {
        const { viewExhibition } = this.props;
        const { exhibition : { id } } = this.state;
        viewExhibition(id)
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props){
            const from = this.props.navigation.getParam('from', null)
            this.setState({
                from
            })
        }
    }

    _like = async() => {
        const { is_liked, isSubmitting, exhibition : { id } } = this.state;
        const { likeExhibition } = this.props;
        if(!isSubmitting){
            if(!is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await likeExhibition(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: true,
                        isSubmitting: false,
                        like_count: this.state.like_count + 1
                    })
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
        }
    }

    _unlike = async() => {
        const { is_liked, isSubmitting, exhibition : { id } } = this.state;
        const { unlikeExhibition } = this.props;
        if(!isSubmitting){
            if(is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await unlikeExhibition(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: false,
                        isSubmitting: false,
                        like_count: this.state.like_count - 1
                    })
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
        }
    }

    render(){
        return(
            <ExhibitionArtworkScreen 
            {...this.props}
            {...this.state}
            like={this._like}
            unlike={this._unlike}
            />
        )
    }
}

export default Container;