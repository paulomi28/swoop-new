import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#7F5DF0",     // Light purple
    secondary: "#5D2DFD",   // Dark purple

    white: "#fff",
    black: "#000000",
    lightBlue: '#607296',
    bgBlack: "#0B0C11",
    red: "#EA4335",
    gray: "#D2D8E5",
    golden: "#96845F",
    lightGolden: "#D3C7AD",
    bgGray: "#1D2026",
    darkGray: "#676767",
    lightGray1: "#f5f6fa",
    blue: "#1877F2"
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
export const FONTS = {
    h1: { fontFamily: 'System', fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: 'System', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'System', fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily:'System', fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: 'System', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'System', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'System', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'System', fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: 'System', fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;