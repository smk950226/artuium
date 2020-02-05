import React from 'react';
import { View, Text, TouchableWithoutFeedback, ImageBackground, ScrollView, RefreshControl, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

class ExhibitionLikeScreen extends React.Component {
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getExhibitionLikeList: PropTypes.func.isRequired,
        getExhibitionLikeListMore: PropTypes.func.isRequired,
        exhibitionMore: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired,
        likes: PropTypes.array,
        hasNextPage: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        refreshing: PropTypes.bool.isRequired
    }

    render(){
        const { profile, likes, refreshing, hasNextPage, isLoadingMore } = this.props;
        return(
            <View style={[styles.container, styles.px5]}>
                {likes && likes.length > 0 ? (
                    <FlatList 
                    data={likes} 
                    renderItem={({item}) => (
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ExhibitionDetail', { exhibition: item.exhibition, from: 'LikeList' })}>
                            <ImageBackground source={{uri: item.exhibition.images ? item.exhibition.images.length > 0 ? item.exhibition.images[0].image : '' : ''}} resizeMode={'cover'} style={[{height: 190, width: (width-40)/3}, styles.mx5, styles.mb5, styles.borderRadius5, styles.exCardShadow, styles.artworkBorder, styles.overflowHidden]} />
                        </TouchableWithoutFeedback>
                    )} 
                    numColumns={3} 
                    keyExtractor={item => String(item.exhibition.id)} 
                    refreshing={refreshing} 
                    onRefresh={this.props.refresh} 
                    onEndReached={hasNextPage ? this.props.exhibitionMore : null} 
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

export default ExhibitionLikeScreen;