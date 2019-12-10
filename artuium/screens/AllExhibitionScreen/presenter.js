import React, { Fragment } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ExhibitionCard from '../../components/ExhibitionCard'
import ArtuiumCard from '../../components/ArtuiumCard';
import { getStatusBarHeight } from "react-native-status-bar-height";
import Modal from "react-native-modal";

const statusBarHeight = getStatusBarHeight()
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

const period = [
    {
        label: '현재전시',
        value: 'now'
    },
    {
        label: '지난전시',
        value: 'past'
    },
    {
        label: '예정전시',
        value: 'upcomming'
    }
]

const scale = [
    {
        label: '중대형',
        value: 'large'
    },
    {
        label: '소형',
        value: 'small'
    }
]

const region = [
    {
        label: '서촌,광화문,시청',
        value: '서촌/광화문/시청'
    },
    {
        label: '삼청동',
        value: '삼청동'
    },
    {
        label: '평창동,성북,부안',
        value: '평창동/성북/부안'
    },
    {
        label: '한남동',
        value: '한남동'
    },
    {
        label: '홍대',
        value: '홍대'
    },
    {
        label: '성수',
        value: '성수'
    },
    {
        label: '인사동',
        value: '인사동'
    },
    {
        label: '청담,압구정',
        value: '청담/압구정'
    },
    {
        label: '기타 지역',
        value: 'else'
    }
]

