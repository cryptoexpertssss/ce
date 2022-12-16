import { Container } from '@mantine/core';
import { ReactElement } from 'react';
import ResetPasswordForm from '../../components/forms/ResetPasswordForm';
import SignInForm from '../../components/forms/SignInForm';
import SignUpForm from '../../components/forms/SignUpForm';
import Page from '../../components/others/Page';
import AuthGuard from '../../guards/AuthGuard';
import Layout from '../../layouts';

export default function ResetPasswordPage() {
  return (
    <Page title='Signup'>
      <Container size='xl' className='flex justify-center items-center h-[75vh]'>
        <ResetPasswordForm />
      </Container>
    </Page>
  );
}

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant='landing'>
      <AuthGuard>{page}</AuthGuard>
    </Layout>
  );
};
