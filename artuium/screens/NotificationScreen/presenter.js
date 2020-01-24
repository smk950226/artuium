import React from 'react';
import { View, Text, FlatList, RefreshControl, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import Notification from '../../components/Notification';

const { width, height } = Dimensions.get('window')

const NotificationScreen = (props) => (
    <View style={[styles.container, styles.bgGrayF8]}>
        {props.notification && props.notification.length > 0 ? (
            <FlatList 
            data={props.notification} 
            renderItem={({item}) => (
                <Notification clearNotification={props.clearNotification}  navigation={props.navigation} notification={item} handleNotificationNewChange={props.handleNotificationNewChange} />
            )} 
            numColumns={1} 
            keyExtractor={item => String(item.id)} 
            refreshing={props.refreshing} 
            onRefresh={props.refresh} 
            onEndReached={props.hasNextPage ? props.notificationMore : null} 
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
                <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>알림이 없습니다.</Text>
            </ScrollView>
        )}
    </View>
)

NotificationScreen.propTypes = {
    notification: PropTypes.array,
    hasNextPage: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    notificationMore: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    refresh: PropTypes.func.isRequired,
    handleNotificationNewChange: PropTypes.func.isRequired
}

export default NotificationScreen