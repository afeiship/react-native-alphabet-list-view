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
import style from './style';


export default class extends Component {
  static propTypes = {
    items: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    items: [],
    onChange: noop
  };

  templateItem = ({ item, index }) => {
    const { value } = this.props;
    const itemStyle = item.phoneCode === value ? nx.mix(style.item, { color: '#007AFF' }) : style.item;
    return (
      <TouchableHighlight onPress={this._onPressItem.bind(this, item)}>
        <Text
          style={[$style.bg_f, itemStyle]}
          key={index}>
          {item.countryName}({item.phoneCode})
        </Text>
      </TouchableHighlight>
    );
  };

  templateHeader = ({ section: { title } }) => {
    return (
      <Text style={style.header}>{title}</Text>
    );
  };

  _onPressItem = (inItem) => {
    const { onChange } = this.props;
    onChange({ target:{ value: inItem }});
  };

  _onPressText = (inIndex) => {
    this._list.scrollToLocation({
      animated: true,
      itemIndex: -1,
      sectionIndex: inIndex
    });
  };

  render() {
    const letters = items.map(item => item.title);
    return (
      <View style={$style.center}>
        <View style={[$style.rel, $style.z2, style.left]}>
          <SectionList
            onScrollToIndexFailed={nx.noop}
            stickyHeaderIndices
            ref={(list) => this._list = list}
            stickySectionHeadersEnabled={true}
            renderItem={this.templateItem}
            renderSectionHeader={this.templateHeader}
            sections={items}
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
            style.right
          ]}>
          {
            letters.map((item, index) => {
              return (
                <TouchableOpacity key={item}
                  onPress={this._onPressText.bind(this, index)}>
                  <Text style={[$style.tc, style.lettter]}>{item}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }
}
