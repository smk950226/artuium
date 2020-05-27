import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AllExhibitionScreen from './presenter';

class Container extends Component {
  static propTypes = {
    getExhibitionList: PropTypes.func.isRequired,
    getExhibitionListMore: PropTypes.func.isRequired,
  };

  state = {
    loading: true,
    showFilterModal: false,
    showPeriodModal: false,
    showScaleModal: false,
    showRegionModal: false,
    filter: 'new',
    page: 1,
    hasNextPage: true,
    isLoadingMore: false,
    exhibitions: [],
    refreshing: false,
    period: {},
    scale: {},
    region: {},
  };

  componentDidMount = async () => {
    const {getExhibitionList} = this.props;
    const {filter, period, scale, region} = this.state;
    const exhibitions = await getExhibitionList(
      'all',
      filter,
      period.value,
      scale.value,
      region.value,
    );
    this.setState({
      exhibitions,
      loading: false,
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.filter !== this.state.filter ||
      prevState.period !== this.state.period ||
      prevState.scale !== this.state.scale ||
      prevState.region !== this.state.region
    ) {
      this.setState({
        loading: true,
        page: 1,
        hasNextPage: true,
        isLoadingMore: false,
        showFilterModal: false,
        showPeriodModal: false,
        showScaleModal: false,
        showRegionModal: false,
      });
      const {getExhibitionList} = this.props;
      const {filter, period, scale, region} = this.state;
      const exhibitions = await getExhibitionList(
        'all',
        filter,
        period.value,
        scale.value,
        region.value,
      );
      this.setState({
        exhibitions,
        loading: false,
      });
    }
  };

  _exhibitionMore = async () => {
    const {getExhibitionListMore} = this.props;
    const {
      page,
      hasNextPage,
      isLoadingMore,
      filter,
      period,
      scale,
      region,
    } = this.state;
    if (hasNextPage) {
      if (!isLoadingMore) {
        await this.setState({
          isLoadingMore: true,
        });
        const result = await getExhibitionListMore(
          'all',
          filter,
          period.value,
          scale.value,
          region.value,
          page + 1,
        );
        if (result) {
          await this.setState({
            page: this.state.page + 1,
            isLoadingMore: false,
            exhibitions: [...this.state.exhibitions, ...result],
          });
        } else {
          this.setState({
            isLoadingMore: false,
            hasNextPage: false,
          });
        }
      }
    }
  };

  _refresh = async () => {
    const {getExhibitionList} = this.props;
    const {filter, period, scale, region} = this.state;
    this.setState({
      refreshing: true,
      isLoadingMore: false,
      page: 1,
      hasNextPage: true,
    });

    const exhibitions = await getExhibitionList(
      'all',
      filter,
      period.value,
      scale.value,
      region.value,
    );
    this.setState({
      exhibitions,
      refreshing: false,
    });
  };

  _openFilterModal = () => {
    this.setState({
      showFilterModal: true,
      showPeriodModal: false,
      showScaleModal: false,
      showRegionModal: false,
    });
  };

  _closeFilterModal = () => {
    this.setState({
      showFilterModal: false,
      showPeriodModal: false,
      showScaleModal: false,
      showRegionModal: false,
    });
  };

  _openPeriodModal = () => {
    this.setState({
      showFilterModal: false,
      showPeriodModal: true,
      showScaleModal: false,
      showRegionModal: false,
    });
  };

  _closePeriodModal = () => {
    this.setState({
      showFilterModal: false,
      showPeriodModal: false,
      showScaleModal: false,
      showRegionModal: false,
    });
  };

  _openScaleModal = () => {
    this.setState({
      showFilterModal: false,
      showPeriodModal: false,
      showScaleModal: true,
      showRegionModal: false,
    });
  };

  _closeScaleModal = () => {
    this.setState({
      showFilterModal: false,
      showPeriodModal: false,
      showScaleModal: false,
      showRegionModal: false,
    });
  };

  _openRegionModal = () => {
    this.setState({
      showFilterModal: false,
      showPeriodModal: false,
      showScaleModal: false,
      showRegionModal: true,
    });
  };

  _closeRegionModal = () => {
    this.setState({
      showFilterModal: false,
      showPeriodModal: false,
      showScaleModal: false,
      showRegionModal: false,
    });
  };

  _handleFilterChange = filter => {
    this.setState({
      filter,
    });
  };

  _handlePeriodChange = period => {
    this.setState({
      period,
    });
  };

  _handleScaleChange = scale => {
    this.setState({
      scale,
    });
  };

  _handleRegionChange = region => {
    this.setState({
      region,
    });
  };

  render() {
    return (
      <AllExhibitionScreen
        {...this.props}
        {...this.state}
        openFilterModal={this._openFilterModal}
        closeFilterModal={this._closeFilterModal}
        openPeriodModal={this._openPeriodModal}
        closePeriodModal={this._closePeriodModal}
        openScaleModal={this._openScaleModal}
        closeScaleModal={this._closeScaleModal}
        openRegionModal={this._openRegionModal}
        closeRegionModal={this._closeRegionModal}
        handleFilterChange={this._handleFilterChange}
        handlePeriodChange={this._handlePeriodChange}
        handleScaleChange={this._handleScaleChange}
        handleRegionChange={this._handleRegionChange}
        exhibitionMore={this._exhibitionMore}
        refresh={this._refresh}
      />
    );
  }
}

export default Container;
