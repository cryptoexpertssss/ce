import { Box, Button, Container, Text } from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';

import { Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import Page from '../../components/others/Page';
import AuthGuard from '../../guards/AuthGuard';
import Layout from '../../layouts';
import { AuthUser } from '../../models/model.authuser';
import { getAuthUser } from '../../models_services/api_users';
import { useAuthStore } from '../../models_store/auth_store';

export default function YourAccountPage() {
  const [authUser, setAuthuser] = useState<AuthUser | null>(null);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);
  const router = useRouter();

  function toToAccountPage() {
    router.push('/your-account');
  }

  async function initGetAuthUser() {
    setAuthuser(await getAuthUser());
    setIsLoadingInit(false);
  }

  useEffect(() => {
    initGetAuthUser();
  }, []);

  if (!isAuthenticated) return null;

  if (isLoadingInit) {
    return (
      <Page title='Your Account'>
        <Container className='pt-4 ' size={'xl'}>
          <Skeleton height={50} circle mb='xl' />
          <Skeleton height={8} radius='xl' />
          <Skeleton height={8} mt={6} radius='xl' />
          <Skeleton height={8} mt={6} width='70%' radius='xl' />

          <Skeleton height={8} radius='xl' className='mt-10' />
          <Skeleton height={8} mt={6} radius='xl' />
          <Skeleton height={8} mt={6} width='70%' radius='xl' />

          <Skeleton height={8} radius='xl' className='mt-10' />
          <Skeleton height={8} mt={6} radius='xl' />
          <Skeleton height={8} mt={6} width='70%' radius='xl' />
        </Container>
      </Page>
    );
  }

  return (
    <Page title='Your Account'>
      <Container className='pt-4 ' size={'xl'}>
        <Box className='flex flex-col items-center'>
          <Text className='text-2xl mb-10 mt-10 font-bold'>Your account</Text>
          <Text className='text-lg mb-2'>{authUser?.email}</Text>

          {authUser?.subStripeStatus === 'active' && <Text className='text-lg mb-8'>You have an active subscription</Text>}
          {authUser?.subStripeStatus !== 'active' && <Text className='text-lg mb-8'>Please upgrade to unlock premium features</Text>}

          <Button onClick={toToAccountPage} className='btn-app w-[200px]'>
            Go to account page
          </Button>
        </Box>
      </Container>
    </Page>
  );
}

YourAccountPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='landing'>{page}</Layout>;
};
