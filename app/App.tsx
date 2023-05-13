import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { ThemeContextProvider } from './Contexts/ThemeContext'
import RootStack from './routes/RootStack'
import { AuthContextProvider } from './Contexts/AuthContext'


export default function App() {

    useEffect(() => {
        SplashScreen.hide();
    }, [])

    return (
        <>
            <AuthContextProvider>
                <ThemeContextProvider>
                    <RootStack />
                </ThemeContextProvider>
            </AuthContextProvider>
        </>
    )
}
