import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#1693a5'
        },
        secondary: {
            main: '#7ececa'
        },
        error: {
            main: red.A400
        }
    }
})