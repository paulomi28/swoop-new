import React, {useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import MyTabs from './CustomBottomTabs';
import CreateSwapScreen from '../Screens/CreateSwapScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import MySwapDetailsScreen from '../Screens/MySwapDetailsScreen';
import AboutUsScreen from '../Screens/AboutUsScreen';
import ContactUsScreen from '../Screens/ContactUsScreen';
import TermsNCondition from '../Screens/TermsNCondition';
import DeleteAccountScreen from '../Screens/DeleteAccountScreen';
import DeleteAccountConfirmationScreen from '../Screens/DeleteAccountConfirmationScreen';
import DeleteAccountReviewScreen from '../Screens/DeleteAccountReviewScreen';
import {StatusBar} from 'react-native';
import {ThemeContext} from '../Contexts/ThemeContext';
import {AuthContext} from '../Contexts/AuthContext';
import {COLORS} from '../constants';
import MySwapScreen from '../Screens/MySwapScreen';
import AllSwapScreen from '../Screens/AllSwapsScreen';


export default function RootStack() {
  const Stack = createNativeStackNavigator();

  const {isDark} = useContext(ThemeContext);
  const {user} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? COLORS.bgBlack : COLORS.gray}
      />
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{headerShown: false}}>
        {!user.user_id ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="MyCustomTabs" component={MyTabs} />
            <Stack.Screen
              name="CreateSwapScreen"
              component={CreateSwapScreen}
            />
            <Stack.Screen
              name="MySwapDetails"
              component={MySwapDetailsScreen}
            />
            <Stack.Screen name="AboutUs" component={AboutUsScreen} />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} />
            <Stack.Screen name="TermsNCondition" component={TermsNCondition} />
            <Stack.Screen
              name="DeleteAccount"
              component={DeleteAccountScreen}
            />
            <Stack.Screen
              name="DeleteAccountConfirmation"
              component={DeleteAccountConfirmationScreen}
            />
            <Stack.Screen
              name="DeleteAccountReview"
              component={DeleteAccountReviewScreen}
            />
            <Stack.Screen name="MySwapScreen" component={MySwapScreen} />
            <Stack.Screen name="AllSwapScreen" component={AllSwapScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
