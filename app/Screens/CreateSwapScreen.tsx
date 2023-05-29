import React, { useState, useContext } from 'react';
import {
  Image,
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, icons, images, SIZES } from '../constants';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DatePicker from 'react-native-date-picker';
import { ThemeContext } from '../Contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { AuthContext } from '../Contexts/AuthContext';

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
    option: 'Specific Flight',
  },
];

const Standby = [
  {
    key: '1',
    option: 'Earlies',
    sub_option: {
      startTime: '13:00z',
      Duration: '10:00 hr',
      endTime: '23:00z',
    },
  },
  {
    key: '2',
    // option: 'Latest',
    option: 'Lates',
    sub_option: { startTime: '10:00z', Duration: '10:00 hr', endTime: '20:00z' },
  },
];

export default function CreateSwapScreen({ navigation }: any) {
  const [selectDate, setSelectDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState('');
  const [open, setOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [selectedDutyType, setSelectedDutyType] = useState('');
  const [subDutyType, setSubDutyType] = useState('');
  const [searchFlight, setSearchFlight] = useState('');
  const [totalFlights, setTotalFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isDark } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const hideDatePicker = () => {
    setOpen(false);
  };

  const handleConfirm = (date: any) => {
    let newDate  = moment(date).format('DD/MM/YYYY');
    console.log(newDate,"new date logg");
    console.log(date,"new date logg");
    setOpen(false);
    setSelectDate(date);
    setSecondDate(newDate);
  };

  const getFlight = async () => {
    console.log('user:::', user);
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
        } else if (responseJson.ResponseCode === 0) {
          // setTimeout(() => {
          Alert.alert(responseJson.ResponseMsg);
          // }, 1000);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error::', 'Please enter correct flight_iata');
      setTotalFlights([]);
    }
  };

  const navigateToReturn = () => {
    let Object = {
      date: secondDate,
      duty_type:
        selectedDutyType !== ''
          ? dropDownOptions[selectedDutyType - 1].option
          : '',
      sub_duty_type: subDutyType === 2 ? Standby[subDutyType - 1].option : '',
      flight_sectors: totalFlights.length !== 0 ? totalFlights.length : '',
      from_time:
        subDutyType !== '' ? (subDutyType === 1 ? '13:00:00' : '23:00:00') : '',
      to_time:
        subDutyType !== '' ? (subDutyType === 1 ? '20:00:00' : '20:00:00') : '',
      duration: subDutyType !== '' ? '10:00:00' : '',
      total_flights: totalFlights,
    };
    console.log('Object :::', JSON.stringify(Object));
    navigation.navigate('InReturnsScreen', {
      type: selectedDutyType,
      val: Object,
      screenName: 'CreateSwapScreen',
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={isDark ? icons.ic_back_dark : icons.ic_back_light}
              style={{ width: 28, height: 28 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToReturn()}>
            <Image
              source={isDark ? icons.ic_check_dark : icons.ic_check_light}
              style={{ width: 28, height: 28 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: SIZES.padding }}>
          <Text
            style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>
            Create Swap
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
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View style={styles.inputFieldComponent}>
              <Image
                source={isDark ? icons.ic_date_dark : icons.ic_date_light}
                style={{ width: 27, height: 27 }}
              />
              <Text
                style={{
                  // color: secondDate !== '' ? COLORS.bgBlack : COLORS.darkGray,
                  // color: secondDate !== '' ? COLORS.bgBlack : COLORS.darkGray,
                  // color: secondDate !== '' ? COLORS.bgBlack : COLORS.darkGray,
                  color: isDark ?  COLORS.golden : secondDate !== '' ? COLORS.bgBlack : COLORS.darkGray,
                  ...FONTS.h3,
                  ...styles.inputField,
                }}>
                {secondDate !== '' ? secondDate : 'Date'}
              </Text>
            </View>
          </TouchableOpacity>

          <DatePicker
            mode="date"
            modal
            open={open}
            date={selectDate}
            onConfirm={date => handleConfirm(date)}
            onCancel={hideDatePicker}
          />
          <TouchableOpacity
            onPress={() => {
              setSelectedDutyType('');
              setDropDownOpen(!dropDownOpen);
              setSubDutyType('');
              setTotalFlights([]);
            }}
            style={{
              ...styles.inputFieldComponent,
              alignItems: 'center',
              marginVertical: SIZES.padding * 2,
            }}>
            <Image
              source={isDark ? icons.ic_duty_dark : icons.ic_duty_light}
              style={{ width: 27, height: 27 }}
            />
            <Text
              style={{
                color: isDark ? COLORS.golden : 
                  selectedDutyType === '' ? COLORS.darkGray :  COLORS.bgBlack,
                ...FONTS.h3,
                ...styles.inputField,
              }}>
              {selectedDutyType === '1'
                ? dropDownOptions[0].option
                : selectedDutyType === '2'
                  ? dropDownOptions[1].option
                  : selectedDutyType === '3'
                    ? dropDownOptions[2].option
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
          {dropDownOpen && selectedDutyType === '' && (
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
                        }}>
                        {item.option}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setDropDownOpen(false);

                          setSelectedDutyType(item.key);
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
          {selectedDutyType === '3' && (
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
                    color:isDark ? COLORS.golden : COLORS.bgBlack,
                    paddingHorizontal: 10,
                  }}
                  value={searchFlight}
                  onChangeText={text => setSearchFlight(text)}
                  placeholderTextColor={isDark ? COLORS.golden :  COLORS.darkGray}
                  placeholder="Enter flight number"
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
                        <Text style={{ color: COLORS.bgBlack, flex: 1 }}>
                          {item.sub_option.startTime}
                        </Text>

                        <View
                          style={{
                            borderBottomColor: COLORS.darkGray,
                            borderBottomWidth: 1,
                            width: 30,
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
                            width: 30,
                            marginHorizontal: 10,
                          }}
                        />
                        <Text style={{ color: COLORS.bgBlack, flex: 1 }}>
                          {item.sub_option.endTime}
                        </Text>
                      </View>
                    )}
                  </>
                );
              }}
            />
          )}
        </View>
      </View>
      {/* <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginVertical: SIZES.padding,
        }}>
        <View
          style={{
            marginVertical: SIZES.padding / 2,

            flexDirection: 'row',
          }}>
          <View>
            <Image
              source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
              style={{width: 27, height: 27}}
            />
          </View>
          <View
            style={{
              marginHorizontal: SIZES.padding,
            }}>
            <View>
              <Text
                style={{
                  fontSize: SIZES.h3,
                  color: isDark ? COLORS.golden : COLORS.black,
                  fontWeight: '500',
                }}>
                FR8249
              </Text>
            </View>
            <View
              style={{
                marginVertical: SIZES.padding / 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: isDark ? COLORS.golden : COLORS.black,
                    fontWeight: '500',
                  }}>
                  FAO
                </Text>
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  13:05z
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: SIZES.width / 12,
                  borderColor: COLORS.darkGray,
                  marginHorizontal: SIZES.padding / 2,
                }}></View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={isDark ? icons.ic_plan_dark : icons.ic_plan_light}
                  style={{width: 27, height: 27}}
                />
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  Duration: 2:35h
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: SIZES.width / 12,
                  borderColor: COLORS.darkGray,
                  marginHorizontal: SIZES.padding / 2,
                }}></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    color: isDark ? COLORS.golden : COLORS.black,
                    fontWeight: '500',
                  }}>
                  BRS
                </Text>
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  15:40z
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginVertical: SIZES.padding / 2,

            flexDirection: 'row',
          }}>
          <View>
            <Image
              source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
              style={{width: 27, height: 27}}
            />
          </View>
          <View
            style={{
              marginHorizontal: SIZES.padding,
            }}>
            <View>
              <Text
                style={{
                  fontSize: SIZES.h3,
                  color: isDark ? COLORS.golden : COLORS.black,
                  fontWeight: '500',
                }}>
                FR8248
              </Text>
            </View>
            <View
              style={{
                marginVertical: SIZES.padding / 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: isDark ? COLORS.golden : COLORS.black,
                    fontWeight: '500',
                  }}>
                  BRS
                </Text>
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  16:05z
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: SIZES.width / 12,
                  borderColor: COLORS.darkGray,
                  marginHorizontal: SIZES.padding / 2,
                }}></View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={isDark ? icons.ic_plan_dark : icons.ic_plan_light}
                  style={{width: 27, height: 27}}
                />
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  Duration: 2:35h
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: SIZES.width / 12,
                  borderColor: COLORS.darkGray,
                  marginHorizontal: SIZES.padding / 2,
                }}></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    color: isDark ? COLORS.golden : COLORS.black,
                    fontWeight: '500',
                  }}>
                  FAO
                </Text>
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  18:40z
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginVertical: SIZES.padding / 2,

            flexDirection: 'row',
          }}>
          <View>
            <Image
              source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
              style={{width: 27, height: 27}}
            />
          </View>
          <View
            style={{
              marginHorizontal: SIZES.padding,
            }}>
            <View>
              <Text
                style={{
                  fontSize: SIZES.h3,
                  color: isDark ? COLORS.golden : COLORS.black,
                  fontWeight: '500',
                }}>
                FR8930
              </Text>
            </View>
            <View
              style={{
                marginVertical: SIZES.padding / 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={{
                    color: isDark ? COLORS.golden : COLORS.black,
                    fontWeight: '500',
                  }}>
                  FAO
                </Text>
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  19:05z
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: SIZES.width / 12,
                  borderColor: COLORS.darkGray,
                  marginHorizontal: SIZES.padding / 2,
                }}></View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={isDark ? icons.ic_plan_dark : icons.ic_plan_light}
                  style={{width: 27, height: 27}}
                />
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  Duration: 2:35h
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  width: SIZES.width / 12,
                  borderColor: COLORS.darkGray,
                  marginHorizontal: SIZES.padding / 2,
                }}></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  style={{
                    color: isDark ? COLORS.golden : COLORS.black,
                    fontWeight: '500',
                  }}>
                  VLC
                </Text>
                <Text style={{color: isDark ? COLORS.golden : COLORS.black}}>
                  20:30z
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginVertical: SIZES.padding / 2,

            flexDirection: 'row',
          }}>
          <View>
            <Image
              source={isDark ? icons.ic_planline_dark : icons.ic_planline_light}
              style={{width: 27, height: 27}}
            />
          </View>
          <View
            style={{
              marginHorizontal: SIZES.padding,
            }}>
            <View>
              <Text
                style={{
                  fontSize: SIZES.h3,
                  color: isDark ? COLORS.lightGolden : COLORS.darkGray,
                }}>
                4th Sector Flight Number
              </Text>
            </View>
          </View>
        </View>
      </View> */}
    </View>
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
