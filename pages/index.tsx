import { AppBar, Box, Button, Grid, Link, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import Head from 'next/head';

const SelectableTypography = styled(Typography)<{ $selected?: boolean }>`
    border-bottom: 0px solid ${({ theme }) => theme.palette.secondary.main};
    padding-bottom: 0px;

    ${({ $selected }) =>
        $selected &&
        css`
            color: ${({ theme }) => theme.palette.primary.main};
            padding-bottom: 5px;
            border-bottom: 2px solid ${({ theme }) => theme.palette.secondary.main};
        `}

    transition: border-bottom 0.1s ease-in-out, padding-bottom 0.1s ease-in-out, color 0.1s ease-in-out;
`;

const PreserveTextButton = styled(Button)`
    text-transform: none;
`;

function useHash(): [string, (hash: string) => void] {
    const [hash, setHash] = useState('');

    const onHashChange = useCallback(() => setHash(window.location.hash.substr(1)), []);
    const setLocationHash = useCallback((hash: string) => {
        setHash(hash);
        window.location.hash = hash;
    }, []);

    useEffect(() => {
        onHashChange();

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, [onHashChange]);

    return [hash, setLocationHash];
}

function toSentenceCase(s: string): string {
    return s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
}

export default function Index(): ReactElement {
    const [hash, setHash] = useHash();

    return (
        <div>
            <Head>
                <title>Jonathan Kula: {toSentenceCase(hash || 'about')}</title>
            </Head>
            <AppBar color="inherit" position="sticky" variant="elevation" elevation={2}>
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Box width="fit-content">
                                <PreserveTextButton variant="text" onClick={() => setHash('')}>
                                    <SelectableTypography
                                        $selected={!/projects|fun|contact|resume/.test(hash)}
                                        variant="h4"
                                    >
                                        Jonathan Kula
                                    </SelectableTypography>
                                </PreserveTextButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Tabs value={hash} onChange={(_, v) => setHash(v)}>
                                <Tab label="Projects" value="projects" />
                                <Tab label="Fun Stuff" value="fun" />
                                <Tab label="Contact" value="contact" />
                                <Tab label="Resume" value="resume" />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
