import { Box, Button, Container, Input, Pagination, Text, TextInput } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { showNotification } from '@mantine/notifications';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { Edit, Trash } from 'tabler-icons-react';
import Iconify from '../../components/others/Iconify';
import Page from '../../components/others/Page';
import { BaseTable } from '../../components/tables/BaseTable';
import Layout from '../../layouts';
import { Signal } from '../../models/model.signal';
import { apiDeleteSignal } from '../../models_services/firestore_service';
import { useFirestoreStoreAdmin } from '../../models_store/firestore_store_admin';
import { fDate, fDateTimeSuffix } from '../../utils/format_time';
import { numToPrecision } from '../../utils/number_format';
import { useBreakpoint } from '../../utils/use_breakpoint';

const columnHelper = createColumnHelper<Signal>();

const columns = [
  columnHelper.accessor('entryDatetime', {
    header: 'Date',
    cell: (info) => fDate(info.getValue()),
    size: 170
  }),

  columnHelper.accessor('isActive', {
    header: `Active`,
    cell: (info) => <Text>{info.getValue() ? 'Yes' : 'No'}</Text>
  }),
  columnHelper.accessor('isFree', {
    header: 'Free',
    cell: (info) => <Text>{info.getValue() ? 'Yes' : 'No'}</Text>
  }),
  columnHelper.accessor('entryType', {
    header: 'Type',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('market', {
    header: 'Market',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('symbol', {
    header: 'Symbol',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('entry', {
    header: 'Entry',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('stopLoss', {
    header: 'Stop Loss',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('takeProfit1', {
    header: 'Take Profit',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('takeProfit2', {
    header: 'Take Profit',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('takeProfit3', {
    header: 'Take Profit',
    cell: (info) => info.getValue()
  }),

  columnHelper.accessor('id', {
    header: 'Action',
    cell: (info) => (
      <Box className='flex items-center justify-center '>
        <TableActions id={info.row.original.id} />
      </Box>
    )
  })
];

export default function SignalsIndexPage() {
  const signals = useFirestoreStoreAdmin((state) => state.signals);
  const { isAuthenticated, isInitialized } = useFirestoreStoreAdmin((state) => state);

  if (!isAuthenticated) return null;

  return (
    <Page title='Signals'>
      <Container size='xl' className=''>
        <Box className='flex items-center justify-between mt-10 mb-5 text-center'>
          <Text className='text-xl font-semibold leading-10'>Signals</Text>
          <NextLink href='/signals/create'>
            <Button type='submit' variant='white' className='text-black transition border-0 bg-app-yellow hover:bg-opacity-90'>
              New signal
            </Button>
          </NextLink>
        </Box>

        <BaseTable data={signals} columns={columns} />
      </Container>
    </Page>
  );
}

SignalsIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='admin'>{page}</Layout>;
};

/* ----------------------------- NOTE FUNCTIONS ----------------------------- */

function TableActions({ id }: { id: string }) {
  const router = useRouter();
  const modals = useModals();

  const handleDelete = async (modalId: string) => {
    modals.closeModal(modalId);
    try {
      await apiDeleteSignal(id);
      showNotification({ title: 'Success', message: 'Signal deleted', autoClose: 6000 });
    } catch (error) {
      showNotification({ color: 'red', title: 'Error', message: 'There was an error deleting the signal', autoClose: 6000 });
    }
  };

  const openDeleteModal = () => {
    const modalId = modals.openModal({
      title: 'Are you sure you want to proceed?',
      centered: true,
      children: (
        <>
          <Text size='sm'>Delete this signal? This action cannot be undone.</Text>
          <Box className='flex justify-end mt-6'>
            <Button
              variant='outline'
              className='mx-2 border w-min border-light-800 text-dark-400'
              fullWidth
              onClick={() => modals.closeModal(modalId)}
              mt='md'>
              No don't delete it
            </Button>

            <Button className='mx-2 w-min btn-delete' fullWidth onClick={() => handleDelete(modalId)} mt='md'>
              Delete signal
            </Button>
          </Box>
        </>
      )
    });
  };

  return (
    <Box className='flex'>
      <Edit size={20} className='mr-2 cursor-pointer text-app-yellow' onClick={() => router.push(`/signals/${id}`)} />{' '}
      <Trash size={20} className='text-red-400 cursor-pointer' onClick={openDeleteModal} />
    </Box>
  );
}
