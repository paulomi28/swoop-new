import React, { useContext, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { ThemeContext } from '../Contexts/ThemeContext';



const reasonsArray = [
    {
        id: '1',
        text: "I don't like Swoop"
    },
    {
        id: '2',
        text: "There is an error in the app"
    },
    {
        id: '3',
        text: "Other"
    }
]


export default function DeleteAccountReviewScreen({ navigation }: any) {

    const { isDark } = useContext(ThemeContext)
    const [selectedIndex, setSelectedIndex] = useState('1')








    return (
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
                    <TouchableOpacity onPress={() => selectedIndex != '3' ? navigation.navigate('DeleteAccountConfirmation') : navigation.navigate('DeleteAccountReview')}>
                        <Image
                            source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                            style={{ width: 28, height: 28 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: SIZES.padding }}>
                    <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black, marginBottom: SIZES.padding }}>Delete Account</Text>

                    <View style={{ marginVertical: SIZES.padding }}>
                        <Text style={{ ...FONTS.body4, color: isDark ? COLORS.golden : COLORS.black, width: SIZES.width * .7 }}>Can you please share to us what was not
                            working? We are fixing bugs as soon as we
                            spot them.</Text>


                        <View>
                            <TextInput placeholder='Your Explanation is entirely optional..' multiline={true} cursorColor={isDark ? COLORS.golden : COLORS.black} style={{ ...FONTS.body3, marginVertical: SIZES.padding, color: isDark ? COLORS.lightGolden : COLORS.black }} placeholderTextColor={isDark ? COLORS.lightGolden : COLORS.darkGray} />
                        </View>
                    </View>
                </View>
            </View>

        </View >

    )
}


const styles = StyleSheet.create({

    checkBoxContainer: {
        marginVertical: SIZES.padding / 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})


