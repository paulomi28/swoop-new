import React, { useContext, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { ThemeContext } from '../Contexts/ThemeContext';
import { AuthContext } from '../Contexts/AuthContext';

export default function ContactUsScreen({ navigation }: any) {

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');


    const { isDark } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)






    const sendMessage = async () => {
        if (!name || !email || !subject || !message) return Alert.alert('Please fill all the fields')


        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("key", "2b223e5cee713615ha54ac203b24e9a123754yuVT");
        myHeaders.append("token", "PmUYTPFGbtehfbKt7WekfgRQS5UpVBPo");
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("subject", subject);
        formdata.append("message", message);
        formdata.append("user_id", user.user_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        var res = await fetch("https://client.appmania.co.in/Swoop/api/contactUs", requestOptions).then(response => response.json())


        setLoading(false);
        if (res.ResponseCode == 0) return Alert.alert('Error', res.ResponseMsg);

        if (res.ResponseCode == 1) {
            Alert.alert('Success', res.ResponseMsg)
            navigation.goBack()
        }
    }


    if (loading) return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? COLORS.bgBlack : COLORS.gray,
    }}><ActivityIndicator size={'large'} color={isDark ? COLORS.golden : COLORS.black} /></View>



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
                    <TouchableOpacity onPress={() => { sendMessage() }}>
                        <Image
                            source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                            style={{ width: 28, height: 28 }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: SIZES.padding }}>
                    <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>Contact Us</Text>
                </View>
            </View>
            <View style={styles.midPart}>
                <View style={styles.form}>
                    <View
                        style={styles.inputFieldComponent}>
                        <Image
                            style={{ width: 27, height: 27 }}
                            source={isDark ? icons.ic_user_dark : icons.ic_user_light}
                        />
                        <TextInput
                            placeholder="Name"
                            style={styles.inputField}
                            placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}
                            onChangeText={value => {
                                setName(value);
                            }}
                            value={name}
                        />
                    </View>
                    <View
                        style={styles.inputFieldComponent}>
                        <Image
                            style={{ width: 27, height: 27 }}
                            source={isDark ? icons.ic_email_dark : icons.ic_email_light}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.inputField}
                            placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}
                            onChangeText={value => {
                                setEmail(value);
                            }}
                            value={email}
                        />
                    </View>
                    <View
                        style={styles.inputFieldComponent}>
                        <Image
                            source={isDark ? icons.ic_lock_dark : icons.ic_lock_light}
                            style={{ width: 27, height: 27 }}
                        />
                        <TextInput
                            placeholder="Subject"
                            style={styles.inputField}
                            placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}
                            onChangeText={value => {
                                setSubject(value);
                            }}
                            value={subject}
                        />
                    </View>

                    <View
                        style={styles.inputFieldComponent}>
                        <Image
                            source={isDark ? icons.ic_comment_dark : icons.ic_comment_light}
                            style={{ width: 27, height: 27 }}
                        />
                        <TextInput
                            placeholder="Message"
                            style={styles.inputField}
                            placeholderTextColor={isDark ? COLORS.golden : COLORS.darkGray}
                            onChangeText={value => {
                                setMessage(value);
                            }}
                            value={message}
                        />
                    </View>

                </View>

            </View>
            <View style={styles.bottomPart}>


            </View>
        </View>

    )
}


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






