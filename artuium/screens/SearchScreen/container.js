import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchScreen from './presenter';

class Container extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
  };

  state = {
    q: '',
    exhibitions: [],
  };

  _handleQChange = async q => {
    this.setState({
      q,
    });
    const result = await this.props.search(q);
    if (result) {
      this.setState({
        exhibitions: result.exhibitions,
      });
    }
  };

  _makeBlank = () => {
    this.setState({
      q: '',
      exhibitions: [],
    });
  };

  render() {
    return (
      <SearchScreen
        {...this.props}
        {...this.state}
        handleQChange={this._handleQChange}
        makeBlank={this._makeBlank}
      />
    );
  }
}

export default Container;
