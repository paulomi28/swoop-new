import React, {
    createContext,
    useState
} from 'react'

interface IThemeContext {
    isDark: boolean;
    toggleDark?: () => void;
}

const defaultState = {
    isDark: false,
};

export const ThemeContext = createContext<IThemeContext>(defaultState)


export const ThemeContextProvider = ({ children }: any) => {

    const [isDark, setIsDark] = useState(defaultState.isDark)
    const toggleDark = () => setIsDark(!isDark)

    return (
        <ThemeContext.Provider value={{ isDark, toggleDark }} >{children}</ThemeContext.Provider>
    )

}