import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import ArtworkContentScreen from './presenter';

class Container extends Component{
    static propTypes = {
        likeArtwork: PropTypes.func.isRequired,
        unlikeArtwork: PropTypes.func.isRequired,
        getArtworkReviewList: PropTypes.func.isRequired,
        getArtworkReviewListMore: PropTypes.func.isRequired,
        createArtworkReview: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const artwork = props.navigation.getParam('artwork', null)
        const { is_liked, like_count, review_count, is_reviewed, total_rate } = artwork;
        this.state = {
            artwork,
            is_liked,
            is_reviewed,
            like_count,
            review_count,
            loading: true,
            isSubmitting: false,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            reviews: [],
            refreshing: false,
            myReviews: [],
            mode: 'list',
            rating: 0,
            expression: '',
            content: '',
            isSubmittingReview: false,
            total_rate,
            showingReview: {}
        }
    }

    componentDidMount = async() => {
        const { artwork : { id } } = this.state;
        const { getArtworkReviewList } = this.props;
        const result = await getArtworkReviewList(id)
        if(result.status === 'ok'){
            this.setState({
                loading: false,
                reviews: result.reviews,
                myReviews: result.my_review,
                thumb: result.thumb,
                good: result.good,
                soso: result.soso,
                sad: result.sad,
                surprise: result.surprise,
            })
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    _reviewListMore = async() => {
        const { getArtworkReviewListMore } = this.props;
        const { page, hasNextPage, isLoadingMore, artwork : { id } } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await getArtworkReviewListMore(id, page+1);
                if(result.status === 'ok'){
                    await this.setState({
                        page: this.state.page+1,
                        isLoadingMore: false,
                        reviews: [...this.state.reviews, ...result.reviews]
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
        const { getArtworkReviewList } = this.props;
        const { artwork : { id } } = this.state;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })

        const result = await getArtworkReviewList(id)
        if(result.status === 'ok'){
            this.setState({
                loading: false,
                reviews: result.reviews,
                refreshing: false,
                myReviews: result.my_review,
                thumb: result.thumb,
                good: result.good,
                soso: result.soso,
                sad: result.sad,
                surprise: result.surprise,
            })
        }
        else{
            this.setState({
                loading: false,
                reviews: [],
                refreshing: false
            })
        }
    }  

    _like = async() => {
        const { is_liked, isSubmitting, artwork : { id } } = this.state;
        const { likeArtwork } = this.props;
        if(!isSubmitting){
            if(!is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await likeArtwork(id)
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
        const { is_liked, isSubmitting, artwork : { id } } = this.state;
        const { unlikeArtwork } = this.props;
        if(!isSubmitting){
            if(is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await unlikeArtwork(id)
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
    
    _handleChangeMode = (mode, showingReview) => {
        if(mode === 'review'){
            this.setState({
                mode,
                rating: 0,
                expression: '',
                content: '',
                showingReview
            })
        }
        else{
            this.setState({
                mode,
                rating: 0,
                expression: '',
                content: ''
            })
        }
    }

    _handleChangeExpression = (expression) => {
        this.setState({
            expression
        })
    }

    _handleChangeRating = (rating) => {
        this.setState({
            rating
        })
    }

    _handleChangeContent = (content) => {
        this.setState({
            content
        })
    }

    _submit = async() => {
        const { rating, expression, content, isSubmittingReview, artwork : { id } } = this.state;
        const { createArtworkReview } = this.props;
        if(!isSubmittingReview){
            if(rating && expression && content){
                this.setState({
                    isSubmittingReview: true
                })
                const result = await createArtworkReview(id, rating, expression, content)
                if(result.status === 'ok'){
                    this.setState({
                        reviews: [...this.state.reviews, result.review],
                        myReviews: [result.review, ...this.state.myReviews],
                        total_rate: result.total_rate,
                        thumb: result.thumb,
                        good: result.good,
                        soso: result.soso,
                        sad: result.sad,
                        surprise: result.surprise,
                        isSubmittingReview: false,
                        mode: 'list',
                        is_reviewed: true
                    })
                }
                else if(result.error){
                    this.setState({
                        isSubmittingReview: false
                    })
                    Alert.alert(null, result.error)
                }
                else{
                    this.setState({
                        isSubmittingReview: false
                    })
                    Alert.alert(null, '오류가 발생하였습니다.')
                }
            }
            else{
                Alert.alert(null, "감상 정보를 입력해주세요.")
            }
        }
    }

    render(){
        return(
            <ArtworkContentScreen 
            {...this.props}
            {...this.state}
            like={this._like}
            unlike={this._unlike}
            reviewListMore={this._reviewListMore}
            refresh={this._refresh}
            handleChangeMode={this._handleChangeMode}
            handleChangeExpression={this._handleChangeExpression}
            handleChangeRating={this._handleChangeRating}
            handleChangeContent={this._handleChangeContent}
            submit={this._submit}
            />
        )
    }
}

export default Container;