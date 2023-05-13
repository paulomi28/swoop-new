import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { icons, COLORS, SIZES, FONTS } from '../constants';
import { ThemeContext } from '../Contexts/ThemeContext';
import { AuthContext } from '../Contexts/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

const AllSwapScreen = ({ navigation }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isDark } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAllSwaps();
  }, [isFocused]);

  const getAllSwaps = async () => {
    setLoading(true);
    console.log('user details ::', JSON.stringify(user));
    try {
      var myHeaders = new Headers();
      myHeaders.append('key', '2b223e5cee713615ha54ac203b24e9a123754yuVT');
      myHeaders.append('token', 'PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo');
      myHeaders.append('Authorization', `Bearer ${user?.token} `);

      var formdata = new FormData();
      formdata.append('user_id', user.user_id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      var res = await fetch(
        'https://client.appmania.co.in/Swoop/api/allSwap',
        requestOptions,
      ).then(async res => await res.json());
      setLoading(false);
      console.log('all swap list response :::', JSON.stringify(res));

      if (res.ResponseCode == 0) return Alert.alert('Error', res.ResponseMsg);

      if (res.ResponseCode == 9) {
        Alert.alert('Error', res.ResponseMsg);
        return navigation.navigate('Login');
      }

      if (res.ResponseCode == 1) {
        console.log('all swap list response :::', JSON.stringify(res.data));
        setSwaps(res.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const openMenuOption = (item: any) => {
    console.log('item :::', item);
    let temp = swaps;
    temp.map((mapItem, mapIndex) => {
      if (mapItem.swap_id === item.swap_id) {
        if (mapItem.checkOpen !== undefined) {
          if (mapItem.checkOpen === true) {
            mapItem.checkOpen = false;
          } else {
            mapItem.checkOpen = true;
          }
        } else {
          temp[mapIndex] = { ...mapItem, checkOpen: true };
        }
      } else {
        if (mapItem.checkOpen !== undefined) {
          mapItem.checkOpen = false;
        }
      }
    });
    console.log('temp :::', JSON.stringify(temp));
    setSwaps([...temp]);
  };

  const decliendApicall = async item => {
    setLoading(true);
    console.log('item :::', item);
    try {
      var myHeaders = new Headers();
      myHeaders.append('key', '2b223e5cee713615ha54ac203b24e9a123754yuVT');
      myHeaders.append('token', 'PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo');
      myHeaders.append('Authorization', `Bearer ${user?.token} `);
      var formdata = new FormData();
      formdata.append('user_id', user.user_id);
      formdata.append('swap_id', item.swap_id);
      formdata.append('status', 'Decline');
      formdata.append('in_return', []);
      formdata.append('return_duty_type', '');
      formdata.append('return_sub_duty_type', '');
      formdata.append('return_flight_sector', '');
      formdata.append('receiver_id', '');
      console.log('formdata :::', JSON.stringify(formdata));

      const response = await fetch(
        'https://client.appmania.co.in/Swoop/api/acceptRejectSwap',
        {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
        },
      );

      console.log('response ::', JSON.stringify(response));
      let responseJson = await response.json();
      if (response.status === 200) {
        console.log('responseJson :::', JSON.stringify(responseJson));
        if (responseJson.ResponseCode === 1) {
          Alert.alert(responseJson.ResponseMsg);
          getAllSwaps();
        } else {
          Alert.alert(responseJson.ResponseMsg);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const acceptSwap = (item: any) => {
    console.log('accept swap item::', item);
    navigation.navigate('InReturnsScreen', {
      type: item.duty_type === 'Off' ? '1' : '',
      val: item,
      screenName: 'allSwap',
    });
  };

  if (loading)
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ActivityIndicator
          size={'large'}
          color={isDark ? COLORS.golden : COLORS.black}
        />
      </View>
    );

  const renderLeftSection = (item: any) => {

    const string = item.status;
    switch (item) {
      case item.in_return.find(e => e.user_id == user.user_id) && item.status === 'Confirmation Pending':
        return (
          <View>
            <Image
              source={isDark ? icons.ic_alert_dark : icons.ic_alert_dark}
              style={{ width: 27, height: 27, marginVertical: SIZES.padding / 8 }}
            />
          </View>
        );
        break;
      // case 'Confirmation Pending':


      case 'Accept':
        return (
          <View>
            <Image
              source={
                isDark ? icons.ic_check_green_dark : icons.ic_check_green_light
              }
              style={{ width: 27, height: 27, marginVertical: SIZES.padding / 8 }}
            />
          </View>
        );

      // case 'rejected':
      //   return (
      //     <View>
      //       <Image
      //         source={
      //           isDark ? icons.ic_check_green_dark : icons.ic_check_green_light
      //         }
      //         style={{width: 27, height: 27, marginVertical: SIZES.padding / 8}}
      //       />
      //     </View>
      //   );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray,
        paddingTop: SIZES.padding * 3,
      }}>
      <View style={{ marginHorizontal: SIZES.padding }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('MySwapScreen')}>
            <Image
              source={
                isDark ? icons.ic_swoop_icon_dark : icons.ic_swoop_icon_light
              }
              style={{ width: 28, height: 28 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: SIZES.padding }}>
          <Text
            style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>
            All Swaps
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: isDark ? COLORS.golden : COLORS.black,
            }}>
            Tuesday, 18th October 2022
          </Text>
        </View>

        <FlatList
          data={swaps}
          contentContainerStyle={{ paddingBottom: 130 }}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity onPress={() => openMenuOption(item)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            ...FONTS.h4,
                            marginVertical: SIZES.padding / 8,
                            color: isDark
                              ? COLORS.lightGolden
                              : COLORS.darkGray,
                          }}>
                          {item.date}
                        </Text>
                        {renderLeftSection(item)}
                      </View>
                      <View
                        style={{
                          // width: SIZES.width * 0.9,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            ...FONTS.h3,
                            marginVertical: SIZES.padding / 8,
                            color: isDark ? COLORS.golden : COLORS.black,
                            fontWeight: '600',
                            flex: 1,
                          }}>
                          {item.duty_type === 'Specific Flight' && item.total_return_name}
                          {item.duty_type === 'Standby' && `STANDBY • ${item.sub_duty_type}`}
                          {item.duty_type === 'Off' && "Off"}
                        </Text>
                        <View
                          style={{
                            marginLeft: SIZES.padding / 2,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flex: 1,
                          }}>
                          <Text
                            style={{
                              fontSize: SIZES.h4,
                              alignSelf: 'flex-start',
                              color: isDark ? COLORS.lightGolden : COLORS.black,
                              flex: 1,
                            }}>

                            {/* {item.return_duty_type === 'Specific Flight'
                              ? item.in_return_total_return_name
                              : item.return_duty_type} */}
                          </Text>
                          {/* <Image
                            source={
                              isDark
                                ? icons.ic_plan_dark
                                : icons.ic_logo_icon_light
                            }
                            style={{
                              width: 16,
                              height: 16,
                              marginHorizontal: SIZES.padding / 4,
                            }}
                          /> */}
                          <Text
                            style={{
                              color: isDark ? COLORS.lightGolden : COLORS.black,
                              flex: 1,
                            }}>
                            {/* {item.in_return.length !== 0
                              ? item.in_return[0].swapReturn.length !== 0
                                ? moment(
                                    item.in_return[0].swapReturn[0].arr_time,
                                  ).format('hh:mm')
                                : 'Not foun'
                              : ''} */}
                            {/* {item.in_return.length !== 0
                              ? item.in_return[0].swapReturn[0].arr_time
                              : ''} */}
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={
                          isDark
                            ? icons.ic_exchange_dark
                            : icons.ic_exchange_light
                        }
                        style={{
                          width: 16,
                          height: 16,
                          marginVertical: SIZES.padding / 8,
                        }}
                      />

                      <Text
                        style={{
                          ...FONTS.h4,
                          marginVertical: SIZES.padding / 8,
                          color: isDark ? COLORS.golden : COLORS.black,
                        }}>
                        {item.return_duty_type === 'Specific Flight' && item.in_return_total_return_name}
                        {item.return_duty_type === 'Standby' && `STANDBY •  ${item.return_sub_duty_type}`}
                        {item.return_duty_type === 'Flight' && `FLIGHT • ${item.return_sub_duty_type} • ${item.return_flight_sectors}`}
                        {item.return_duty_type === 'Off' && "Off"}
                        {/* {item.duty_type.toUpperCase()} */}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {item.checkOpen === true && (
                  <View
                    style={{
                      // width: SIZES.width * 0.9,
                      marginVertical: SIZES.padding,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity onPress={() => decliendApicall(item)}>
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
                          }}>
                          DECLINE
                        </Text>
                        <Image
                          source={
                            isDark ? icons.ic_close_dark : icons.ic_close_light
                          }
                          style={{
                            width: 27,
                            height: 27,
                            marginHorizontal: SIZES.padding,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => acceptSwap(item)}>
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
                          }}>
                          ACCEPT
                        </Text>
                        <Image
                          source={
                            isDark
                              ? icons.ic_check_light_dark
                              : icons.ic_check_light
                          }
                          style={{
                            width: 27,
                            height: 27,
                            marginLeft: SIZES.padding,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: COLORS.darkGray,
                    marginVertical: SIZES.padding / 2,
                  }}
                />
              </>
            );
          }}
        />

        {/* <View
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
              Sat, 22nd Oct 2022
            </Text>
            <View
              style={{
                width: SIZES.width * 0.9,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  marginVertical: SIZES.padding / 8,
                  color: isDark ? COLORS.golden : COLORS.black,
                  fontWeight: '600',
                }}>
                FA0 - BRS - FAO - VLC - FAO
              </Text>
              <View
                style={{
                  marginLeft: SIZES.padding / 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: isDark ? COLORS.lightGolden : COLORS.black}}>
                  13:05z
                </Text>
                <Image
                  source={
                    isDark ? icons.ic_plan_dark : icons.ic_logo_icon_light
                  }
                  style={{
                    width: 16,
                    height: 16,
                    marginHorizontal: SIZES.padding / 4,
                  }}
                />
                <Text
                  style={{color: isDark ? COLORS.lightGolden : COLORS.black}}>
                  22:25z
                </Text>
              </View>
            </View>
            <Image
              source={isDark ? icons.ic_exchange_dark : icons.ic_exchange_light}
              style={{width: 16, height: 16, marginVertical: SIZES.padding / 8}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  marginVertical: SIZES.padding / 8,
                  color: isDark ? COLORS.golden : COLORS.black,
                  fontWeight: '600',
                }}>
                FA0 - BRS - FAO - VLC - FAO
              </Text>
              <View
                style={{
                  marginLeft: SIZES.padding / 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: isDark ? COLORS.lightGolden : COLORS.black}}>
                  13:05z
                </Text>
                <Image
                  source={
                    isDark ? icons.ic_plan_dark : icons.ic_logo_icon_light
                  }
                  style={{
                    width: 16,
                    height: 16,
                    marginHorizontal: SIZES.padding / 4,
                  }}
                />
                <Text
                  style={{color: isDark ? COLORS.lightGolden : COLORS.black}}>
                  22:25z
                </Text>
              </View>
            </View>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default AllSwapScreen;
