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


export default function DeleteAccountScreen({ navigation }: any) {

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
                    <TouchableOpacity onPress={() => selectedIndex != '3' ? navigation.navigate('DeleteAccountConfirmation', {
                        reason: reasonsArray.find(i => i.id === selectedIndex)?.text
                    }) : navigation.navigate('DeleteAccountReview')}>
                        <Image
                            source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                            style={{ width: 28, height: 28 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: SIZES.padding }}>
                    <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black, marginBottom: SIZES.padding }}>Delete Account</Text>

                    <FlatList
                        data={reasonsArray}
                        keyExtractor={i => i.id}
                        renderItem={({ item }) => (
                            <View style={styles.checkBoxContainer}>
                                <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }} onPress={() => setSelectedIndex(item.id)}>
                                    <Text style={{ color: isDark ? COLORS.golden : COLORS.black }}>{item.text}</Text>
                                    <Image style={{ width: 24, height: 24 }} source={selectedIndex !== item.id ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
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


