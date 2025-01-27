import React, { useContext, useState ,useEffect} from 'react';
import { Image, SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { ThemeContext } from '../Contexts/ThemeContext';
import { AuthContext } from '../Contexts/AuthContext';
import SelectDropdown from 'react-native-select-dropdown';

const SettingScreen = ({ navigation }: any) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTCChecked, setIsTCChecked] = useState(false)

  const { isDark, toggleDark } = useContext(ThemeContext)

  const { logout, user } = useContext(AuthContext)
  const [airLineList, setAirLineList] = useState([]);

  const [homeBase, setHomeBase] = useState(user.home_base);
  const [crewcode, setCrewcode] = useState(user.crewcode);
  const [isChecked, setIsChecked] = useState(user.position == 'First Officer' ? true : false);
  const [selectedAirline, setSelectedAirline] = useState('');

  useEffect(() => {
    getAirLineList();
  }, []);

  const getAirLineList = async () => {
    try {
      let temp = [];
      var myHeaders = new Headers();
      myHeaders.append('key', '2b223e5cee713615ha54ac203b24e9a123754yuVT');
      //   myHeaders.append('token', 'PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo');
      myHeaders.append(
        'Authorization',
        `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL1N3b29wIiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9Td29vcCIsImlhdCI6MTY4MzUzOTEyMCwiZXhwIjoxNjgzNjI1NTIwLCJkYXRhIjp7InVzZXJfaWQiOiIxIn19.nU9jyczqIByNStwyHr6RD4VlxJB_2bWuN1J-xx2gSNk'} `,
      );
      var formdata = new FormData();
      formdata.append('user_id', 1);

      const response = await fetch(
        'https://client.appmania.co.in/Swoop/api/getAirlinesList',
        {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
        },
      );

      const responseJson = await response.json();

      if (response.status === 200) {
        if (responseJson.ResponseCode === 1) {
          console.log('responseJson :::', JSON.stringify(responseJson.data));
          responseJson.data.map(mapItem => {
            temp.push(mapItem.name);
          });
          setAirLineList([...temp]);
        }
      }
    } catch (error) {
      console.log('error::', error);
    }
  };


  return (
    <Swiper
      loop={false}
      activeDot={<View style={{ backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, width: SIZES.base, height: SIZES.base, borderRadius: SIZES.base, }} />}
      dot={<View style={{ backgroundColor: isDark ? COLORS.golden : COLORS.black, marginHorizontal: SIZES.padding, width: SIZES.base, height: SIZES.base, borderRadius: SIZES.base, }} />}
    >

      <View style={{ flex: 1, backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray, paddingTop: SIZES.padding * 3 }}>
        <View style={{ marginHorizontal: SIZES.padding, }}>
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
            <TouchableOpacity onPress={() => { }}>
              <Image
                source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: SIZES.padding }}>
            <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>Settings</Text>
          </View>
        </View>
        <View style={styles.midPart}>
          <View style={styles.form}>
            <View
              style={[styles.inputFieldComponent,]}>
              <Image
                style={{width: 27, height: 27}}
                source={isDark ? icons.ic_airline_dark : icons.ic_airline_light}
              />
              <SelectDropdown
                data={airLineList}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  setSelectedAirline(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextStyle={{
                  position:"absolute",
                  left:10,
                  color : isDark ? COLORS.golden : COLORS.bgBlack,
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                // defaultButtonText="Select Airline"
                defaultButtonText="Airline"
              
                buttonStyle={{
                  width: '100%',
                  backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray,
                  
                
                }}
                buttonTextStyle={{textAlign:"left",marginLeft:20,color:isDark ? COLORS.golden : COLORS.bgBlack}}
                dropdownStyle={{
                  width: '80%',
                  backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray,
                }}
              />
            </View>
            {/* <View
              style={[styles.inputFieldComponent,]}>
              <Image
                style={{ width: 27, height: 27 }}
                source={isDark ? icons.ic_airline_dark : icons.ic_airline_light}
              />
              <Text style={[styles.inputField, { color: isDark ? COLORS.lightGolden : COLORS.darkGray }]} >Airlines</Text>

              <Image
                style={{ width: 16, height: 16, marginLeft: SIZES.padding * 2 }}
                source={isDark ? icons.ic_down_dark : icons.ic_down_light}
              />
            </View> */}
            <View
              style={styles.inputFieldComponent}>
              <Image
                style={{ width: 27, height: 27 }}
                source={isDark ? icons.ic_location_dark : icons.ic_location_light}
              />
              <TextInput
                placeholder="Homebase"
                style={styles.inputField}
                placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}
                onChangeText={value => {
                  setHomeBase(value);
                }}
                value={homeBase}
              />
            </View>
            <View
              style={styles.inputFieldComponent}>
              <Image
                source={isDark ? icons.ic_user_dark : icons.ic_user_light}
                style={{ width: 27, height: 27 }}
              />
              <TextInput
                placeholder="Crewcode"
                style={styles.inputField}
                placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}
                onChangeText={value => {
                  setCrewcode(value);
                }}
                value={crewcode}
              />
            </View>

            <View>
              <View style={styles.inputFieldComponent}>
                <Image
                  source={isDark ? icons.ic_position_dark : icons.ic_position_light}
                  style={{ width: 27, height: 27 }}
                />
                <Text style={[styles.inputField, { color: isDark ? COLORS.lightGolden : COLORS.darkGray }]} >Position</Text>
              </View>
              <View style={{ marginHorizontal: SIZES.padding * 2 }}>
                <View style={styles.checkBoxContainer}>
                  <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>Captain</Text>
                  <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    <Image style={{ width: 24, height: 24 }} source={isChecked ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                  </TouchableOpacity>
                </View>
                <View style={styles.checkBoxContainer}>
                  <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>First Officer</Text>
                  <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    <Image style={{ width: 24, height: 24 }} source={!isChecked ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleDark()}>
              <View
                style={styles.inputFieldComponent}>
                <Image
                  source={isDark ? icons.ic_mode_dark : icons.ic_mode_light}
                  style={{ width: 27, height: 27 }}
                />
                <Text
                  style={[styles.inputField, { color: isDark ? COLORS.lightGolden : COLORS.darkGray }]}
                >{isDark ? "Light Mode" : "Dark mode"}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.bottomPart}>


        </View>
      </View>





      <View style={{ flex: 1, backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray, paddingTop: SIZES.padding * 3 }}>
        <View style={{ marginHorizontal: SIZES.padding, }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => { }}>
              <Image
                source={isDark ? icons.ic_back_dark : icons.ic_back_light}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Image
                source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: SIZES.padding }}>
            <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>Settings</Text>
          </View>
        </View>
        <View style={styles.midPart}>
          <View style={styles.form}>
            <View
              style={styles.inputFieldComponent}>
              <Image
                source={isDark ? icons.ic_email_dark : icons.ic_email_light}
                style={{ width: 24, height: 24 }}
              />
              <TextInput
                placeholder="Email"
                style={styles.inputField}
                placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}
                onChangeText={value => {
                  setUserName(value);
                }}
              />
            </View>
            <View
              style={styles.inputFieldComponent}>
              <Image
                source={isDark ? icons.ic_lock_dark : icons.ic_lock_light}
                style={{ width: 24, height: 24 }}
              />
              <TextInput
                placeholder="New Password"
                style={styles.inputField}
                placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}

              />
            </View>
            <View
              style={styles.inputFieldComponent}>
              <Image
                source={isDark ? icons.ic_lock_dark : icons.ic_lock_light}
                style={{ width: 24, height: 24 }}
              />
              <TextInput
                placeholder="Confirm New Password"
                style={styles.inputField}
                placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}

              />
            </View>

            <View>
              <View style={styles.inputFieldComponent}>
                <Image
                  source={isDark ? icons.ic_subscription_dark : icons.ic_subscriprion_light}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.inputField} >Subscription</Text>
              </View>
              <View style={{ marginHorizontal: SIZES.padding * 2 }}>
                <View style={styles.checkBoxContainer}>
                  <View>
                    <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>Free Trial</Text>
                    <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>3 months</Text>

                  </View>
                  <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    <Image style={{ width: 24, height: 24 }} source={isChecked ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                  </TouchableOpacity>
                </View>
                <View style={styles.checkBoxContainer}>
                  <View>
                    <Text style={{ color: isDark ? COLORS.golden : COLORS.black, fontWeight: '500' }}>Monthly Subscrition</Text>
                    <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>TBD</Text>

                  </View>
                  <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    <Image style={{ width: 24, height: 24 }} source={!isChecked ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

        </View>
        <View style={styles.bottomPart}>


        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray, paddingTop: SIZES.padding * 3 }}>
        <View style={{ marginHorizontal: SIZES.padding, }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => { }}>
              <Image
                source={isDark ? icons.ic_back_dark : icons.ic_back_light}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Image
                source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: SIZES.padding }}>
            <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>Settings</Text>
          </View>
        </View>
        <View style={styles.midPart}>
          <View style={styles.form}>
            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
              <View
                style={styles.inputFieldComponent}>
                <Image
                  source={isDark ? icons.ic_about_dark : icons.ic_about_light}
                  style={{ width: 27, height: 27 }}
                />
                <Text style={[styles.inputField, { color: isDark ? COLORS.golden : COLORS.darkGray }]}>About us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
              <View
                style={styles.inputFieldComponent}>
                <Image
                  source={isDark ? icons.ic_contact_dark : icons.ic_contact_light}
                  style={{ width: 27, height: 27 }}
                />
                <Text style={[styles.inputField, { color: isDark ? COLORS.golden : COLORS.darkGray }]}>Contact Us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TermsNCondition')}>
              <View
                style={styles.inputFieldComponent}>
                <Image
                  source={isDark ? icons.ic_terms_dark : icons.ic_terms_light}
                  style={{ width: 27, height: 27 }}
                />
                <Text style={[styles.inputField, { color: isDark ? COLORS.golden : COLORS.darkGray }]}>Terms & Conditions</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DeleteAccount')}>
              <View
                style={styles.inputFieldComponent}>
                <Image
                  source={isDark ? icons.ic_delete_account_dark : icons.ic_delete_account_light}
                  style={{ width: 27, height: 27 }}
                />
                <Text style={[styles.inputField, { color: isDark ? COLORS.golden : COLORS.darkGray }]}>Delete Account</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout()}>
              <View
                style={styles.inputFieldComponent}>
                <Image
                  source={isDark ? icons.ic_logout_dark : icons.ic_logout_light}
                  style={{ width: 27, height: 27 }}
                />
                <Text style={[styles.inputField, { color: isDark ? COLORS.golden : COLORS.darkGray }]}>logout</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>
        <View style={styles.bottomPart}>


        </View>
      </View>
    </Swiper>
  );
};

export default SettingScreen;


const styles = StyleSheet.create({
  midPart: {
    flex: 4,
    flexDirection: 'row',

  },
  form: {
    flex: 1,
    marginHorizontal: SIZES.padding,
    justifyContent: 'space-around'
  },
  inputFieldComponent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputField: {
    marginLeft: SIZES.padding,
    ...FONTS.h3,
    color: COLORS.darkGray
  },
  elipsPart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  elips: {
    marginVertical: SIZES.padding
  },
  bottomPart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  horizontalElips: {
    marginHorizontal: SIZES.padding
  },


  checkBoxContainer: {
    marginTop: SIZES.padding / 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})






