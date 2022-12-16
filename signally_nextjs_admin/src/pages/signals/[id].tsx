import { Box, Container, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Page from '../../components/others/Page';
import SignalForm from '../../components/forms/SignalForm';
import Layout from '../../layouts';

import { useFirestoreStoreAdmin } from '../../models_store/firestore_store_admin';

export default function PageX() {
  const router = useRouter();
  const id = router.query.id as string;
  const { isAuthenticated, isInitialized } = useFirestoreStoreAdmin((state) => state);

  if (!isAuthenticated) return null;

  return (
    <Page title='Contact'>
      <Container size='xl' className=''>
        <Box className='flex flex-col w-full mx-auto mt-20 mb-10'>
          <Text className='text-xl font-semibold leading-10'>Update signal</Text>
        </Box>

        <SignalForm id={id} />
      </Container>
    </Page>
  );
}

PageX.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='admin'>{page}</Layout>;
};
