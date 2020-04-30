import React, {Component, Fragment} from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import ExhibitionScreen from './presenter';
import {NavigationEvents} from 'react-navigation';

class Container extends Component {
  static propTypes = {
    initialStatus: PropTypes.string,
    newExhibitions: PropTypes.array,
    recommendedExhibitions: PropTypes.array,
    hotExhibitions: PropTypes.array,
    pastExhibitions: PropTypes.array,
    initialExhibition: PropTypes.func.isRequired,
    checkNoticeAll: PropTypes.func.isRequired,
    checkNotificationAll: PropTypes.func.isRequired,
    getNoticeNew: PropTypes.func.isRequired,
    getNotificationNew: PropTypes.func.isRequired,
    noticeNew: PropTypes.bool.isRequired,
    notificationNew: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    const {noticeNew, notificationNew} = props;
    this.state = {
      loading: false,
      fetchedNew: false,
      fetchedRecommended: false,
      fetchedHot: false,
      fetchedPast: false,
      fetchClear: false,
      noticeNew,
      notificationNew,
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    const {
      initialExhibition,
      checkNoticeAll,
      checkNotificationAll,
      getNoticeNew,
      getNotificationNew,
    } = this.props;
    const noticeNew = await checkNoticeAll();
    const notificationNew = await checkNotificationAll();
    if (noticeNew.is_new) {
      getNoticeNew(true);
      this.setState({
        noticeNew: true,
      });
    } else {
      getNoticeNew(false);
      this.setState({
        noticeNew: false,
      });
    }
    if (notificationNew.is_new) {
      getNotificationNew(true);
      this.setState({
        notificationNew: true,
      });
    } else {
      getNotificationNew(false);
      this.setState({
        notificationNew: false,
      });
    }
    await initialExhibition();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {fetchedNew, fetchedRecommended, fetchedHot, fetchedPast} = prevState;
    let update = {};
    if (nextProps.newExhibitions) {
      update.fetchedNew = true;
    }
    if (nextProps.recommendedExhibitions) {
      update.fetchedRecommended = true;
    }
    if (nextProps.hotExhibitions) {
      update.fetchedHot = true;
    }
    if (nextProps.pastExhibitions) {
      update.fetchedPast = true;
    }

    return update;
  }

  componentDidUpdate = () => {
    if (
      this.state.fetchedNew &&
      this.state.fetchedRecommended &&
      this.state.fetchedHot &&
      this.state.fetchedPast &&
      !this.state.fetchClear
    ) {
      this.setState({
        loading: false,
        fetchClear: true,
      });
    }
  };

  _refresh = async () => {
    const {
      initialExhibition,
      checkNoticeAll,
      checkNotificationAll,
    } = this.props;
    this.setState({
      refreshing: false,
    });
    const noticeNew = await checkNoticeAll();
    const notificationNew = await checkNotificationAll();
    if (noticeNew.is_new) {
      this.setState({
        noticeNew: true,
      });
    }
    if (notificationNew.is_new) {
      this.setState({
        notificationNew: true,
      });
    }
    await initialExhibition();
    this.setState({
      refreshing: false,
    });
  };

  _handleNoticeNewChange = noticeNew => {
    this.props.getNoticeNew(noticeNew);
    this.setState({
      noticeNew,
    });
  };

  _handleNotificationNewChange = notificationNew => {
    this.props.getNotificationNew(notificationNew);
    this.setState({
      notificationNew,
    });
  };

  _remount = async () => {
    const {
      initialExhibition,
      checkNoticeAll,
      checkNotificationAll,
      getNoticeNew,
      getNotificationNew,
    } = this.props;
    const noticeNew = await checkNoticeAll();
    const notificationNew = await checkNotificationAll();
    if (noticeNew.is_new) {
      getNoticeNew(true);
      this.setState({
        noticeNew: true,
      });
    } else {
      getNoticeNew(false);
      this.setState({
        noticeNew: false,
      });
    }
    if (notificationNew.is_new) {
      getNotificationNew(true);
      this.setState({
        notificationNew: true,
      });
    } else {
      getNotificationNew(false);
      this.setState({
        notificationNew: false,
      });
    }
    await initialExhibition();
  };
  componentWillUnmount = () => {
    this.props.removeUpMark();
  };

  render() {
    const {loading} = this.state;
    if (loading) {
      return (
        <View
          style={[
            styles.container,
            styles.alignItemsCenter,
            styles.justifyContentCenter,
          ]}>
          <ActivityIndicator size={'small'} color={'#000'} />
        </View>
      );
    } else {
      return (
        <Fragment>
          <NavigationEvents
            onWillFocus={payload => {
              this._remount();
            }}
          />
          <ExhibitionScreen
            {...this.props}
            {...this.state}
            handleNoticeNewChange={this._handleNoticeNewChange}
            handleNotificationNewChange={this._handleNotificationNewChange}
            refresh={this._refresh}
          />
        </Fragment>
      );
    }
  }
}

export default Container;
