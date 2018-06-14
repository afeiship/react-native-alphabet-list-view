'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
  StyleSheet,
  View,
  Text,
  NativeModules,
} from 'react-native';
import nx from 'next-js-core2';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    right: 5,
    top: 0,
    bottom: 0
  },
  item: {
    padding: 0
  },

  text: {
    fontWeight: '700',
    color: '#008fff'
  },

  inactivetext: {
    fontWeight: '700',
    color: '#CCCCCC'
  }
});


export default class SectionList extends Component {

  static propTypes = {
    component: PropTypes.func,
    getSectionListTitle: PropTypes.func,
    onSectionSelect: PropTypes.func,
    sections: PropTypes.array.isRequired,
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]),
    fontStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ])
  };

  constructor(props, context) {
    super(props, context);

    this.onSectionSelect = this.onSectionSelect.bind(this);
    this.resetSection = this.resetSection.bind(this);
    this.detectAndScrollToSection = this.detectAndScrollToSection.bind(this);
    this.lastSelectedIndex = null;
  }

  onSectionSelect(sectionId, fromTouch) {
    this.props.onSectionSelect && this.props.onSectionSelect(sectionId);

    if (!fromTouch) {
      this.lastSelectedIndex = null;
    }
  }

  resetSection() {
    this.lastSelectedIndex = null;
  }

  detectAndScrollToSection(e) {
    const ev = e.nativeEvent.touches[0];
    const targetY = ev.pageY;
    const { y, width, height } = this.measure;
    const index = (Math.floor(ev.locationY / height));
    if (index >= this.props.sections.length) {
      return;
    }
    const sectionData = this.props.data[this.props.sections[index]];
    if (this.lastSelectedIndex !== index && sectionData && sectionData.length) {
      this.lastSelectedIndex = index;
      this.onSectionSelect(this.props.sections[index - 1], true);
    }
  }

  fixSectionItemMeasure() {
    const sectionItem = this.refs.sectionItem0;
    if (!sectionItem) {
      return;
    }
    this.measureTimer = setTimeout(() => {
      sectionItem.measure((x, y, width, height, pageX, pageY) => {
        this.measure = {
          y: pageY,
          width,
          height
        };
      })
    }, 0);
  }

  componentDidMount() {
    this.fixSectionItemMeasure();
  }

  // fix bug when change data
  componentDidUpdate() {
    this.fixSectionItemMeasure();
  }

  componentWillUnmount() {
    this.measureTimer && clearTimeout(this.measureTimer);
  }

  render() {
    const SectionComponent = this.props.component;
    const sections = this.props.sections.map((section, index) => {
      const title = this.props.getSectionListTitle ?
        this.props.getSectionListTitle(section) :
        section;

      const textStyle = this.props.data[section].length ?
        styles.text :
        styles.inactivetext;

      const child = SectionComponent ?
        <SectionComponent
          sectionId={section}
          title={title}
        /> :
        <View
          style={styles.item}>
          <Text style={[textStyle, this.props.fontStyle]}>{title}</Text>
        </View>;

      return (
        <View key={index} ref={'sectionItem' + index} pointerEvents="none">
          {child}
        </View>
      );
    });

    return (
      <View style={[styles.container, this.props.style]}
        onStartShouldSetResponder={nx.returnTrue}
        onMoveShouldSetResponder={nx.returnTrue}
        onResponderGrant={this.detectAndScrollToSection}
        onResponderMove={this.detectAndScrollToSection}
        onResponderRelease={this.resetSection}
      >
        {sections}
      </View>
    );
  }
}
