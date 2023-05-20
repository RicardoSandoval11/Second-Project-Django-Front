import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from '@mui/material';
import { blueTheme } from "./blueTheme";


export const BlogTheme = ({ children }) => {
    return (
        <ThemeProvider theme={blueTheme}>
            <CssBaseline/>
            { children }
        </ThemeProvider>
    )
}