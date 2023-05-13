import React, { useContext, useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { ThemeContext } from '../Contexts/ThemeContext';
import OtpInputs from 'react-native-otp-inputs';

const ForgotPasswordScreen = ({ navigation }: any) => {

    const [index, setIndex] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [loading, setLoading] = useState(false);

    const [pin, setPin] = useState("")

    const { isDark } = useContext(ThemeContext)



    const sendOtp = async () => {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const result: boolean = expression.test(email); // true
        if (!result) return Alert.alert("Please input valid e-mail!")

        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("key", "2b223e5cee713615ha54ac203b24e9a123754yuVT");

        var formdata = new FormData();
        formdata.append("email", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        var res = await fetch("https://client.appmania.co.in/Swoop/api/forgotPassword", requestOptions).then(async (res) => await res.json())
        setLoading(false);
        if (res.ResponseCode == 0) return Alert.alert('Error', res.ResponseMsg);

        if (res.ResponseCode == 1) {
            return setIndex(index + 1)
        }
    }

    const verifyOtp = async () => {
        if (pin.length < 4) return Alert.alert("Please enter valid otp!")
        setLoading(true);

        var myHeaders = new Headers();
        myHeaders.append("key", "2b223e5cee713615ha54ac203b24e9a123754yuVT");

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("otp", pin);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        var res = await fetch("https://client.appmania.co.in/Swoop/api/verifyOTP", requestOptions).then(async (res) => await res.json())
        setLoading(false);
        if (res.ResponseCode == 0) return Alert.alert('Error', res.ResponseMsg);

        if (res.ResponseCode == 1) {
            return setIndex(index + 1)
        }
    }




    const resendOtp = async () => {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("key", "2b223e5cee713615ha54ac203b24e9a123754yuVT");

        var formdata = new FormData();
        formdata.append("email", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        var res = await fetch("https://client.appmania.co.in/Swoop/api/sendOTP", requestOptions).then(async (res) => await res.json())
        setLoading(false);
        if (res.ResponseCode == 0) return Alert.alert('Error', res.ResponseMsg);

        if (res.ResponseCode == 1) {
            return Alert.alert('Error', res.ResponseMsg);
        }
    }




    const updatePassword = async () => {
        if (password.length < 6) return Alert.alert("Password must be grater than 6 character.")
        if (password !== confirmPassword) return Alert.alert("Password and Confirm Password must be same.")



        var myHeaders = new Headers();
        myHeaders.append("key", "2b223e5cee713615ha54ac203b24e9a123754yuVT");

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        var res = await fetch("https://client.appmania.co.in/Swoop/api/forgotPassUpdate", requestOptions).then(response => response.json())

        setLoading(false);
        if (res.ResponseCode == 0) return Alert.alert('Error', res.ResponseMsg);

        if (res.ResponseCode == 1) {
            return Alert.alert("", "Your password has been changed successfully you can now login.",
                [

                    { text: 'Login', onPress: () => navigation.navigate("LoginScreen") },
                ]
            )
        }


    }

    function renderHeader() {
        switch (index) {
            case 0:
                return (
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
                            <TouchableOpacity onPress={() => { sendOtp() }}>
                                <Image
                                    source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                                    style={{ width: 28, height: 28 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: SIZES.padding }}>
                            <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>Forgot Password</Text>
                            <Text style={{ ...FONTS.body5, color: isDark ? COLORS.golden : COLORS.black }}>Please enter your email address to receive a verification code.
                            </Text>
                        </View>
                    </View>
                )
            case 1:
                return (
                    <View style={{ marginHorizontal: SIZES.padding, }}>
                        <View
                            style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity onPress={() => setIndex(index - 1)}>
                                <Image
                                    source={isDark ? icons.ic_back_dark : icons.ic_back_light}
                                    style={{ width: 28, height: 28 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { verifyOtp() }}>
                                <Image
                                    source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                                    style={{ width: 28, height: 28 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: SIZES.padding }}>
                            <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>OTP Authentication</Text>
                            <Text style={{ ...FONTS.body5, color: isDark ? COLORS.golden : COLORS.black }}>Please enter the 4 digit code sent to
                                {" " + email}
                            </Text>
                        </View>
                    </View>
                )
            case 2:
                return (
                    <View style={{ marginHorizontal: SIZES.padding, }}>
                        <View
                            style={{
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity onPress={() => setIndex(index - 1)}>
                                <Image
                                    source={isDark ? icons.ic_back_dark : icons.ic_back_light}
                                    style={{ width: 28, height: 28 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { updatePassword() }}>
                                <Image
                                    source={isDark ? icons.ic_check_dark : icons.ic_check_light}
                                    style={{ width: 28, height: 28 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: SIZES.padding }}>
                            <Text style={{ ...FONTS.h1, color: isDark ? COLORS.golden : COLORS.black }}>Reset password</Text>
                            <Text style={{ ...FONTS.body5, color: isDark ? COLORS.golden : COLORS.black }}>Your new password must be different from previously
                                used password.
                            </Text>
                        </View>
                    </View>
                )
            default:
                return null
        }


    }



    function renderBottomPart() {
        switch (index) {
            case 0:
                return (
                    <View style={styles.bottomPart}>
                        <Text style={{ ...FONTS.body4, color: isDark ? COLORS.golden : COLORS.black }}>You remember your password? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={{ ...FONTS.body4, color: COLORS.red, textDecorationLine: 'underline' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                )
            case 1:
                return (
                    <View style={styles.bottomPart}>
                        <Text style={{ ...FONTS.body4, color: isDark ? COLORS.golden : COLORS.black }}>Didn't receive the code?  </Text>
                        <TouchableOpacity onPress={() => resendOtp()}>
                            <Text style={{ ...FONTS.body4, color: COLORS.red, textDecorationLine: 'underline' }}>Resend</Text>
                        </TouchableOpacity>
                    </View>
                )
            default:
                return null
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
            {renderHeader()}
            <Swiper
                onIndexChanged={(index) => setIndex(index)}
                index={index}
                style={{ marginHorizontal: SIZES.padding, }}
                loop={false}
                showsPagination={false}
                scrollEnabled={false}
            >



                <View style={{ flex: 1 }}>
                    <View
                        style={styles.inputFieldComponent}>
                        <Image
                            source={isDark ? icons.ic_email_dark : icons.ic_email_light}
                            style={{ width: 24, height: 24 }}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            cursorColor={isDark ? COLORS.gray : COLORS.black}
                            style={[styles.inputField, { color: isDark ? COLORS.gray : COLORS.black }]}
                            placeholderTextColor={isDark ? COLORS.gray : COLORS.black}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginRight: SIZES.padding * 2,
                }}>
                    <OtpInputs
                        autofillFromClipboard={true}
                        numberOfInputs={4}
                        inputStyles={{
                            padding: 0,
                            textAlign: 'center',
                            ...FONTS.h1,
                            color: isDark ? COLORS.gray : COLORS.black
                        }}
                        placeholder="0"
                        cursorColor={isDark ? COLORS.gray : COLORS.black}
                        placeholderTextColor={isDark ? COLORS.gray : COLORS.black}
                        inputContainerStyles={{ marginHorizontal: SIZES.padding, }}
                        handleChange={(otpCode) => setPin(otpCode)}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View
                        style={styles.inputFieldComponent}>
                        <Image
                            source={isDark ? icons.ic_lock_dark : icons.ic_lock_light}
                            style={{ width: 24, height: 24 }}
                        />
                        <TextInput
                            placeholder="New Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                            cursorColor={isDark ? COLORS.gray : COLORS.black}
                            style={[styles.inputField, { color: isDark ? COLORS.gray : COLORS.black }]}
                            placeholderTextColor={isDark ? COLORS.gray : COLORS.black}
                        />
                    </View>
                    <View
                        style={styles.inputFieldComponent}>
                        <Image
                            source={isDark ? icons.ic_lock_dark : icons.ic_lock_light}
                            style={{ width: 24, height: 24 }}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            secureTextEntry={true}
                            onChangeText={text => setConfirmPassword(text)}
                            cursorColor={isDark ? COLORS.gray : COLORS.black}
                            style={[styles.inputField, { color: isDark ? COLORS.gray : COLORS.black }]}
                            placeholderTextColor={isDark ? COLORS.gray : COLORS.black}
                        />
                    </View>
                </View>

            </Swiper>
            {renderBottomPart()}
        </View>
    );
};

export default ForgotPasswordScreen;


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
        alignItems: 'center',
        marginVertical: SIZES.padding
    },
    inputField: {
        marginLeft: SIZES.padding,
        ...FONTS.h3,
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






