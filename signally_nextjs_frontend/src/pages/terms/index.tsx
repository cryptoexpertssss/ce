import { Container } from '@mantine/core';
import { ReactElement } from 'react';

import Page from '../../components/others/Page';
import { privacyPolicy } from '../../data/static/privacy_data';
import { terms } from '../../data/static/terms_data';
import Layout, { ILayoutProps } from '../../layouts';
import { useAuthStore } from '../../models_store/auth_store';
import { LandingFooter } from '../../containers/LandingFooter';

export default function TermsPage({ variant = 'landing' }: ILayoutProps): ReactElement {
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);
  return (
    <Page title='Privacy'>
      <Layout variant={variant}>
        <Container className='pt-10 mb-20' size={'xl'}>
          {terms?.map((item) => (
            <div key={item.id} className='mb-8 order-list-enable last:mb-0 lg:mb-10'>
              <h3 className='mb-4 text-lg font-medium text-dark dark:text-light lg:mb-5'>{item.title}</h3>
              <div
                className='space-y-5 leading-6 '
                dangerouslySetInnerHTML={{
                  __html: item.description
                }}
              />
            </div>
          ))}
        </Container>
        {!isAuthenticated && <LandingFooter />}
      </Layout>
    </Page>
  );
}
