import React, { useContext, useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import { icons, COLORS, SIZES, FONTS } from '../constants';
import { ThemeContext } from '../Contexts/ThemeContext';
import { AuthContext } from '../Contexts/AuthContext';
import OneSwap from '../Components/OneSwap';
import { useIsFocused } from '@react-navigation/native';

const MySwapScreen = ({ navigation }: any) => {
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
        'https://client.appmania.co.in/Swoop/api/mySwap',
        requestOptions,
      ).then(async res => await res.json());
      setLoading(false);
      if (res.ResponseCode == 0) return Alert.alert('Error', res.ResponseMsg);

      if (res.ResponseCode == 9) {
        Alert.alert('Error', res.ResponseMsg);
        return navigation.navigate('Login');
      }

      if (res.ResponseCode == 1) {
        console.log('response :::', JSON.stringify(res.data));
        setSwaps(res.data);
      }
    } catch (error) {
      setLoading(false);
      console.log('error :::', error);
      Alert.alert('Error', 'Something went wrong');
    }
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

  const renderLeftSection = (string: string) => {
    switch (string) {
      case 'pending':
        break;
      case 'Confirmation Pending':
        return (
          <View>
            <Image
              source={isDark ? icons.ic_alert_dark : icons.ic_alert_dark}
              style={{ width: 27, height: 27, marginVertical: SIZES.padding / 8 }}
            />
          </View>
        );

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

      case 'rejected':
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

  const deleteSwap = async (item: any) => {
    console.log('swap details :::', JSON.stringify(item));
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

      const response = await fetch(
        'https://client.appmania.co.in/Swoop/api/deleteSwap',
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
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateSwapScreen')}>
            <Image
              source={isDark ? icons.ic_plus_dark : icons.ic_plus_light}
              style={{ width: 28, height: 28 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: SIZES.padding }}>
          <Text
            style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>
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

        {/* <View style={{minHeight: Dimensions.get('window').height / 2}}> */}
        <FlatList
          data={swaps}
          contentContainerStyle={{ paddingBottom: 130 }}
          keyExtractor={(item: any) => item.swap_id}
          renderItem={({ item }) => {
            // <OneSwap item={item} />
            return (
              <>
                <View key={item.swap_id}>
                  <TouchableOpacity
                    onPress={() => {
                      item.status === 'Accept'
                        ? openMenuOption(item)
                        : item.status === 'Confirmation Pending'
                          ? navigation.navigate('MySwapDetails', { data: item })
                          : {};
                    }}>
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
                            color: isDark
                              ? COLORS.lightGolden
                              : COLORS.darkGray,
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
                          {item.duty_type === 'Specific Flight' && item.total_return_name}
                          {item.duty_type === 'Standby' && `STANDBY ${item.sub_duty_type}`}
                          {item.duty_type === 'Off' && "Off"}

                          {/* : item.duty_type */}
                          {/* {item.in_return.length !== 0
                            ? item.in_return[0].in_return_name !== ''
                              ? item.in_return[0].in_return_name
                              : item.in_return[0].return_duty_type
                            : 'Not Found'} */}
                        </Text>
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
                      {renderLeftSection(item.status)}
                    </View>
                    {item.checkOpen === true && (
                      <TouchableOpacity
                        style={{
                          marginVertical: SIZES.padding,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        onPress={() => deleteSwap(item)}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                            }}>
                            <Image
                              source={
                                isDark
                                  ? icons.ic_user_blue_dark
                                  : icons.ic_user_blue_light
                              }
                              style={{ width: 27, height: 27 }}
                            />
                            <Text
                              style={{
                                ...FONTS.h3,
                                color: COLORS.blue,
                                fontWeight: '500',
                                marginHorizontal: SIZES.padding / 2,
                              }}>
                              {item.receiver_details.username}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-around',
                            }}>
                            <Text
                              style={{
                                ...FONTS.h3,
                                color: isDark
                                  ? COLORS.lightGolden
                                  : COLORS.black,
                                fontWeight: '500',
                                marginHorizontal: SIZES.padding / 2,
                              }}>
                              DELETE
                            </Text>
                            <Image
                              source={
                                isDark
                                  ? icons.ic_close_dark
                                  : icons.ic_close_light
                              }
                              style={{ width: 27, height: 27 }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: isDark
                        ? COLORS.lightGolden
                        : COLORS.darkGray,
                      marginVertical: SIZES.padding / 2,
                    }}></View>
                </View>
              </>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: COLORS.black, fontSize: 20 }}>
                  Not found any swoop
                </Text>
              </View>
            );
          }}
        />
        {/* </View> */}
      </View>
    </View>
  );
};

export default MySwapScreen;
