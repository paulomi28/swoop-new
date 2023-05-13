import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { ThemeContext } from '../Contexts/ThemeContext';
import { AuthContext } from '../Contexts/AuthContext';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

const dropDownOptions = [
  {
    key: '1',
    option: 'Off',
  },
  {
    key: '2',
    option: 'Standby',
  },
  {
    key: '3',
    option: 'Flight',
  },
  {
    key: '4',
    option: 'Specific Flight',
  },
];

const Standby = [
  {
    key: '1',
    option: 'Earlies',
    sub_option: { startTime: '13:00z', Duration: '10:00 hr', endTime: '23:00z' },
  },
  {
    key: '2',
    option: 'Latest',
    sub_option: { startTime: '10:00z', Duration: '10:00 hr', endTime: '20:00z' },
  },
];
const Flight = [
  {
    key: '1',
    option: 'Earlies',
    sub_option: [
      {
        key: '1',
        option: '1 sectors',
      },
      {
        key: '2',
        option: '2 sectors',
      },
      {
        key: '3',
        option: '3 sectors',
      },
      {
        key: '4',
        option: '4 sectors',
      },
    ],
  },
  {
    key: '2',
    option: 'Latest',
    sub_option: [
      {
        key: '1',
        option: '1 sectors',
      },
      {
        key: '2',
        option: '2 sectors',
      },
      {
        key: '3',
        option: '3 sectors',
      },
      {
        key: '4',
        option: '4 sectors',
      },
    ],
  },
];

