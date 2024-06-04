import {
    createTheme,
    PaletteColor,
    TypeBackground,
    TypeText,
  } from "@mui/material/styles";
  
  import { Color } from "@mui/material";
  import colors from "./colorsTheme";
  
  declare module "@mui/material/styles" {
    interface Palette {
      primary: PaletteColor;
      secondary: PaletteColor;
      warning: PaletteColor;
      background: TypeBackground;
      white: string;
      black: string;
      grey: Color;
      grey_2: string;
      grey_3: string;
      text: TypeText;
      chip: { [key: string]: string };
      form: { background: string };
      yellow: string;
    }
    type PaletteOptions = Partial<Palette>;
  }
  
  const defaultTheme = createTheme({
    breakpoints: {
      values: {
        xs: 689,
        sm: 1024,
        md: 1400,
        lg: 1700,
        xl: 0,
      },
    },
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  });
  
  export default createTheme(defaultTheme, {
    palette: {
      ...colors,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          primary: {
            "&:hover": {
              backgroundColor: colors.primary.dark,
            },
          },
          secondary: {
            "&:hover": {
              backgroundColor: colors.secondary.dark,
            },
          },
        },
      },
      MuiTouchRipple: {
        styleOverrides: {
          root: {
            color: colors.secondary.main,
          },
        },
      },
    },
  });