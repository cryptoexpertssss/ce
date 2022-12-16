import { Box, Button, Container, Modal, Skeleton, Text } from '@mantine/core';
import { ReactElement, useEffect, useState } from 'react';
import Iconify from '../../components/others/Iconify';
import Page from '../../components/others/Page';
import Layout from '../../layouts';
import { AuthUser } from '../../models/model.authuser';
import { createSubsciption, goToCutomerPortal } from '../../models_services/api_stripe';
import { getAuthUser } from '../../models_services/api_users';
import { useAuthStore } from '../../models_store/auth_store';
import { fDateTimeSuffix } from '../../utils/format_time';
import {
  STRIPE_MONTHLY_PRODUCT_LIVE,
  STRIPE_MONTHLY_PRODUCT_TEST,
  STRIPE_YEARLY_PRODUCT_TEST,
  USE_LIVE_STRIPE_API
} from '../../constants/app_constants';

export default function YourAccountPage() {
  const [authUser, setAuthuser] = useState<AuthUser | null>(null);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { isAuthenticated, isInitialized } = useAuthStore((state) => state);

  async function initGetAuthUser() {
    setAuthuser(await getAuthUser());
    setIsLoadingInit(false);
  }

  function toggleUpgradeModal() {
    setIsUpgradeModalOpen((prev) => !prev);
  }

  async function createSubscriptionMonthly() {
    await createSubsciption(USE_LIVE_STRIPE_API == false ? STRIPE_MONTHLY_PRODUCT_TEST : STRIPE_MONTHLY_PRODUCT_LIVE);
  }

  async function createSubscriptionYearly() {
    await createSubsciption(USE_LIVE_STRIPE_API == false ? STRIPE_YEARLY_PRODUCT_TEST : STRIPE_MONTHLY_PRODUCT_LIVE);
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

          <Skeleton height={8} radius='xl' className='mt-10' />
          <Skeleton height={8} mt={6} radius='xl' />
          <Skeleton height={8} mt={6} width='70%' radius='xl' />
        </Container>
      </Page>
    );
  }

  return (
    <Page title='Your Account'>
      <Modal size='xl' centered opened={isUpgradeModalOpen} onClose={toggleUpgradeModal}>
        <Box className='flex items-center xs:flex-col md:flex-row'>
          <Box className='pr-4 xs:w-full md:w-1/2'>
            <Text className='mb-6 text-xl font-bold'>Upgrade to Signally Premium</Text>
            <Text>More productivity, more powerful. Unlock productivity for your trading</Text>
            <Text className='my-4'>Here what you get with premium</Text>

            <Box className='flex items-start my-4'>
              <Iconify className='xs:h-6 xs:w-6 md:h-10 md:w-10' icon={'heroicons-solid:sun'} />
              <Text className='ml-4'>
                Create with ease thanks to <strong>Magic Resize, Background Remover </strong> and <strong>premium animations</strong>{' '}
              </Text>
            </Box>

            <Box className='flex items-start my-4'>
              <Iconify className='xs:h-6 xs:w-6 md:h-10 md:w-10' icon={'heroicons-solid:sun'} />
              <Text className='ml-4'>
                Create with ease thanks to <strong>Magic Resize, Background Remover </strong> and <strong>premium animations</strong>{' '}
              </Text>
            </Box>

            <Box className='flex items-start my-4'>
              <Iconify className='xs:h-6 xs:w-6 md:h-10 md:w-10' icon={'heroicons-solid:sun'} />
              <Text className='ml-4'>
                Create with ease thanks to <strong>Magic Resize, Background Remover </strong> and <strong>premium animations</strong>{' '}
              </Text>
            </Box>

            <Text className='my-4'>
              <strong>Cancel any time.</strong>
              We’ll remind you 3 days before your trial ends.
            </Text>
          </Box>

          <Box className='flex flex-col items-center justify-center xs:w-full md:w-1/2'>
            <Button onClick={createSubscriptionMonthly} className='btn-app w-[220px] text-center h-14'>
              Subscribe to monthly <br /> $29.99 / month
            </Button>
            <Button onClick={createSubscriptionYearly} className='btn-app w-[220px] text-center h-14 mt-6'>
              Subscribe to Yearly <br /> $199.99 / Year (Save 50%)
            </Button>
          </Box>
        </Box>
      </Modal>

      <Container className='pt-4 ' size={'xl'}>
        <Text className='mb-2 text-2xl font-bold'>Your account</Text>
        <Text className='mb-10 text-md'>{authUser?.email}</Text>

        {/* <Text className='mb-3 text-lg font-bold'>Profile Photo</Text>

        <Box className='flex items-center xs:justify-center xs:flex-col md:flex-row'>
          <Box className='flex items-center justify-center bg-green-400 rounded-full h-28 w-28'>
            <Text className='text-2xl'>DD</Text>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button className='btn-delete w-[200px] mr-2'>Remove photo</Button>
          <Button onClick={initGetAuthUser} className='btn-app w-[200px]'>
            Change Photo
          </Button>
        </Box> */}

        {/* <Divider className='my-8' />
        <Text className='mb-2 text-lg font-bold'>Username</Text>
        <Box className='flex items-center '>
          <Text className='text-md'>{authUser?.getName}</Text>
          <Box sx={{ flexGrow: 1 }} />
          <Button className='btn-app w-[200px]'>Edit</Button>
        </Box> */}

        {/* <Divider className='my-8' /> */}
        <Text className='mb-2 text-lg font-bold'>Subscription</Text>
        <Box className='flex items-center '>
          {authUser?.getHasSubscription && (
            <Box>
              <Text className='text-md'>You have an active {authUser.getHasSubscriptionString} subscription</Text>
              {authUser.getHasSubscriptionString !== 'Lifetime' && (
                <Text className='text-md'>Your subcription ends on {fDateTimeSuffix(authUser.getSubscriptionEndDate)}</Text>
              )}
              {authUser.getHasSubscriptionString === 'Lifetime' && (
                <Text className='text-md'>Your lifetime subscription that never expires</Text>
              )}
            </Box>
          )}
          {authUser?.getHasSubscription === false && <Text className='text-md'>Please upgrade to unlock premium features</Text>}
          <Box sx={{ flexGrow: 1 }} />

          {authUser?.getHasSubscriptionString === 'Stripe' && (
            <Button onClick={goToCutomerPortal} className='btn-app w-[200px]'>
              Manage Subscription
            </Button>
          )}

          {authUser?.getHasSubscription === false && (
            <Button onClick={toggleUpgradeModal} className='btn-app w-[200px]'>
              Upgrade
            </Button>
          )}
        </Box>
      </Container>
    </Page>
  );
}

YourAccountPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='landing'>{page}</Layout>;
};
