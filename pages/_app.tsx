import { StylesProvider, ThemeProvider as MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React, { ReactElement, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import Head from 'next/head';
import theme from '../lib/theme';

export default function App({ Component, pageProps }: AppProps): ReactElement {
    // clear Server-Side injected CSS for Material-UI
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <StylesProvider injectFirst>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    {/* <Head></Head> */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    );
}
