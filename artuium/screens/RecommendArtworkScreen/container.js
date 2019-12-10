import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecommendArtworkScreen from './presenter';

class Container extends Component{
    static propTypes = {
        getReviewList: PropTypes.func.isRequired,
        getReviewListMore: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        showFilterModal: false,
        filter: 'new',
        page: 1,
        hasNextPage: true,
        isLoadingMore: false,
        reviews: [],
        refreshing: false
    }

    componentDidMount = async() => {
        const { getReviewList } = this.props;
        const { filter } = this.state;
        const reviews = await getReviewList('recommended', filter)
        this.setState({
            reviews,
            loading: false
        })
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevState.filter !== this.state.filter){
            this.setState({
                loading: true,
                page: 1,
                hasNextPage: true,
                isLoadingMore: false,
                showFilterModal: false
            })
            const { getReviewList } = this.props;
            const { filter } = this.state;
            const reviews = await getReviewList('recommended', filter)
            this.setState({
                reviews,
                loading: false
            })
        }
    }

    _reviewMore = async() => {
        const { getReviewListMore } = this.props;
        const { page, hasNextPage, isLoadingMore, filter } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await getReviewListMore('recommended', filter, page+1);
                if(result){
                    await this.setState({
                        page: this.state.page+1,
                        isLoadingMore: false,
                        reviews: [...this.state.reviews, ...result]
                    })
                }
                else{
                    this.setState({
                        isLoadingMore: false,
                        hasNextPage: false
                    })
                }
            }
        }
    }

    _refresh = async() => {
        const { getReviewList } = this.props;
        const { filter } = this.state;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })

        const reviews = await getReviewList('recommended', filter)
        this.setState({
            reviews,
            refreshing: false
        })
    }  

    _openFilterModal = () => {
        this.setState({
            showFilterModal: true
        })
    }

    _closeFilterModal = () => {
        this.setState({
            showFilterModal: false
        })
    }

    _handleFilterChange = (filter) => {
        this.setState({
            filter
        })
    }

    render(){
        return(
            <RecommendArtworkScreen 
            {...this.props}
            {...this.state}
            openFilterModal={this._openFilterModal}
            closeFilterModal={this._closeFilterModal}
            handleFilterChange={this._handleFilterChange}
            reviewMore={this._reviewMore}
            refresh={this._refresh}
            />
        )
    }
}

export default Container;