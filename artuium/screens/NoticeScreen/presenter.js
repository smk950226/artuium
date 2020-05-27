import React from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import Notice from '../../components/Notice';

const {width, height} = Dimensions.get('window');

const NoticeScreen = props => (
  <View style={[styles.container]}>
    {props.notice && props.notice.length > 0 ? (
      <FlatList
        data={props.notice}
        renderItem={({item}) => (
          <Notice
            notice={item}
            clearNotice={props.clearNotice}
            handleNoticeNewChange={props.handleNoticeNewChange}
          />
        )}
        numColumns={1}
        keyExtractor={item => String(item.id)}
        refreshing={props.refreshing}
        onRefresh={props.refresh}
        onEndReached={props.hasNextPage ? props.noticeMore : null}
        onEndReachedThreshold={0.5}
        bounces={true}
        ListFooterComponent={
          props.isLoadingMore ? (
            <View
              style={[
                styles.alignItemsCenter,
                styles.justifyContentCenter,
                styles.mt5,
                styles.py5,
              ]}>
              <ActivityIndicator size={'small'} color={'#000000'} />
            </View>
          ) : null
        }
      />
    ) : (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.refresh}
            tintColor={'#000000'}
          />
        }>
        <Text
          style={[
            styles.fontMedium,
            styles.font15,
            styles.mt40,
            styles.grayA7,
            styles.textCenter,
          ]}>
          공지사항이 없습니다.
        </Text>
      </ScrollView>
    )}
  </View>
);

NoticeScreen.propTypes = {
  notice: PropTypes.array,
  hasNextPage: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  noticeMore: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  handleNoticeNewChange: PropTypes.func.isRequired,
};

export default NoticeScreen;
