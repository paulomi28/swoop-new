import React, { useContext, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, View, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { ThemeContext } from '../Contexts/ThemeContext';
import { AuthContext } from '../Contexts/AuthContext';

export default function DeleteAccountConfirmationScreen({ route, navigation }: any) {
    const { isDark } = useContext(ThemeContext)

    const [loading, setLoading] = useState(false)
    const { reason } = route.params;

    const { user, logout } = useContext(AuthContext)


    const deleteAccount = async () => {
        setLoading(true);
        try {
            var myHeaders = new Headers();
            myHeaders.append("key", "2b223e5cee713615ha54ac203b24e9a123754yuVT");
            myHeaders.append("token", "PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo");
            myHeaders.append("Authorization", `Bearer ${user?.token} `);

            var formdata = new FormData();
            formdata.append("user_id", user.user_id);
            formdata.append("delete_reason", reason);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            var res = await fetch("https://client.appmania.co.in/Swoop/api/deleteAccount", requestOptions).then(response => response.json())

            setLoading(false);
            if (res.ResponseCode == 0) return Alert.alert('Error', res.ResponseMsg);

            if (res.ResponseCode == 1) {
                logout()
            }
        } catch (error) {
            console.log(error)
        }
    }




    if (loading) return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray,
    }}><ActivityIndicator size={'large'} color={isDark ? COLORS.golden : COLORS.black} /></View>




    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray, paddingTop: SIZES.padding * 3 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>Are you sure?</Text>
                <Text style={{ ...FONTS.h4, textAlign: 'center', marginHorizontal: SIZES.padding * 2, marginVertical: SIZES.padding / 2, color: isDark ? COLORS.golden : COLORS.black }}>Do you  really want to delete these records?
                    This process cannot be undone.</Text>
                <View style={{
                    marginVertical: SIZES.padding,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: SIZES.width * 0.6
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: isDark ? COLORS.lightGolden : COLORS.black }}>No</Text>
                            <Image
                                source={isDark ? icons.ic_close_dark : icons.ic_close_light}
                                style={{ width: 27, height: 27, marginLeft: SIZES.padding }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteAccount()}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...FONTS.h3, color: isDark ? COLORS.lightGolden : COLORS.black }}>Yes</Text>
                            <Image
                                source={isDark ? icons.ic_check_light_dark : icons.ic_check_light}
                                style={{ width: 27, height: 27, marginLeft: SIZES.padding }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}