import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';
import {ThemeContext} from '../Contexts/ThemeContext';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {AuthContext} from '../Contexts/AuthContext';

const MySwapDetailsScreen = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [data, setData] = useState(null);
  const [swaplist, setSwaplist] = useState([]);
  console.log('props.route.params :::', JSON.stringify(props.route.params));

  const {isDark} = useContext(ThemeContext);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    setData(props.route.params.data);
    setSwaplist(props.route.params.data.in_return);
  }, [isFocused]);

  const openDetails = item => {
    let temp = swaplist;
    temp.map((mapItem, mapIndex) => {
      if (mapItem.user_id === item.user_id) {
        if (mapItem.checkOpen !== undefined) {
          if (mapItem.checkOpen === true) {
            mapItem.checkOpen = false;
          } else {
            mapItem.checkOpen = true;
          }
        } else {
          temp[mapIndex] = {...mapItem, checkOpen: true};
        }
      }
    });
    setSwaplist([...temp]);
  };

  const decliendSwapApicall = async (item: any) => {
    setLoading(true);
    console.log('item :::', item);
    try {
      var myHeaders = new Headers();
      myHeaders.append('key', '2b223e5cee713615ha54ac203b24e9a123754yuVT');
      myHeaders.append('token', 'PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo');
      myHeaders.append('Authorization', `Bearer ${user?.token} `);
      var formdata = new FormData();
      formdata.append('user_id', user.user_id);
      formdata.append('swap_id', data.swap_id);
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
        setLoading(false);
        if (responseJson.ResponseCode === 1) {
          Alert.alert(responseJson.ResponseMsg);
          props.navigation.goBack();
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

  const acceptSwapApicall = async (item: any) => {
    console.log('item ::::', item);
    setLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append('key', '2b223e5cee713615ha54ac203b24e9a123754yuVT');
      myHeaders.append('token', 'PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo');
      myHeaders.append('Authorization', `Bearer ${user?.token} `);
      var formdata = new FormData();
      formdata.append('user_id', user.user_id);
      formdata.append('swap_id', data.swap_id);
      formdata.append('status', 'Accept');
      formdata.append('in_return', JSON.stringify(item.in_return));
      formdata.append('return_duty_type', item.return_duty_type);
      formdata.append('return_sub_duty_type', item.return_sub_duty_type);
      formdata.append('return_flight_sector', item.return_flight_sector);
      formdata.append('receiver_id', item.user_id);
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
          props.navigation.goBack();
        } else {
          Alert.alert(responseJson.ResponseMsg);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    // Alert.alert('acceptSwapApicall');
  };

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray,
        }}>
        <ActivityIndicator
          size={'large'}
          color={isDark ? COLORS.golden : COLORS.black}
        />
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray,
        paddingTop: SIZES.padding * 3,
      }}>
      {data !== null && (
        <View style={{marginHorizontal: SIZES.padding}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                source={isDark ? icons.ic_back_dark : icons.ic_back_light}
                style={{width: 28, height: 28}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: SIZES.padding}}>
            <Text
              style={{
                ...FONTS.h1,
                color: isDark ? COLORS.golden : COLORS.black,
              }}>
              My Swaps
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: isDark ? COLORS.golden : COLORS.black,
              }}>
              Tuesday, 18th October 2022
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              {/* <View> */}
              <Text
                style={{
                  ...FONTS.h4,
                  marginVertical: SIZES.padding / 8,
                  color: isDark ? COLORS.lightGolden : COLORS.darkGray,
                }}>
                {data.date}
                {/* Sun, 23nd Oct 2022 */}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    ...FONTS.h3,
                    marginVertical: SIZES.padding / 8,
                    color: isDark ? COLORS.golden : COLORS.black,
                    fontWeight: '600',
                  }}>
                  {data.duty_type === 'Specific Flight'
                    ? data.total_return_name
                    : data.duty_type}

                  {/* {data.in_return.length !== 0
                  ? data.in_return[0].in_return_name !== ''
                    ? data.in_return[0].in_return_name
                    : data.in_return[0].return_duty_type !== ''
                    ? data.in_return[0].return_duty_type
                    : ''
                  : ''} */}
                </Text>
                {data.duty_type && (
                  <>
                    <View
                      style={{
                        marginLeft: 10,
                        marginRight: 3,
                        width: SIZES.base,
                        height: SIZES.base,
                        borderRadius: SIZES.base,
                        backgroundColor: COLORS.bgBlack,
                      }}
                    />
                    <Text
                      style={{
                        ...FONTS.h4,
                        marginVertical: SIZES.padding / 8,
                        color: isDark ? COLORS.golden : COLORS.black,
                      }}>
                      {data.duty_type}
                    </Text>
                  </>
                )}
              </View>
              <Image
                source={
                  isDark ? icons.ic_exchange_dark : icons.ic_exchange_light
                }
                style={{
                  width: 16,
                  height: 16,
                  marginVertical: SIZES.padding / 8,
                }}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    ...FONTS.h4,
                    marginVertical: SIZES.padding / 8,
                    color: isDark ? COLORS.golden : COLORS.black,
                  }}>
                  {data.return_duty_type === 'Specific Flight'
                    ? data.in_return_total_return_name
                    : data.return_duty_type}
                  {/* {data.return_duty_type} */}
                </Text>
                {data.return_sub_duty_type && (
                  <>
                    <View
                      style={{
                        marginLeft: 10,
                        marginRight: 3,
                        width: SIZES.base,
                        height: SIZES.base,
                        borderRadius: SIZES.base,
                        backgroundColor: COLORS.bgBlack,
                      }}
                    />
                    <Text
                      style={{
                        ...FONTS.h4,
                        marginVertical: SIZES.padding / 8,
                        color: isDark ? COLORS.golden : COLORS.black,
                      }}>
                      {data.return_sub_duty_type}
                    </Text>
                  </>
                )}

                {data.return_flight_sectors !== '' && (
                  <>
                    <View
                      style={{
                        marginLeft: 10,
                        marginRight: 3,
                        width: SIZES.base,
                        height: SIZES.base,
                        borderRadius: SIZES.base,
                        backgroundColor: COLORS.bgBlack,
                      }}
                    />
                    <Text
                      style={{
                        ...FONTS.h4,
                        marginVertical: SIZES.padding / 8,
                        color: isDark ? COLORS.golden : COLORS.black,
                      }}>
                      {data.return_flight_sectors}
                    </Text>
                  </>
                )}
              </View>
            </View>
            <View style={{flex: 0.3, marginHorizontal: 20}}>
              <Image
                source={isDark ? icons.ic_alert_dark : icons.ic_alert_light}
                style={{
                  width: 27,
                  height: 27,
                  marginVertical: SIZES.padding / 8,
                }}
              />
            </View>
          </View>
          <View
            style={{
              minHeight: Dimensions.get('window').height / 5,
              maxHeight: Dimensions.get('window').height / 2,
            }}>
            {swaplist.length !== 0 && (
              <FlatList
                data={swaplist}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: SIZES.padding,
                        }}
                        onPress={() => {
                          if (item.user_id !== user.user_id) {
                            openDetails(item);
                          } else {
                            Alert.alert('Same user_id is not acceptable.');
                          }
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: SIZES.base,
                              height: SIZES.base,
                              borderRadius: SIZES.base,
                              backgroundColor: COLORS.white,
                            }}
                          />
                          <Text
                            style={{
                              ...FONTS.h4,
                              color: isDark ? COLORS.lightBlue : COLORS.red,
                              marginLeft: SIZES.padding,
                              flex: 1,
                            }}>
                            {item.return_duty_type !== ''
                              ? item.return_duty_type
                              : item.return_duty_type !== ''
                              ? item.return_duty_type
                              : ''}
                          </Text>
                        </View>

                        {/* <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              color: isDark ? COLORS.lightBlue : COLORS.red,
                              flex: 1,
                            }}>
                            {item.swapReturn.length !== 0
                              ? moment(item.swapReturn[0].dep_time).format(
                                  'hh:mm',
                                )
                              : '`'}
                            z
                          </Text>
                          <Image
                            source={
                              isDark
                                ? icons.ic_plan_blue_dark
                                : icons.ic_plan_red_light
                            }
                            style={{
                              width: 24,
                              height: 24,
                              marginHorizontal: SIZES.padding / 2,Ï
                            }}
                          />
                          <Text
                            style={{
                              color: isDark ? COLORS.lightBlue : COLORS.red,
                              flex: 1,
                            }}>
                            {item.swapReturn.length !== 0
                              ? moment(
                                  item.swapReturn[item.swapReturn.length - 1]
                                    .arr_time,
                                ).format('hh:mm')
                              : ''}
                            z
                          </Text>
                        </View> */}
                      </TouchableOpacity>

                      {/* inner swapReturn sublist  */}

                      {item.checkOpen && (
                        <View
                          style={{
                            marginVertical: SIZES.padding / 2,
                            marginLeft: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            onPress={() => decliendSwapApicall(item)}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  ...FONTS.h3,
                                  fontWeight: '500',
                                  color: isDark
                                    ? COLORS.lightGolden
                                    : COLORS.black,
                                }}>
                                DECLINE
                              </Text>
                              <Image
                                source={
                                  isDark
                                    ? icons.ic_close_dark
                                    : icons.ic_close_light
                                }
                                style={{
                                  width: 27,
                                  height: 27,
                                  marginHorizontal: SIZES.padding,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => acceptSwapApicall(item)}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  ...FONTS.h3,
                                  fontWeight: '500',
                                  color: isDark
                                    ? COLORS.lightGolden
                                    : COLORS.black,
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
                                  marginHorizontal: SIZES.padding,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  );
                }}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default MySwapDetailsScreen;
