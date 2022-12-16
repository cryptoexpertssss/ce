import { Container } from '@mantine/core';
import { ReactElement } from 'react';
import SignInForm from '../../components/forms/SignInForm';
import SignUpForm from '../../components/forms/SignUpForm';
import Page from '../../components/others/Page';
import AuthGuard from '../../guards/AuthGuard';
import Layout from '../../layouts';

export default function SignInPage() {
  return (
    <Page title='Signin'>
      <Container size='xl' className='flex justify-center items-center h-[75vh]'>
        <SignInForm />
      </Container>
    </Page>
  );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant='landing'>
      <AuthGuard>{page}</AuthGuard>
    </Layout>
  );
};
