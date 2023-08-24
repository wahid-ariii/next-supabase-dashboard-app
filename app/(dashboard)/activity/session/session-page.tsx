'use client';

import { useState } from 'react';
import axios from 'axios';
import { TrashIcon } from 'lucide-react';

import useToast from '@/hooks/useToast';

import Button from '@/components/systems/Button';
import Dialog from '@/components/systems/Dialog';
import InputDebounce from '@/components/systems/InputDebounce';
import TableSimple from '@/components/systems/TableSimple';
import Title from '@/components/systems/Title';

export default function LogPage({ data }) {
  const [inputDebounceValue, setInputDebounceValue] = useState('');
  const { updateToast, pushToast } = useToast();
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);

  const filteredData =
    inputDebounceValue === ''
      ? data
      : data.filter((item: any) =>
          item.book_users.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(inputDebounceValue.toLowerCase().replace(/\s+/g, '')),
        );

  async function handleDeleteAll() {
    const toastId = pushToast({
      message: `Deleting All Session`,
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session`);
      if (res.status == 200) {
        setOpenDeleteAllDialog(false);
        updateToast({ toastId, message: res?.data?.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error?.response?.data?.error, isError: true });
    } finally {
      // mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/session`);
    }
  }

  function getTime(date: string) {
    let time = new Date(date);
    return time.toLocaleTimeString('en-US');
  }

  return (
    <>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Session</Title>
        {/* FIX this  */}
        {/* <Button.danger onClick={() => setOpenDeleteAllDialog(true)} className='flex items-center gap-2'>
          <TrashIcon className='h-4 w-4' />
          Delete All
        </Button.danger> */}
      </div>

      <Dialog
        title='Delete All Session'
        open={openDeleteAllDialog}
        isDanger
        setOpen={setOpenDeleteAllDialog}
        onClose={() => setOpenDeleteAllDialog(false)}
        onConfirm={handleDeleteAll}
      >
        <div className='mt-5 text-center sm:text-left'>Are you sure want to delete All Session ?</div>
      </Dialog>

      <InputDebounce
        label='Search'
        id='inputdebounce'
        name='inputdebounce'
        placeholder='Search'
        value={inputDebounceValue}
        onChange={(value) => setInputDebounceValue(value)}
      />

      <TableSimple
        head={
          <>
            <TableSimple.td shrink>No</TableSimple.td>
            <TableSimple.td shrink>ID</TableSimple.td>
            <TableSimple.td>Name</TableSimple.td>
            <TableSimple.td>Token</TableSimple.td>
            <TableSimple.td shrink>Date</TableSimple.td>
            <TableSimple.td shrink>Time</TableSimple.td>
          </>
        }
        caption={filteredData.length > 0 ? '' : 'No Data'}
      >
        {filteredData.map((item: any, index: number) => {
          return (
            <TableSimple.tr key={index}>
              <TableSimple.td shrink>{index + 1}</TableSimple.td>
              <TableSimple.td>{item.user_id}</TableSimple.td>
              <TableSimple.td>{item.book_users.name}</TableSimple.td>
              <TableSimple.td>{item.token.split('.')[2]}</TableSimple.td>
              <TableSimple.td>{item.created_at.split('T')[0]}</TableSimple.td>
              <TableSimple.td>{getTime(item.created_at)}</TableSimple.td>
            </TableSimple.tr>
          );
        })}
      </TableSimple>
    </>
  );
}
