import React, {useContext, useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import {ThemeContext} from '../Contexts/ThemeContext';
import {AuthContext} from '../Contexts/AuthContext';

export default function OneSwap({item}: any) {
  const {isDark} = useContext(ThemeContext);
  const {user} = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const renderLeftSection = (string: string) => {
    switch (string) {
      case 'pending':
        break;

      case 'accepted':
        return (
          <View>
            <Image
              source={
                isDark ? icons.ic_check_green_dark : icons.ic_check_green_light
              }
              style={{width: 27, height: 27, marginVertical: SIZES.padding / 8}}
            />
          </View>
        );

      case 'rejected':
        return (
          <View>
            <Image
              source={
                isDark ? icons.ic_check_green_dark : icons.ic_check_green_light
              }
              style={{width: 27, height: 27, marginVertical: SIZES.padding / 8}}
            />
          </View>
        );
    }
  };
  // console.log('item :', item);
  return (
    <View key={item.swap_id}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                ...FONTS.h4,
                marginVertical: SIZES.padding / 8,
                color: isDark ? COLORS.lightGolden : COLORS.darkGray,
              }}>
              {item.date}
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                marginVertical: SIZES.padding / 8,
                color: isDark ? COLORS.golden : COLORS.black,
                fontWeight: '600',
              }}>
              {item.in_return.length !== 0
                ? item.in_return[0].in_return_name
                : 'Not Found'}
            </Text>
            <Image
              source={isDark ? icons.ic_exchange_dark : icons.ic_exchange_light}
              style={{width: 16, height: 16, marginVertical: SIZES.padding / 8}}
            />
            <Text
              style={{
                ...FONTS.h4,
                marginVertical: SIZES.padding / 8,
                color: isDark ? COLORS.golden : COLORS.black,
              }}>
              {item.duty_type.toUpperCase()}
            </Text>
          </View>
          {renderLeftSection(item.status.toLowerCase())}
        </View>
        {isOpen && (
          <View
            style={{
              marginVertical: SIZES.padding,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Image
                  source={
                    isDark ? icons.ic_user_blue_dark : icons.ic_user_blue_light
                  }
                  style={{width: 27, height: 27}}
                />
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.blue,
                    fontWeight: '500',
                    marginHorizontal: SIZES.padding / 2,
                  }}>
                  ESTIMP
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: isDark ? COLORS.lightGolden : COLORS.black,
                    fontWeight: '500',
                    marginHorizontal: SIZES.padding / 2,
                  }}>
                  DELETE
                </Text>
                <Image
                  source={isDark ? icons.ic_close_dark : icons.ic_close_light}
                  style={{width: 27, height: 27}}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray,
          marginVertical: SIZES.padding / 2,
        }}></View>
    </View>
  );
}
