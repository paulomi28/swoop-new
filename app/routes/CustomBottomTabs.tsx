import {useContext, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MySwapScreen from '../Screens/MySwapScreen';
import {icons, COLORS, SIZES, FONTS} from '../constants';

import SettingsScreens from '../Screens/SettingsScreens';
import AllSwapScreen from '../Screens/AllSwapsScreen';
import SearchScreen from '../Screens/SearchScreen';
import {ThemeContext} from '../Contexts/ThemeContext';
import InReturns from '../Screens/InReturns';

const Tab = createBottomTabNavigator();

function CustomBottomTab({state, descriptors, navigation}: any) {
  const [isOpen, setIsOpen] = useState(false);

  const {isDark} = useContext(ThemeContext);

  return (
    <View>
      {isOpen && (
        <View
          style={{
            zIndex: -1,
            flexDirection: 'row',
            position: 'absolute',
            bottom: SIZES.padding * 2,
            backgroundColor: COLORS.bgGray,
            borderRadius: SIZES.base * 5,
            right: SIZES.padding * 2,
            width: SIZES.width * 0.8,
            justifyContent: 'space-around',
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding / 1.5,
            elevation: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}>
            <Image
              source={isDark ? icons.ic_search_dark : icons.ic_search_light}
              style={{width: 27, height: 27}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MySwapScreen')}>
            <Image
              source={
                isDark ? icons.ic_user_white_dark : icons.ic_user_white_light
              }
              style={{width: 27, height: 27}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllSwapScreen');
            }}>
            <Image
              source={isDark ? icons.ic_repeat_dark : icons.ic_repeat_light}
              style={{width: 27, height: 27}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <Image
              source={isDark ? icons.ic_settings_dark : icons.ic_settings_light}
              style={{width: 27, height: 27}}
            />
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          zIndex: 1,
          position: 'absolute',
          bottom: SIZES.padding * 3,
          right: SIZES.padding,
        }}>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Image
            style={{width: 54, height: 54}}
            source={
              isOpen
                ? isDark
                  ? icons.ic_menu_close_dark
                  : icons.ic_menu_close_light
                : isDark
                ? icons.ic_menu_dark
                : icons.ic_menu_light
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MySwapScreen"
      tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Screen name="MySwapScreen" component={MySwapScreen} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="InReturnsScreen" component={InReturns} />
      <Tab.Screen name="SettingScreen" component={SettingsScreens} />
      <Tab.Screen name="AllSwapScreen" component={AllSwapScreen} />
    </Tab.Navigator>
  );
}
