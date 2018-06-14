'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
  View
} from 'react-native';

export default class extends Component {
  static propTypes = {
    sectionId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    component: PropTypes.func,
    updateTag: PropTypes.func
  };

  componentDidMount() {
    this.props.updateTag && this.props.updateTag(this.root, this.props.sectionId);
  }

  render() {
    const Cell = this.props.component;
    return (
      <View ref={(root) => this.root = root}>
        <Cell {...this.props} />
      </View>
    );
  }
}
