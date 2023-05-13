import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { ThemeContext } from '../Contexts/ThemeContext'

export default function CustomDropDown() {

    const { isDark } = useContext(ThemeContext)

    const [isChecked, setIsChecked] = useState(true)
    return (
        <View style={styles.body}>
            <TouchableOpacity>
                <Text style={styles.text}>Duty</Text>
            </TouchableOpacity>
            <View style={styles.optionBody}>
                <View style={styles.optionHolder}>
                    <Text style={styles.text}>Off</Text>
                    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                        <Image style={{ width: 24, height: 24, marginHorizontal: SIZES.padding }} source={isChecked ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                    </TouchableOpacity>
                </View>
                <View style={styles.optionHolder}>
                    <Text style={styles.text}>Off</Text>
                    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                        <Image style={{ width: 24, height: 24, marginHorizontal: SIZES.padding }} source={isChecked ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                    </TouchableOpacity>
                </View>
                <View style={styles.optionHolder}>
                    <Text style={styles.text}>Off</Text>
                    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                        <Image style={{ width: 24, height: 24, marginHorizontal: SIZES.padding }} source={isChecked ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                    </TouchableOpacity>
                </View>
                <View style={styles.optionHolder}>
                    <Text style={styles.text}>Off</Text>
                    <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                        <Image style={{ width: 24, height: 24, marginHorizontal: SIZES.padding }} source={isChecked ? (isDark ? icons.ic_check_off_dark : icons.ic_check_off_light) : (isDark ? icons.ic_check_on_dark : icons.ic_check_on_light)} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        marginHorizontal: SIZES.padding,
    },
    text: {
        color: COLORS.black,
        ...FONTS.h3
    },
    optionBody: {

        backgroundColor: COLORS.white,
        marginVertical: SIZES.padding / 2,
        width: SIZES.width * 0.7
    },
    optionHolder: {
        marginVertical: SIZES.padding / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})