export default function InReturns(props: any) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedDutyType, setSelectedDutyType] = useState('');
  const [subDutyType, setSubDutyType] = useState('');
  const [subFlight, setSubFlight] = useState('');
  const { isDark } = useContext(ThemeContext);
  const [propsVal, setPropsVal] = useState();
  const [loading, setLoading] = useState(false);
  const [searchFlight, setSearchFlight] = useState('');
  const [totalFlights, setTotalFlights] = useState([]);
  const [comment, setComment] = useState('');
  const [screenName, setScreenName] = useState('');

  console.log('in return screen props ::', props.route.params);

  const isFocused = useIsFocused();

  const { user } = useContext(AuthContext);
  useEffect(() => {
    setScreenName(props.route.params.screenName);
    setPropsVal(props.route.params.val);
    setSelectedDutyType('');
    setSubDutyType('');
    setSubFlight('');
    setSearchFlight('');
    setComment('');
    setTotalFlights([]);
  }, [isFocused]);

  const getFlight = async () => {
    console.log('user:::', user);

    if (searchFlight === '') {
      Alert.alert('Alert', 'Please enter flight iata');
      return;
    }
    console.log('totalFlights::', totalFlights);
    if (totalFlights.find(e => e.flight_iata == searchFlight)) {
      Alert.alert('Alert', 'Flight already added');
      return;
    }


    setLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append('key', '2b223e5cee713615ha54ac203b24e9a123754yuVT');
      myHeaders.append('token', 'PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo');
      myHeaders.append('Authorization', `Bearer ${user?.token} `);

      var formdata = new FormData();
      formdata.append('user_id', user.user_id);
      formdata.append('flight_iata', searchFlight);

      const response = await fetch(
        'https://client.appmania.co.in/Swoop/api/singleFlightDetails',
        {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
        },
      );

      let responseJson = await response.json();
      console.log('response::', JSON.stringify(responseJson));
      if (response.status === 200) {
        if (responseJson.ResponseCode === 1) {
          let temp = totalFlights;
          temp.push({
            flight_iata: responseJson.data[0].flight_iata,
            dep_iata: responseJson.data[0].dep_iata,
            dep_time: responseJson.data[0].dep_time,
            duration: responseJson.data[0].duration,
            arr_iata: responseJson.data[0].arr_iata,
            arr_time: responseJson.data[0].arr_time,
          });
          // console.log('temp::', JSON.stringify(temp));
          setTotalFlights([...temp]);
          setSearchFlight('');
          return
        }
        if (responseJson.ResponseCode === 0) {
          Alert.alert('Alert', 'Please enter correct flight iata');
          setSearchFlight('');
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error::', 'Please enter correct flight_iata');
      setTotalFlights([]);
    }
  };

  // if (loading)
  //   return (
  //     <View
  //       style={{
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         flex: 1,
  //       }}>
  //       <ActivityIndicator
  //         size={'large'}
  //         color={isDark ? COLORS.golden : COLORS.black}
  //       />
  //     </View>
  //   );

  const createSwoopApicall = async () => {

    setLoading(true);
    if (selectedDutyType !== '') {
      try {
        var myHeaders = new Headers();
        myHeaders.append('key', '2b223e5cee713615ha54ac203b24e9a123754yuVT');
        myHeaders.append('token', 'PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo');
        myHeaders.append('Authorization', `Bearer ${user?.token} `);

        var formdata = new FormData();
        formdata.append('user_id', user.user_id);
        formdata.append('date', propsVal.date);
        formdata.append('duty_type', propsVal.duty_type);
        formdata.append('sub_duty_type', propsVal.sub_duty_type);
        formdata.append('flight_sectors', propsVal.flight_sectors);
        formdata.append('from_time', propsVal.from_time);
        formdata.append('to_time', propsVal.to_time);
        formdata.append('duration', propsVal.duration);
        formdata.append('comments', comment);
        formdata.append(
          'total_flights',
          JSON.stringify(propsVal.total_flights),
        );

        formdata.append(
          'return_duty_type',
          selectedDutyType !== ''
            ? dropDownOptions[selectedDutyType - 1].option
            : '',
        );
        formdata.append(
          'return_sub_duty_type',
          selectedDutyType !== '' && subDutyType !== ''
            ? subDutyType === '2'
              ? 'Latets'
              : 'Earlies'
            : '',
        );

        formdata.append('return_flight_sectors', subFlight !== '' ? Flight[subDutyType - 1].sub_option[subFlight - 1].option : '');

        formdata.append(
          'return_from_time',
          subDutyType !== ''
            ? subDutyType === '1'
              ? '13:00:00'
              : '23:00:00'
            : '',
        );
        formdata.append(
          'return_to_time',
          subDutyType !== ''
            ? subDutyType === '1'
              ? '20:00:00'
              : '20:00:00'
            : '',
        );
        formdata.append(
          'return_duration',
          selectedDutyType !== '' && selectedDutyType === '2' ? '10:00:00' : '',
        );
        formdata.append('in_return', JSON.stringify(totalFlights));
        console.log('selectedDutyType ::', selectedDutyType);
        console.log('subDutyType ::', subDutyType);
        console.log('FormData :::', JSON.stringify(formdata));

        const response = await fetch(
          'https://client.appmania.co.in/Swoop/api/createSwap',
          {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
          },
        );

        console.log('response ::::', JSON.stringify(response));
        let responseJson = await response.json();
        if (response.status === 200) {
          if (responseJson.ResponseCode === 1) {
            setTimeout(() => {
              setLoading(false);
              props.navigation.navigate('MySwapScreen');
            }, 1000);
          }
        }
        setLoading(false);
        setSelectedDutyType('');
        setSubFlight('');
        setSubDutyType('');
        setTotalFlights([]);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      Alert.alert('please select duty type.');
    }
  };

  const acceptSwap = async () => {
    setLoading(true);
    // console.log('propsVal ::', JSON.stringify(propsVal));
    if (selectedDutyType !== '') {
      try {
        var myHeaders = new Headers();
        myHeaders.append('key', '2b223e5cee713615ha54ac203b24e9a123754yuVT');
        myHeaders.append('token', 'PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo');
        myHeaders.append('Authorization', `Bearer ${user?.token} `);
        var formdata = new FormData();
        formdata.append('user_id', user.user_id);
        formdata.append('swap_id', propsVal.swap_id);
        formdata.append('status', 'Confirmation Pending');
        formdata.append(
          'in_return',
          totalFlights.length !== 0 ? JSON.stringify(totalFlights) : '',
        );
        formdata.append(
          'return_duty_type',
          selectedDutyType !== ''
            ? dropDownOptions[selectedDutyType - 1].option
            : '',
        );
        formdata.append(
          'return_sub_duty_type',
          selectedDutyType !== '' && subDutyType !== ''
            ? subDutyType === '2'
              ? 'Latets'
              : 'Earlies'
            : '',
        );
        formdata.append(
          'return_flight_sector',
          subFlight !== ''
            ? Flight[subDutyType - 1].sub_option[subFlight - 1].option
            : '',
        );
        console.log('formdata :::', JSON.stringify(formdata.in_return));

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
            props.navigation.navigate('MySwapScreen');
          } else {
            Alert.alert(responseJson.ResponseMsg);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView
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
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack(), setSelectedDutyType('');
              setSubFlight('');
              setSubDutyType('');
              setTotalFlights([]);
            }}>
            <Image
              source={isDark ? icons.ic_back_dark : icons.ic_back_light}
              style={{ width: 28, height: 28 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (screenName === 'CreateSwapScreen') {
                createSwoopApicall();
              } else if (screenName === 'allSwap') {
                acceptSwap();
              }
            }}>
            <Image
              source={isDark ? icons.ic_check_dark : icons.ic_check_light}
              style={{ width: 28, height: 28 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: SIZES.padding }}>
          <Text
            style={{
              ...FONTS.h1,
              color: isDark ? COLORS.golden : COLORS.black,
            }}>
            In Return
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: isDark ? COLORS.golden : COLORS.black,
            }}>
            Tuesday, 18th October 2022
          </Text>
        </View>
      </View>
      <View style={styles.midPart}>
        <View style={styles.form}>
          <TouchableOpacity
            onPress={() => {
              setSelectedDutyType('');
              setSubFlight('');
              setSubDutyType('');
              setTotalFlights([]);
              setDropDownOpen(!dropDownOpen);
            }}
            style={{ ...styles.inputFieldComponent, alignItems: 'center' }}>
            <Image
              source={isDark ? icons.ic_duty_dark : icons.ic_duty_light}
              style={{ width: 27, height: 27 }}
            />
            <Text
              style={{
                color:
                  selectedDutyType === '' ? COLORS.darkGray : COLORS.bgBlack,
                ...FONTS.h3,
                ...styles.inputField,
              }}>
              {selectedDutyType === '1'
                ? dropDownOptions[0].option
                : selectedDutyType === '2'
                  ? dropDownOptions[1].option
                  : selectedDutyType === '3'
                    ? dropDownOptions[2].option
                    : selectedDutyType === '4'
                      ? dropDownOptions[3].option
                      : 'Duty Type'}
            </Text>
            <Image
              source={isDark ? icons.ic_down_dark : icons.ic_down_light}
              style={{
                marginHorizontal: SIZES.padding * 2,
                width: 16,
                height: 16,
              }}
            />
          </TouchableOpacity>
          {dropDownOpen && (
            <View>
              <FlatList
                data={dropDownOptions}
                keyExtractor={i => i.key}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: SIZES.padding / 2,
                      }}>
                      <Text
                        style={{
                          color: isDark ? COLORS.golden : COLORS.black,
                          ...FONTS.h3,
                          marginLeft: SIZES.padding + 27,

                          opacity:
                            item.key === '1'
                              ? props.route.params.type === '1'
                                ? 0.2
                                : 1
                              : 1,
                        }}>
                        {item.option}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedDutyType(item.key), setDropDownOpen(false);
                        }}
                        disabled={
                          item.key === '1'
                            ? props.route.params.type === '1'
                              ? true
                              : false
                            : false
                        }
                        style={{
                          opacity:
                            item.key === '1'
                              ? props.route.params.type === '1'
                                ? 0.2
                                : 1
                              : 1,
                        }}>
                        <Image
                          style={{ width: 27, height: 27 }}
                          source={
                            selectedDutyType !== item.key
                              ? isDark
                                ? icons.ic_check_off_dark
                                : icons.ic_check_off_light
                              : isDark
                                ? icons.ic_check_on_dark
                                : icons.ic_check_on_light
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          )}
          {selectedDutyType === '2' && (
            <FlatList
              data={Standby}
              renderItem={({ item }) => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: SIZES.padding / 2,
                      }}>
                      <Text
                        style={{
                          color: isDark ? COLORS.golden : COLORS.black,
                          ...FONTS.h3,
                          marginLeft: SIZES.padding,
                        }}>
                        {item.option}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setSubDutyType(item.key);
                        }}>
                        <Image
                          style={{ width: 27, height: 27 }}
                          source={
                            subDutyType !== item.key
                              ? isDark
                                ? icons.ic_check_off_dark
                                : icons.ic_check_off_light
                              : isDark
                                ? icons.ic_check_on_dark
                                : icons.ic_check_on_light
                          }
                        />
                      </TouchableOpacity>
                    </View>

                    {item.key === subDutyType && (
                      <View
                        style={{
                          flexDirection: 'row',
                          // backgroundColor: COLORS.golden,
                          flex: 1,
                          marginTop: 5,
                          marginBottom: 15,
                          marginHorizontal: 10,
                          marginLeft: 20,
                          padding: 3,
                          alignItems: 'center',
                          borderRadius: 5,
                        }}>
                        <Text style={{ color: COLORS.bgBlack }}>
                          {item.sub_option.startTime}
                        </Text>

                        <View
                          style={{
                            borderBottomColor: COLORS.darkGray,
                            borderBottomWidth: 1,
                            width: 35,
                            marginHorizontal: 10,
                          }}
                        />
                        <View style={{ alignItems: 'center' }}>
                          <Image
                            source={
                              isDark
                                ? icons.ic_planline_dark
                                : icons.ic_planline_light
                            }
                            style={{ width: 20, height: 20 }}
                          />
                          <Text style={{ color: COLORS.bgBlack, fontSize: 10 }}>
                            Duration: {item.sub_option.Duration}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomColor: COLORS.darkGray,
                            borderBottomWidth: 1,
                            width: 35,
                            marginHorizontal: 10,
                          }}
                        />
                        <Text style={{ color: COLORS.bgBlack }}>
                          {item.sub_option.endTime}
                        </Text>
                      </View>
                    )}
                  </>
                );
              }}
            />
          )}
          {selectedDutyType === '3' && (
            <FlatList
              data={Flight}
              renderItem={({ item }) => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: SIZES.padding / 2,
                      }}>
                      <Text
                        style={{
                          color: isDark ? COLORS.golden : COLORS.black,
                          ...FONTS.h3,
                          marginLeft: SIZES.padding,
                        }}>
                        {item.option}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setSubDutyType(item.key);
                          setSubFlight('');
                        }}>
                        <Image
                          style={{ width: 27, height: 27 }}
                          source={
                            subDutyType !== item.key
                              ? isDark
                                ? icons.ic_check_off_dark
                                : icons.ic_check_off_light
                              : isDark
                                ? icons.ic_check_on_dark
                                : icons.ic_check_on_light
                          }
                        />
                      </TouchableOpacity>
                    </View>

                    {item.key === subDutyType &&
                      item.sub_option.map(mapItem => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: SIZES.padding / 2,
                            }}>
                            <Text
                              style={{
                                color: isDark ? COLORS.golden : COLORS.black,
                                ...FONTS.h3,
                                marginLeft: SIZES.padding,
                              }}>
                              {mapItem.option}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                setSubFlight(mapItem.key);
                              }}>
                              <Image
                                style={{ width: 27, height: 27 }}
                                source={
                                  subFlight !== mapItem.key
                                    ? isDark
                                      ? icons.ic_check_off_dark
                                      : icons.ic_check_off_light
                                    : isDark
                                      ? icons.ic_check_on_dark
                                      : icons.ic_check_on_light
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </>
                );
              }}
            />
          )}
          {selectedDutyType === '4' && (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Image
                  source={
                    isDark ? icons.ic_planline_dark : icons.ic_planline_light
                  }
                  style={{ width: 27, height: 27, marginBottom: 10 }}
                />
                <TextInput
                  style={{
                    //   width: Dimensions.get('window').width / 1.3,
                    flex: 1,
                    color: COLORS.bgBlack,
                    paddingHorizontal: 10,
                  }}
                  placeholderTextColor={COLORS.darkGray}
                  placeholder="Enter flight number"
                  value={searchFlight}
                  onChangeText={text => setSearchFlight(text)}
                />
                <TouchableOpacity onPress={() => getFlight()}>
                  <Image
                    source={
                      isDark ? icons.ic_search_dark : icons.ic_search_dark
                    }
                    style={{
                      width: 27,
                      height: 27,
                      marginBottom: 10,
                      tintColor: COLORS.bgBlack,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  maxHeight: Dimensions.get('window').height / 5,
                  minHeight: Dimensions.get('window').height / 2.5,
                }}>
                <FlatList
                  data={totalFlights}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          // backgroundColor: COLORS.lightGolden,
                          padding: 5,
                          marginVertical: 3,
                          borderRadius: 3,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={
                            isDark
                              ? icons.ic_planline_dark
                              : icons.ic_planline_light
                          }
                          style={{
                            width: 27,
                            height: 27,
                            marginBottom: 10,
                            marginHorizontal: 7,
                          }}
                        />

                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            flex: 0.8,
                          }}>
                          <Text
                            style={{
                              color: COLORS.bgBlack,
                              fontWeight: '600',
                              fontSize: 10,
                            }}>
                            {item.flight_iata}
                          </Text>
                          <Text
                            style={{
                              color: COLORS.bgBlack,
                              fontWeight: '600',
                              fontSize: 10,
                            }}>
                            {item.dep_iata}
                          </Text>
                          <Text
                            style={{
                              color: COLORS.darkGray,
                              fontWeight: '400',
                              fontSize: 10,
                            }}>
                            {moment(item.dep_time).format('hh:mm')}z
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomColor: COLORS.darkGray,
                            borderBottomWidth: 2,
                            marginHorizontal: 5,
                            flex: 0.7,
                          }}
                        />
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                          }}>
                          <Image
                            source={
                              isDark ? icons.ic_plan_dark : icons.ic_plan_light
                            }
                            style={{ width: 20, height: 20 }}
                          />
                          <Text
                            style={{
                              color: isDark ? COLORS.golden : COLORS.black,
                              fontSize: 10,
                            }}>
                            Duration: {item.duration} min
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomColor: COLORS.darkGray,
                            borderBottomWidth: 2,
                            marginHorizontal: 5,
                            flex: 0.7,
                          }}
                        />

                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            flex: 0.8,
                            paddingHorizontal: 7,
                          }}>
                          <Text
                            style={{
                              color: COLORS.bgBlack,
                              fontWeight: '600',
                              fontSize: 10,
                            }}>
                            {item.arr_iata}
                          </Text>
                          <Text
                            style={{
                              color: COLORS.darkGray,
                              fontWeight: '400',
                              fontSize: 10,
                            }}>
                            {moment(item.arr_time).format('hh:mm')}z
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>
      {/* <View style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                marginVertical: SIZES.padding
            }}>
                <View style={{
                    marginVertical: SIZES.padding / 2,

                    flexDirection: 'row',
                }}>
                    <View>
                        <Image
                            source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
                            style={{ width: 27, height: 27 }}
                        />
                    </View>
                    <View style={{
                        marginHorizontal: SIZES.padding
                    }}>
                        <View>
                            <Text style={{
                                fontSize: SIZES.h3,
                                color: isDark ? COLORS.golden : COLORS.black,
                                fontWeight: '500'
                            }}>FR8249</Text>
                        </View>
                        <View style={{ marginVertical: SIZES.padding / 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>FAO</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>13:05z</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={isDark ? icons.ic_logo_icon_dark : icons.ic_logo_icon_light}
                                    style={{ width: 18, height: 18 }}
                                />
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>Duration: 2:35h</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>BRS</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>15:40z</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginVertical: SIZES.padding / 2,

                    flexDirection: 'row',
                }}>
                    <View>
                        <Image
                            source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
                            style={{ width: 27, height: 27 }}
                        />
                    </View>
                    <View style={{
                        marginHorizontal: SIZES.padding
                    }}>
                        <View>
                            <Text style={{
                                fontSize: SIZES.h3,
                                color: isDark ? COLORS.golden : COLORS.black,
                                fontWeight: '500'
                            }}>FR8248</Text>
                        </View>
                        <View style={{ marginVertical: SIZES.padding / 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>BRS</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>16:05z</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={isDark ? icons.ic_logo_icon_dark : icons.ic_logo_icon_light}
                                    style={{ width: 18, height: 18 }}
                                />
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>Duration: 2:35h</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>FAO</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>18:40z</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginVertical: SIZES.padding / 2,

                    flexDirection: 'row',
                }}>
                    <View>
                        <Image
                            source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
                            style={{ width: 27, height: 27 }}
                        />
                    </View>
                    <View style={{
                        marginHorizontal: SIZES.padding
                    }}>
                        <View>
                            <Text style={{
                                fontSize: SIZES.h3,
                                color: isDark ? COLORS.golden : COLORS.black,
                                fontWeight: '500'
                            }}>FR8930</Text>
                        </View>
                        <View style={{ marginVertical: SIZES.padding / 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>FAO</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>19:05z</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={isDark ? icons.ic_logo_icon_dark : icons.ic_logo_icon_light}
                                    style={{ width: 18, height: 18 }}
                                />
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>Duration: 2:35h</Text>
                            </View>
                            <View style={{ borderBottomWidth: 1, width: SIZES.width / 12, borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray, marginHorizontal: SIZES.padding / 2 }}></View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>VLC</Text>
                                <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>20:30z</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginVertical: SIZES.padding / 2,

                    flexDirection: 'row',
                }}>
                    <View>
                        <Image
                            source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
                            style={{ width: 27, height: 27 }}
                        />
                    </View>
                    <View style={{
                        marginHorizontal: SIZES.padding
                    }}>
                        <View>
                            <Text style={{
                                fontSize: SIZES.h3,
                                color: isDark ? COLORS.lightGolden : COLORS.darkGray,
                            }}>4th Sector Flight Number</Text>
                        </View>

                    </View>
                </View>
            </View> */}
      <View
        style={{
          marginHorizontal: SIZES.padding,
          flexDirection: 'row',
          position: 'absolute',
          bottom: SIZES.padding * 2,
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          source={isDark ? icons.ic_comment_dark : icons.ic_comment_light}
          style={{ width: 27, height: 27 }}
        />
        <TextInput
          placeholder="Comment"
          style={{ ...FONTS.h3, marginLeft: SIZES.padding }}
          placeholderTextColor={isDark ? COLORS.golden : COLORS.black}
          onChangeText={text => setComment(text)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  midPart: {
    flexDirection: 'row',
  },
  form: {
    flex: 1,
    marginHorizontal: SIZES.padding,
  },
  inputFieldComponent: {
    marginVertical: SIZES.padding / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    marginLeft: SIZES.padding,
    ...FONTS.h3,
  },
  elipsPart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elips: {
    marginVertical: SIZES.padding,
  },
  bottomPart: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  horizontalElips: {
    marginHorizontal: SIZES.padding,
  },

  checkBoxContainer: {
    marginTop: SIZES.padding / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
