import React, { Fragment } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';
import { getStatusBarHeight } from "react-native-status-bar-height";
import Modal from "react-native-modal";

const statusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window');

const filter = [
    {
        label: '신규순',
        value: 'new'
    },
    {
        label: '많은 댓글 순',
        value: 'comment'
    },
    {
        label: '많은 좋아요 순',
        value: 'like'
    },
    {
        label: '높은 별점 순',
        value: 'rate'
    }
]

const AllExhibitionReviewScreen = (props) => (
    <Fragment>
    <View style={[styles.container]}>
        <View style={[{height:50, marginTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
            <TouchableWithoutFeedback onPress={() => props.navigation.goBack(null)}>
                <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
            </TouchableWithoutFeedback>
            <Text style={[styles.fontBold, styles.font18]}>전시 감상 전체</Text>
            <TouchableWithoutFeedback onPress={props.openFilterModal}>
                <View>
                    <Image source={require('../../assets/images/icon_sort.png')} style={[{width: 20, height: 17}]} />
                </View>
            </TouchableWithoutFeedback>
        </View>
        {props.loading ? (
            <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                <ActivityIndicator size={'small'} color={'#000'} />
            </View>
        ) : (
            props.reviews && props.reviews.length > 0 ? (
                <FlatList 
                data={props.reviews} 
                renderItem={({item}) => (
                    <ArtuiumCard review={item} size={'xlarge'} navigation={props.navigation} />
                )} 
                numColumns={1} 
                keyExtractor={item => String(item.id)} 
                refreshing={props.refreshing} 
                onRefresh={props.refresh} 
                onEndReached={props.hasNextPage ? props.reviewMore : null} 
                onEndReachedThreshold={0.5} 
                bounces={true} 
                ListFooterComponent={props.isLoadingMore ? (
                    <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mt5, styles.py5]}>
                        <ActivityIndicator size={'small'} color={'#000000'} />
                    </View>
                ): null} />
            ) : (
                <ScrollView 
                refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.refresh} tintColor={'#000000'} />}
                >
                    <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>감상이 없습니다.</Text>
                </ScrollView>
            )
        )}
    </View>
        <Modal 
        isVisible={props.showFilterModal}
        backdropOpacity={0.26}
        onBackButtonPress={props.closeFilterModal}
        onBackdropPress={props.closeFilterModal}
        style={[styles.justifyContentEnd, {margin: 0}]}
        >
            <TouchableWithoutFeedback onPress={props.closeFilterModal}>
                <View style={[styles.container, styles.px0, styles.justifyContentEnd]}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.bgWhite, styles.borderTopRadius10, { paddingBottom: 150 }]}>
                            <View style={[styles.borderBtmGray70, styles.py10]}>
                                <Text style={[styles.fontMedium, styles.font17, styles.textCenter]}>
                                    정렬
                                </Text>
                            </View>
                            {filter.map((fil, index) => (
                                <TouchableWithoutFeedback key={index} onPress={() => props.handleFilterChange(fil.value)}>
                                    <View style={[styles.borderBtmGray70, styles.py10, styles.px25]}>
                                        <Text style={[styles.fontRegular, styles.font15]}>
                                            {fil.label}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </Fragment>
)

AllExhibitionReviewScreen.propTypes = {
    openFilterModal: PropTypes.func.isRequired,
    closeFilterModal: PropTypes.func.isRequired,
    showFilterModal: PropTypes.bool.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    reviews: PropTypes.array,
    reviewMore: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired 
}

export default AllExhibitionReviewScreen;