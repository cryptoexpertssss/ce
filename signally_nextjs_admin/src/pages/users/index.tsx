import { Box, Button, Container, Input, Pagination, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { showNotification } from '@mantine/notifications';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import Page from '../../components/others/Page';
import { BaseTable } from '../../components/tables/BaseTable';
import Layout from '../../layouts';
import { AuthUser } from '../../models/model.authuser';
import { apiUpdateUserLifetime } from '../../models_services/firestore_service';

import { useFirestoreStoreAdmin } from '../../models_store/firestore_store_admin';
import { fDate, fDateTimeSuffix } from '../../utils/format_time';
import { useBreakpoint } from '../../utils/use_breakpoint';

const columnHelper = createColumnHelper<AuthUser>();

const columns = [
  columnHelper.accessor('timestampCreated', {
    header: 'Created',
    cell: (info) => fDate(info.getValue())
  }),
  columnHelper.accessor('timestampLastLogin', {
    header: 'Last Login',
    cell: (info) => fDate(info.getValue())
  }),

  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue()
  }),

  columnHelper.accessor('getHasSubscription', {
    header: `Has subsciption`,
    cell: (info) => <Text>{info.getValue() ? 'Yes' : 'No'}</Text>
  }),

  columnHelper.accessor('id', {
    header: 'Life time sub',
    cell: (info) => (
      <Box className='flex items-center justify-center '>
        <TableActions authUser={info.row.original} />
      </Box>
    )
  })
];

export default function SignalsIndexPage() {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [itemsPerPage, setItemPerPage] = useState<number>(8);
  const [activePage, setActivePage] = useState(1);
  const authUsers = useFirestoreStoreAdmin((state) => state.authUsers);
  const [filteredAuthUsers, setFilteredAuthUser] = useState<AuthUser[]>([]);
  const { isAuthenticated, isInitialized } = useFirestoreStoreAdmin((state) => state);

  useEffect(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFilteredAuthUser(authUsers.slice(start, end));
  }, [activePage, itemsPerPage, authUsers]);

  useEffect(() => {
    if (authUsers && searchText) {
      let _authUsers = authUsers;

      _authUsers = authUsers.filter((user) => {
        return user.email.toLowerCase().includes(searchText.toLowerCase());
      });

      setFilteredAuthUser(_authUsers);
      setFilteredAuthUser(_authUsers.slice(0, itemsPerPage));
      setActivePage(1);
    }
  }, [searchText]);

  const bp = useBreakpoint();
  useEffect(() => {
    if (bp == 'xs') setItemPerPage(4);
    if (bp != 'xs') setItemPerPage(8);
  }, [bp]);

  const itemHeaderStyle = `dark:text-dark-900 text-[13px] xs:mb-2 sm:mb-2 xs:mr-3 sm:mr-0`;
  const itemBodyStyle = `font-bold text-sm`;

  if (!isAuthenticated) return null;

  return (
    <Page title='Contact'>
      <Container size='xl' className='mb-20'>
        <Box className='flex items-center justify-between mt-10 mb-5 text-center'>
          <Text className='text-xl font-semibold leading-10'>Users</Text>
          <NextLink href='/announcements/create'></NextLink>
        </Box>

        <BaseTable data={authUsers} columns={columns} />
      </Container>
    </Page>
  );
}

SignalsIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='admin'>{page}</Layout>;
};

function TableActions({ authUser }: { authUser: AuthUser }) {
  const router = useRouter();
  const modals = useModals();

  const handleSubLifetime = async (modalId: string, authUser: AuthUser) => {
    modals.closeModal(modalId);
    try {
      await apiUpdateUserLifetime(authUser.id, !authUser.subIsLifetime);
      showNotification({ title: 'Success', message: 'User updated', autoClose: 6000 });
    } catch (error) {
      showNotification({ color: 'red', title: 'Error', message: 'User updated', autoClose: 6000 });
    }
  };

  const openSubLifetimeModal = () => {
    const modalId = modals.openModal({
      title: 'Are you sure you want to proceed?',
      centered: true,
      children: (
        <>
          <Text size='sm'>Yes, update the users lifetime subcription.</Text>
          <Box className='flex mt-6'>
            <Button variant='outline' className='mx-2 w-min' fullWidth onClick={() => modals.closeModal(modalId)} mt='md'>
              No don't do it
            </Button>

            <Button className='mx-2 w-min btn-delete' fullWidth onClick={() => handleSubLifetime(modalId, authUser)} mt='md'>
              {authUser.subIsLifetime ? 'Disable' : 'Enable'}
            </Button>
          </Box>
        </>
      )
    });
  };

  return (
    <Box className='flex justify-start w-full'>
      <Button size='xs' className='rounded-2xl text-app-yellow border-app-yellow' onClick={openSubLifetimeModal} variant='outline'>
        {authUser.subIsLifetime ? 'Yes' : 'No'}
      </Button>
    </Box>
  );
}