const AllExhibitionScreen = (props) => (
    <Fragment>
        <View style={[styles.container]}>
            <View style={[{height:50, marginTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
                <TouchableWithoutFeedback onPress={() => props.navigation.goBack(null)}>
                    <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
                </TouchableWithoutFeedback>
                <Text style={[styles.fontBold, styles.font18]}>전체 전시</Text>
                <TouchableWithoutFeedback>
                    <View>
                        <Image source={require('../../assets/images/search.png')} style={[{width: 17, height: 17}]} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={[styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px10, styles.py10, ((props.period.value) || (props.scale.value) || (props.region.value)) ? null : styles.borderBtmGrayDb]}>
                <View style={[styles.row, styles.alignItemsCenter]}>
                    <TouchableWithoutFeedback onPress={props.openPeriodModal}>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.borderRadius5, styles.px5, styles.py5, styles.mr10, props.period.value ? styles.bgGrayF8 : styles.bgLightBlue]}>
                            <Text style={[styles.fontBold, styles.font16]}>기간 V</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={props.openScaleModal}>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.borderRadius5, styles.px5, styles.py5, styles.mr10, props.scale.value ? styles.bgGrayF8 : styles.bgLightBlue]}>
                            <Text style={[styles.fontBold, styles.font16]}>규모 V</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={props.openRegionModal}>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.borderRadius5, styles.px5, styles.py5, props.region.value ? styles.bgGrayF8 : styles.bgLightBlue]}>
                            <Text style={[styles.fontBold, styles.font16]}>지역 V</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback onPress={props.openFilterModal}>
                    <View style={[styles.pr15]}>
                        <Image source={require('../../assets/images/icon_sort.png')} style={[{width: 25, height: 25}]} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {((props.period.value) || (props.scale.value) || (props.region.value)) && (
                <View style={[styles.row, styles.alignItemsCenter, styles.px10, styles.pb10, styles.borderBtmGrayDb]}>
                    {(props.period.value) && (
                        <TouchableWithoutFeedback onPress={() => props.handlePeriodChange({})}>
                            <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.borderRadiusRound, styles.bgBlue, styles.px10, styles.py5, styles.mr5]}>
                                <Text style={[styles.fontBold, styles.font16, styles.white]}>{`${props.period.label} X`}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    {(props.scale.value) && (
                        <TouchableWithoutFeedback onPress={() => props.handleScaleChange({})}>
                            <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.borderRadiusRound, styles.bgBlue, styles.px10, styles.py5, styles.mr5]}>
                                <Text style={[styles.fontBold, styles.font16, styles.white]}>{`${props.scale.label} X`}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    {(props.region.value) && (
                        <TouchableWithoutFeedback onPress={() => props.handleRegionChange({})}>
                            <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.borderRadiusRound, styles.bgBlue, styles.px10, styles.py5, styles.mr5]}>
                                <Text style={[styles.fontBold, styles.font16, styles.white]}>{`${props.region.label} X`}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
            )}
            {props.loading ? (
                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <ActivityIndicator size={'small'} color={'#000'} />
                </View>
            ) : (
                props.exhibitions && props.exhibitions.length > 0 ? (
                    <FlatList 
                    data={props.exhibitions} 
                    renderItem={({item}) => (
                        <ExhibitionCard exhibition={item} full={true} />
                    )} 
                    numColumns={1} 
                    keyExtractor={item => String(item.id)} 
                    refreshing={props.refreshing} 
                    onRefresh={props.refresh} 
                    onEndReached={props.hasNextPage ? props.exhibitionMore : null} 
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
                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>전시가 없습니다.</Text>
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
        <Modal 
        isVisible={props.showPeriodModal}
        backdropOpacity={0.26}
        onBackButtonPress={props.closePeriodModal}
        onBackdropPress={props.closePeriodModal}
        style={[styles.justifyContentEnd, {margin: 0}]}
        >
            <TouchableWithoutFeedback onPress={props.closePeriodModal}>
                <View style={[styles.container, styles.px0, styles.justifyContentEnd]}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.bgWhite, styles.borderTopRadius10, { paddingBottom: 150 }]}>
                            <View style={[styles.borderBtmGray70, styles.py10]}>
                                <Text style={[styles.fontMedium, styles.font17, styles.textCenter]}>
                                    기간
                                </Text>
                            </View>
                            {period.map((fil, index) => (
                                <TouchableWithoutFeedback key={index} onPress={() => props.handlePeriodChange(fil)}>
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
        <Modal 
        isVisible={props.showScaleModal}
        backdropOpacity={0.26}
        onBackButtonPress={props.closeScaleModal}
        onBackdropPress={props.closeScaleModal}
        style={[styles.justifyContentEnd, {margin: 0}]}
        >
            <TouchableWithoutFeedback onPress={props.closeScaleModal}>
                <View style={[styles.container, styles.px0, styles.justifyContentEnd]}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.bgWhite, styles.borderTopRadius10, { paddingBottom: 150 }]}>
                            <View style={[styles.borderBtmGray70, styles.py10]}>
                                <Text style={[styles.fontMedium, styles.font17, styles.textCenter]}>
                                    규모
                                </Text>
                            </View>
                            {scale.map((fil, index) => (
                                <TouchableWithoutFeedback key={index} onPress={() => props.handleScaleChange(fil)}>
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
        <Modal 
        isVisible={props.showRegionModal}
        backdropOpacity={0.26}
        onBackButtonPress={props.closeRegionModal}
        onBackdropPress={props.closeRegionModal}
        style={[styles.justifyContentEnd, {margin: 0}]}
        >
            <TouchableWithoutFeedback onPress={props.closeRegionModal}>
                <View style={[styles.container, styles.px0, styles.justifyContentEnd]}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.bgWhite, styles.borderTopRadius10, { paddingBottom: 150 }]}>
                            <View style={[styles.borderBtmGray70, styles.py10]}>
                                <Text style={[styles.fontMedium, styles.font17, styles.textCenter]}>
                                    
                                </Text>
                            </View>
                            {region.map((fil, index) => (
                                <TouchableWithoutFeedback key={index} onPress={() => props.handleRegionChange(fil)}>
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

AllExhibitionScreen.propTypes = {
    loading: PropTypes.bool.isRequired,
    showFilterModal: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    exhibitions: PropTypes.array,
    refreshing: PropTypes.bool.isRequired,
    period: PropTypes.object.isRequired,
    scale: PropTypes.object.isRequired,
    region: PropTypes.object.isRequired,
    openFilterModal: PropTypes.func.isRequired,
    closeFilterModal: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    openPeriodModal: PropTypes.func.isRequired,
    closePeriodModal: PropTypes.func.isRequired,
    handlePeriodChange: PropTypes.func.isRequired,
    openScaleModal: PropTypes.func.isRequired,
    closeScaleModal: PropTypes.func.isRequired,
    handleScaleChange: PropTypes.func.isRequired,
    openRegionModal: PropTypes.func.isRequired,
    closeRegionModal: PropTypes.func.isRequired,
    handleRegionChange: PropTypes.func.isRequired,
    exhibitionMore: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    showPeriodModal: PropTypes.bool.isRequired,
    showScaleModal: PropTypes.bool.isRequired,
    showRegionModal: PropTypes.bool.isRequired,
}

export default AllExhibitionScreen;