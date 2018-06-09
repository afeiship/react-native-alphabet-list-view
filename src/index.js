import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList
} from 'react-native';
import noop from 'noop';
import PropTypes from 'prop-types';
import $style from 'react-native-stylekit';
import styles from './styles';


export default class extends Component {
  static defaultProps = {};

  get templateItem(inItem, inIndex) {
    return (
      <TouchableHighlight onPress={this._onPress.bind(this, inItem)}>
        <Text style={[$style.bg_f, styles.item]} key={inIndex}>{inItem.countryName}({inItem.phoneCode})</Text>
      </TouchableHighlight>
    );
  }

  get templateHeader(inItem) {
    return (
      <View>
        <Text>{inItem.title}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={$style.center}>
        <View style={[$style.rel, $style.z2, styles.left]}>
          <SectionList
            onScrollToIndexFailed={nx.noop}
            stickyHeaderIndices
            ref={(sec) => this._sec = sec}
            stickySectionHeadersEnabled={true}
            renderItem={this.templateItem}
            renderSectionHeader={this.templateHeader}
            sections={sections}
            keyExtractor={(item) => item.countryCode}
          />
        </View>
        <View
          style={[
            $style.abs,
            $style.z2,
            $style.r0,
            $style.t0,
            $style.b0,
            $style.col,
            $style.center,
            styles.right
          ]}>
          {
            letters.map((item, index) => {
              return (
                <TouchableOpacity key={item}
                  onPress={this._onPressText.bind(this, index)}>
                  <Text style={[$style.tc, styles.lettter]}>{item}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }
}
