import { GetServerSidePropsContext, NextPage } from 'next';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import MotionLazyContainer from '../components/framer_motion/MotionLazyContainer';
import { ModalsProvider } from '@mantine/modals';
import '@stripe/stripe-js';
import '../../src/assets/styles/_global.scss';
import { useAuthStore } from '../models_store/auth_store';
import { initializeFirebaseClient } from '../_firebase/firebase_client';
import { useFirestoreStore } from '../models_store/firestore_store';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App(props: MyAppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const getLayout = Component.getLayout ?? ((page) => page);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 60 * 24 * 3000 });
  };

  useEffect(() => {
    const isDark = getCookie('mantine-color-scheme') || 'dark';
    if (isDark === 'dark') document.documentElement.classList.add('dark');
    if (isDark !== 'dark') document.documentElement.classList.remove('dark');
  }, [colorScheme]);

  const streamFirebaseUser = useAuthStore((state) => state.streamFirebaseUser);
  const { streamAuthUser } = useFirestoreStore((state) => state);
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);

  async function _initializeFirebaseClient() {
    await initializeFirebaseClient();
    streamFirebaseUser();
  }

  useEffect(() => {
    _initializeFirebaseClient();
  }, []);

  useEffect(() => {
    streamAuthUser();
  }, [isInitialized]);

  if (!isInitialized) return <div></div>;

  return (
    <>
      <Head>
        <title>Signally</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
          <MantineProvider theme={{ colorScheme, breakpoints }} withGlobalStyles withNormalizeCSS withCSSVariables>
            <NotificationsProvider>
              <MotionLazyContainer>
                {/*  */}
                {getLayout(<Component {...pageProps} />)}
                {/*  */}
              </MotionLazyContainer>
            </NotificationsProvider>
          </MantineProvider>
        </ModalsProvider>
      </ColorSchemeProvider>
    </>
  );
}

const breakpoints = { xs: 0, sm: 768, md: 992, lg: 1200, xl: 1400, '2xl': 1600 };

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark'
});
