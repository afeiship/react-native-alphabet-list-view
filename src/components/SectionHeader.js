'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { View, Text } from 'react-native';
import noop from 'noop';

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
    const SectionComponent = this.props.component;
    const children = SectionComponent ? <SectionComponent {...this.props} /> : <Text>{this.props.title}</Text>;

    return (
      <View ref={(root) => this.root = root} children={children} />
    );
  }
}
