import { Container } from '@mantine/core';
import { ReactElement } from 'react';
import SignInForm from '../../components/forms/SignInForm';
import SignUpForm from '../../components/forms/SignUpForm';
import Page from '../../components/others/Page';
import AuthGuard from '../../guards/AuthGuard';
import Layout from '../../layouts';

export default function SignUpPage() {
  return (
    <Page title='Signup'>
      <Container size='xl' className='flex justify-center items-center h-[75vh]'>
        <SignUpForm />
      </Container>
    </Page>
  );
}

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant='landing'>
      <AuthGuard>{page}</AuthGuard>
    </Layout>
  );
};
