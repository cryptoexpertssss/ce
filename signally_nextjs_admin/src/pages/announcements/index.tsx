import { Box, Button, Container, Input, Pagination, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import { showNotification } from '@mantine/notifications';
import { createColumnHelper } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { Edit, Trash } from 'tabler-icons-react';
import Page from '../../components/others/Page';
import { BaseTable } from '../../components/tables/BaseTable';
import Layout from '../../layouts';
import { Announcement } from '../../models/model.announcement';
import { apiDeleteAnnouncement } from '../../models_services/firestore_service';

import { useFirestoreStoreAdmin } from '../../models_store/firestore_store_admin';
import { fDate, fDateTimeSuffix } from '../../utils/format_time';
import { truncateText } from '../../utils/trancate_text';
import { useBreakpoint } from '../../utils/use_breakpoint';

const columnHelper = createColumnHelper<Announcement>();

const columns = [
  columnHelper.accessor('timestampCreated', {
    header: 'Date',
    cell: (info) => fDate(info.getValue()),
    size: 170
  }),

  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => info.getValue()
  }),
  columnHelper.accessor('description', {
    header: 'Desccition',
    cell: (info) => truncateText(info.getValue(), 50)
  }),
  columnHelper.accessor('link', {
    header: 'Link',
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

export default function AnnouncementIndexPage() {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [itemsPerPage, setItemPerPage] = useState<number>(8);
  const [activePage, setActivePage] = useState(1);
  const { announcements } = useFirestoreStoreAdmin((state) => state);
  const [filteredAnnouncement, setFilterAnounements] = useState<Announcement[]>([]);
  const { isAuthenticated, isInitialized } = useFirestoreStoreAdmin((state) => state);

  const itemHeaderStyle = `dark:text-dark-900 text-[13px] xs:mb-2 sm:mb-2 xs:mr-3 sm:mr-0`;
  const itemBodyStyle = `font-bold text-sm`;

  useEffect(() => {
    const start = (activePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFilterAnounements(announcements.slice(start, end));
  }, [activePage, itemsPerPage, announcements]);

  useEffect(() => {
    if (announcements && searchText) {
      let _announcements = announcements;

      _announcements = announcements.filter((signal) => {
        return signal.title.toLowerCase().includes(searchText.toLowerCase());
      });

      setFilterAnounements(_announcements);
      setFilterAnounements(_announcements.slice(0, itemsPerPage));
      setActivePage(1);
    }
  }, [searchText]);

  const bp = useBreakpoint();
  useEffect(() => {
    if (bp == 'xs') setItemPerPage(4);
    if (bp != 'xs') setItemPerPage(8);
  }, [bp]);

  if (!isAuthenticated) return null;

  return (
    <Page title='Contact'>
      <Container size='xl' className=''>
        <Box className='flex items-center justify-between mt-10 mb-5 text-center'>
          <Text className='text-xl font-semibold leading-10'>Announcements</Text>
          <NextLink href='/announcements/create'>
            <Button type='submit' variant='white' className='text-black transition border-0 bg-app-yellow hover:bg-opacity-90'>
              New Announcement
            </Button>
          </NextLink>
        </Box>

        <BaseTable data={announcements} columns={columns} />
      </Container>
    </Page>
  );
}

AnnouncementIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='admin'>{page}</Layout>;
};

function TableActions({ id }: { id: string }) {
  const router = useRouter();
  const modals = useModals();

  const handleDelete = async (modalId: string) => {
    modals.closeModal(modalId);
    try {
      await apiDeleteAnnouncement(id);
      showNotification({ title: 'Success', message: 'Announcement deleted', autoClose: 6000 });
    } catch (error) {
      showNotification({ color: 'red', title: 'Error', message: 'There was an error deleting the announcement', autoClose: 6000 });
    }
  };

  const openDeleteModal = () => {
    const modalId = modals.openModal({
      title: 'Are you sure you want to proceed?',
      centered: true,
      children: (
        <>
          <Text size='sm'>Delete this announcement? This action cannot be undone.</Text>
          <Box className='flex justify-end mt-6'>
            <Button variant='outline' className='mx-2 w-min' fullWidth onClick={() => modals.closeModal(modalId)} mt='md'>
              No don't delete it
            </Button>

            <Button className='mx-2 w-min btn-delete' fullWidth onClick={() => handleDelete(modalId)} mt='md'>
              Delete Announcement
            </Button>
          </Box>
        </>
      )
    });
  };

  return (
    <Box className='flex'>
      <Edit className='mr-2 cursor-pointer text-app-yellow' onClick={() => router.push(`/announcements/${id}`)} />{' '}
      <Trash className='text-red-400 cursor-pointer' onClick={openDeleteModal} />
    </Box>
  );
}
