import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext,useEffect} from 'react';
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../Contexts/AuthContext';

import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {ThemeContext} from '../Contexts/ThemeContext';
import config from '../config';

import {LoginManager} from 'react-native-fbsdk-next'
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin'
import {appleAuthAndroid , appleAuth} from '@invertase/react-native-apple-authentication'
// import {v4 as uuid} from 'react-native-uuid'

const LoginScreen = ({navigation}: any) => {
  const [username, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const navigation = useNavigation();

  const {user, setUser} = useContext(AuthContext);

  const {isDark} = useContext(ThemeContext);

  console.log(user, 'user');

  // useEffect(()=>{
  //   GoogleSignin.configure({
  //     webClientId : "",
  //     offlineAccess: true
  //   })
  // },[])

  const handleLogin = async () => {
    setLoading(true);
    try {
      var myHeaders = new Headers();
      myHeaders.append('key', config.key);

      var formdata = new FormData();
      formdata.append('email', username);
      formdata.append('password', Password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      // setLoading(false);
      var res = await fetch(
        'https://client.appmania.co.in/Swoop/api/login',
        requestOptions,
      ).then(async res => await res.json());
      setLoading(false);
      if (res.ResponseCode == 0) {
        Alert.alert('Error', res.ResponseMsg);
      } else if (res.ResponseCode == 1) {
        setUser(res.data);
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
      }
    } catch (error) {
      setLoading(false);
      console.log(error, 'error');
      // return Alert.alert('Error', 'Something went wrong');
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

    const googlelogin = async () =>{
        try{
          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signIn().then(result => {console.log(result)});
        }catch(error : any){
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            Alert.alert('User cancelled the login flow !');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            Alert.alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('Google play services not available or outdated !');
            // play services not available or outdated
          } else {
            console.log(error)
            Alert.alert('RNGoogleSignin: offline use requires server web ClientID');
          }
        }
    }


    const facebooklogin  = () =>{
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function (result) {
        if (result.isCancelled) {
          Alert.alert("Login Cancelled " + JSON.stringify(result))
        } else {
          Alert.alert("Login success with  permisssions: " + result?.grantedPermissions?.toString());
          Alert.alert("Login Success " + result.toString());
        }
        },
        function (error) {
          Alert.alert("Login failed with error: " + error);
        }
        )
        
    }

    const applelogin = async  () =>{
      const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation : appleAuth.Operation.LOGIN,
          requestedScopes : [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
          
      })
      
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }

    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray,
        paddingTop: Platform.OS === 'ios' ? SIZES.padding * 3 : 0,
      }}>
      <View style={{flex: 2}}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={isDark ? icons.ic_logo_dark : icons.ic_logo_light}
            style={{width: 156, height: 70}}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: SIZES.padding / 2,
          }}>
          <Image
            source={isDark ? icons.ic_logo_icon_dark : icons.ic_logo_icon_light}
            style={{width: 50, height: 50}}
          />
          <Text
            style={{
              ...FONTS.h3,
              color: isDark ? COLORS.golden : COLORS.black,
              marginVertical: SIZES.padding,
            }}>
            Welcome to Swoop!
          </Text>
        </View>
      </View>
      <View style={{flex: 3}}>
        <View style={{paddingHorizontal: SIZES.padding}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.padding / 2,
              width:"90%",

            }}>
            <Image
              source={isDark ? icons.ic_user_dark : icons.ic_user_light}
              style={{width: 27, height: 27}}
            />
            <TextInput
              placeholder="Username"
              style={{...FONTS.h3, marginLeft: SIZES.padding,width:230}}
              //   secureTextEntry = {true}
              placeholderTextColor={
                isDark ? COLORS.lightGolden : COLORS.darkGray
              }
              onChangeText={value => {
                setUserName(value);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.padding / 2,
            }}>
            <Image
              source={isDark ? icons.ic_lock_dark : icons.ic_lock_light}
              style={{width: 27, height: 27}}
            />
            <TextInput
              placeholder="Password"
              style={{...FONTS.h3, marginLeft: SIZES.padding,width:230}}
              secureTextEntry={true}
              placeholderTextColor={
                isDark ? COLORS.lightGolden : COLORS.darkGray
              }
              onChangeText={value => {
                setPassword(value);
              }}
            />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.red,
                  textDecorationLine: 'underline',
                }}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: SIZES.padding,
            }}>
            <TouchableOpacity style={{}} onPress={() => handleLogin()}>
              <Text
                style={{
                  ...FONTS.h2,
                  color: isDark ? COLORS.golden : COLORS.black,
                }}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray,
                borderBottomWidth: 1,
                width: SIZES.width / 4,
              }}></View>
            <Text
              style={{
                marginHorizontal: SIZES.padding / 2,
                color: isDark ? COLORS.lightGolden : COLORS.darkGray,
                ...FONTS.body3,
              }}>
              or continue with
            </Text>
            <View
              style={{
                borderColor: isDark ? COLORS.lightGolden : COLORS.darkGray,
                borderBottomWidth: 1,
                width: SIZES.width / 4,
              }}></View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: SIZES.padding,
            }}>
            <TouchableOpacity onPress={()=>{googlelogin()}} style={{marginHorizontal: SIZES.padding}}>
              <Image
                source={isDark ? icons.ic_google_dark : icons.ic_google_dark}
                style={{width: 36, height: 36}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{applelogin()}} style={{marginHorizontal: SIZES.padding}}>
              <Image
                source={isDark ? icons.ic_apple_dark : icons.ic_apple_light}
                resizeMode="contain"
                style={{width: 36, height: 36}}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{facebooklogin()}}            
            style={{marginHorizontal: SIZES.padding}}>
              <Image
                source={
                  isDark ? icons.ic_Facebook_dark : icons.ic_Facebook_light
                }
                style={{width: 36, height: 36}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: SIZES.padding,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: isDark ? COLORS.golden : COLORS.black,
                marginRight: SIZES.padding / 4,
              }}>
              Not a member?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.red,
                  textDecorationLine: 'underline',
                }}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
