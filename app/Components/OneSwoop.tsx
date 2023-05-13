import { useState } from "react"
import { Image, FlatList, Text, TouchableOpacity, View } from 'react-native';


import { icons, COLORS, SIZES, FONTS } from '../constants';


export default function OneSwoop() {

    const [isOpen, setIsOpen] = useState(false)


    return (
        <>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View>
                    <Text style={{ ...FONTS.h4, marginVertical: SIZES.padding / 8 }}>Sat, 22nd Oct 2022</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ ...FONTS.h3, marginVertical: SIZES.padding / 8, color: COLORS.black, fontWeight: '600' }}>
                            FA0 - BRS - FAO - VLC - FAO
                        </Text>
                        <View style={{
                            marginLeft: SIZES.padding * 1.75,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ color: COLORS.black }}>13:05z</Text>
                            <Image style={{ marginHorizontal: SIZES.padding / 4 }} source={icons.smallAeroplan} />
                            <Text style={{ color: COLORS.black }}>22:25z</Text>

                        </View>
                    </View>
                    <Image
                        style={{
                            marginVertical: SIZES.padding / 8
                        }}
                        source={icons.combinedShape}
                    />
                    <Text style={{ ...FONTS.h4, marginVertical: SIZES.padding / 8, color: COLORS.black, }}>
                        OFF
                    </Text>
                </View>

            </View>

            {
                isOpen && (
                    <View style={{
                        borderColor: COLORS.red,
                        borderWidth: 1
                    }}>

                    </View>
                )
            }

            <View style={{
                borderWidth: .5,
                borderColor: COLORS.darkGray,
                marginVertical: SIZES.padding / 2
            }}></View>
        </>
    )
}
