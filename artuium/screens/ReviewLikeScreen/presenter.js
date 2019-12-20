import React from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView, RefreshControl, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';

class ReviewLikeScreen extends React.Component {
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getReviewLikeList: PropTypes.func.isRequired,
        getReviewLikeListMore: PropTypes.func.isRequired,
        reviewMore: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired,
        likes: PropTypes.array,
        hasNextPage: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        refreshing: PropTypes.bool.isRequired
    }

    render(){
        const { profile, likes, refreshing, hasNextPage, isLoadingMore } = this.props;
        return(
            <View style={[styles.container, styles.pt20]}>
                {likes && likes.length > 0 ? (
                    <FlatList 
                    data={likes} 
                    renderItem={({item}) => (
                        <ArtuiumCard review={item.review} size={'xlarge'} navigation={this.props.navigation} />
                    )} 
                    numColumns={1} 
                    keyExtractor={item => String(item.id)} 
                    refreshing={refreshing} 
                    onRefresh={this.props.refresh} 
                    onEndReached={hasNextPage ? this.props.artworkMore : null} 
                    onEndReachedThreshold={0.5} 
                    bounces={true} 
                    ListFooterComponent={isLoadingMore ? (
                        <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mt5, styles.py5]}>
                            <ActivityIndicator size={'small'} color={'#000000'} />
                        </View>
                    ): null} />
                ) : (
                    <ScrollView 
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.props.refresh} tintColor={'#000000'} />}
                    >
                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>전시가 없습니다.</Text>
                    </ScrollView>
                )}
            </View>
        )
    }
}

export default ReviewLikeScreen;