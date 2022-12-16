import { Box, Button, Grid, NativeSelect, Textarea, TextInput, Text } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Send } from 'tabler-icons-react';
import * as Yup from 'yup';
import { Signal } from '../../models/model.signal';
import { apiCreateSignal, apiGetSignal, apiUpdateSignal } from '../../models_services/firestore_service';
import { FormError } from './_FormError';
import FormSkelenton from './_FormSkelenton';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { getFirebaseStorageDownloadUrl } from '../../models_services/firebase_image_service';
interface IProps {
  id?: string;
  signal?: Signal | null;
}

export default function SignalForm({ id }: { id?: string }) {
  const [isInitLoading, setIsInitLoading] = useState(id != null ? true : false);
  const [signal, setSignal] = useState<Signal | null>(null);

  async function getInitData() {
    if (id) setSignal(await apiGetSignal(id));
    setIsInitLoading(false);
  }

  useEffect(() => {
    getInitData();
  }, []);

  if (isInitLoading) return <FormSkelenton />;
  if (!signal && id) return <FormError />;

  return <Form id={id} signal={signal} />;
}

const schema = Yup.object({
  entryType: Yup.string().required('Required'),
  symbol: Yup.string().required('Required'),
  market: Yup.string().required('Required'),
  comment: Yup.string(),
  isActive: Yup.string().required('Required'),
  isFree: Yup.string().required('Required'),
  image: Yup.string(),
  analysisText: Yup.string(),
  //
  entry: Yup.number().required('Required'),
  stopLoss: Yup.number().required('Required'),
  takeProfit1: Yup.number().required('Required'),
  takeProfit2: Yup.number().nullable(),
  takeProfit3: Yup.number().nullable(),
  //
  isStopLossHit: Yup.string().required('Required'),
  isTakeProfit1Hit: Yup.string().required('Required'),
  isTakeProfit2Hit: Yup.string().required('Required'),
  isTakeProfit3Hit: Yup.string().required('Required'),
  //
  entryDate: Yup.date().required('Required'),
  entryTime: Yup.date().required('Required'),
  //
  stopLossDate: Yup.date().nullable(),
  stopLossTime: Yup.date().nullable(),
  //
  takeProfit1Date: Yup.date().nullable(),
  takeProfit1Time: Yup.date().nullable(),
  //
  takeProfit2Date: Yup.date().nullable(),
  takeProfit2Time: Yup.date().nullable(),
  //
  takeProfit3Date: Yup.date().nullable(),
  takeProfit3Time: Yup.date().nullable()
});

function Form({ id, signal }: IProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<CustomFile | null>(null);

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      entryType: signal?.entryType ?? 'Long',
      symbol: signal?.symbol ?? '',
      market: signal?.market ?? 'Crypto',
      comment: signal?.comment ?? '',
      image: signal?.image ?? '',
      analysisText: signal?.analysisText ?? '',
      //
      entry: signal?.entry ?? 0,
      stopLoss: signal?.stopLoss ?? 0,
      takeProfit1: signal?.takeProfit1 ?? 0,
      takeProfit2: signal?.takeProfit2 ?? 0,
      takeProfit3: signal?.takeProfit3 ?? 0,
      //
      isStopLossHit: getStringFromBool(signal?.isStopLossHit ?? false),
      isTakeProfit1Hit: getStringFromBool(signal?.isTakeProfit1Hit ?? false),
      isTakeProfit2Hit: getStringFromBool(signal?.isTakeProfit2Hit ?? false),
      isTakeProfit3Hit: getStringFromBool(signal?.isTakeProfit3Hit ?? false),
      //
      entryDate: signal?.entryDate ?? null,
      entryTime: signal?.entryTime ?? null,
      //
      stopLossDate: signal?.stopLossDate ?? null,
      stopLossTime: signal?.stopLossTime ?? null,
      //
      takeProfit1Date: signal?.takeProfit1Date ?? null,
      takeProfit1Time: signal?.takeProfit1Time ?? null,
      //
      takeProfit2Date: signal?.takeProfit2Date ?? null,
      takeProfit2Time: signal?.takeProfit2Time ?? null,
      //
      takeProfit3Date: signal?.takeProfit3Date ?? null,
      takeProfit3Time: signal?.takeProfit3Time ?? null,
      isActive: getStringFromBool(signal?.isActive ?? true),
      isFree: getStringFromBool(signal?.isFree ?? false)
    }
  });

  const handleSubmit = async () => {
    console.log('form.values', form.values);
    console.log('form.errors', form.errors);
    if (form.validate().hasErrors) return;

    let entryDatetime = new Date(form.values.entryDate!);
    let entryTime = new Date(form.values.entryTime!);
    entryDatetime.setHours(entryTime.getHours());
    entryDatetime.setMinutes(entryTime.getMinutes());

    let stopLossDatetime = new Date(form.values.stopLossDate!);
    let stopLossTime = new Date(form.values.stopLossTime!);
    stopLossDatetime.setHours(stopLossTime.getHours());
    stopLossDatetime.setMinutes(stopLossTime.getMinutes());

    let takeProfit1Datetime = new Date(form.values.takeProfit1Date!);
    let takeProfit1Time = new Date(form.values.takeProfit1Time!);
    takeProfit1Datetime.setHours(takeProfit1Time.getHours());
    takeProfit1Datetime.setMinutes(takeProfit1Time.getMinutes());

    let takeProfit2Datetime = new Date(form.values.takeProfit2Date!);
    let takeProfit2Time = new Date(form.values.takeProfit2Time!);
    takeProfit2Datetime.setHours(takeProfit2Time.getHours());
    takeProfit2Datetime.setMinutes(takeProfit2Time.getMinutes());

    let takeProfit3Datetime = new Date(form.values.takeProfit3Date!);
    let takeProfit3Time = new Date(form.values.takeProfit3Time!);
    takeProfit3Datetime.setHours(takeProfit3Time.getHours());
    takeProfit3Datetime.setMinutes(takeProfit3Time.getMinutes());

    try {
      setIsLoading(true);
      const s = new Signal();
      s.entryType = form.values.entryType;
      s.symbol = form.values.symbol;
      s.market = form.values.market;
      s.comment = form.values.comment;
      s.image = form.values.image;
      s.analysisText = form.values.analysisText;
      //
      s.entry = Number(form.values.entry);
      s.stopLoss = Number(form.values.stopLoss);
      s.takeProfit1 = Number(form.values.takeProfit1);
      s.takeProfit2 = Number(form.values.takeProfit2);
      s.takeProfit3 = Number(form.values.takeProfit3);
      //
      s.entryDate = form.values.entryDate;
      s.entryTime = form.values.entryTime;
      s.entryDatetime = form.values.entryDate ? entryDatetime : null;
      //
      s.stopLossDate = form.values.stopLossDate;
      s.stopLossTime = form.values.stopLossTime;
      s.stopLossDatetime = form.values.stopLossDate ? stopLossDatetime : null;
      //
      s.takeProfit1Date = form.values.takeProfit1Date;
      s.takeProfit1Time = form.values.takeProfit1Time;
      s.takeProfit1Datetime = form.values.takeProfit1Date ? takeProfit1Datetime : null;
      //
      s.takeProfit2Date = form.values.takeProfit2Date;
      s.takeProfit2Time = form.values.takeProfit2Time;
      s.takeProfit2Datetime = form.values.takeProfit2Date ? takeProfit2Datetime : null;
      //
      s.takeProfit3Date = form.values.takeProfit3Date;
      s.takeProfit3Time = form.values.takeProfit3Time;
      s.takeProfit3Datetime = form.values.takeProfit3Date ? takeProfit3Datetime : null;
      //
      s.isStopLossHit = getBoolFromString(form.values.isStopLossHit);
      s.isTakeProfit1Hit = getBoolFromString(form.values.isTakeProfit1Hit);
      s.isTakeProfit2Hit = getBoolFromString(form.values.isTakeProfit2Hit);
      s.isTakeProfit3Hit = getBoolFromString(form.values.isTakeProfit3Hit);
      //
      s.isActive = getBoolFromString(form.values.isActive);
      s.isFree = getBoolFromString(form.values.isFree);
      //
      s.timestampCreated = signal?.timestampCreated ?? new Date();
      s.timestampUpdated = new Date();

      if (file) s.image = await getFirebaseStorageDownloadUrl({ file: file! });

      if (!signal) await apiCreateSignal(s);
      if (signal && id) await apiUpdateSignal(id, s);

      setIsLoading(false);

      router.push('/signals');

      showNotification({ title: 'Success', message: 'Signal was created', autoClose: 6000 });
    } catch (error) {
      setIsLoading(false);
      showNotification({ color: 'red', title: 'Error', message: 'There was an error creating the notification', autoClose: 6000 });
    }
  };

  const handleDropFiles = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
    }
  };

  const DropzoneRemoveImage = () => {
    const removeFile = () => {
      form.setFieldValue('image', '');
      setFile(null);
    };
    if (file || form.values.image) {
      return (
        <Button className='absolute z-40 btn right-2 top-2' onClick={removeFile}>
          Remove
        </Button>
      );
    }
    return null;
  };

  const DropzoneChildren = () => {
    if (form.values.image != '') {
      return (
        <Box className='relative flex justify-center'>
          <img className='h-[300px]' src={form.values.image} alt='Preview' />
        </Box>
      );
    }
    if (file)
      return (
        <Box className='relative flex justify-center'>
          <img className='h-[300px]' src={file.preview} alt='Preview' />{' '}
        </Box>
      );
    return (
      <Box className='min-h-[300px] pointer-events-none flex justify-center items-center text-center'>
        <div>
          <Text size='xl' inline>
            Drag analysis image here
          </Text>
          <Text size='sm' color='dimmed' inline mt={7}>
            Attach a single file not larger than 5MB
          </Text>
        </div>
      </Box>
    );
  };

  return (
    <Box className=''>
      <div className='grid xs:grid-cols-2 md:grid-cols-4 gap-x-3'>
        <NativeSelect
          className='w-full'
          placeholder='Active'
          label='Active'
          data={['Yes', 'No']}
          onChange={(e: any) => form.setFieldValue('isActive', e.target.value)}
          value={form.values.isActive}
          error={form.errors.isActive}
        />

        <NativeSelect
          className='w-full'
          placeholder='Long'
          label='Long/Short'
          data={['Long', 'Short']}
          onChange={(e: any) => form.setFieldValue('entryType', e.target.value)}
          value={form.values.entryType}
          error={form.errors.entryType}
        />
        <NativeSelect
          className='w-full'
          placeholder='Crypto'
          label='Market'
          data={['Crypto', 'Stocks', 'Forex', 'Commodities']}
          onChange={(e: any) => form.setFieldValue('market', e.target.value)}
          value={form.values.market}
          error={form.errors.market}
        />

        <NativeSelect
          className='w-full'
          placeholder='Free'
          label='Free'
          data={['Yes', 'No']}
          onChange={(e: any) => form.setFieldValue('isFree', e.target.value)}
          value={form.values.isFree}
          error={form.errors.isFree}
        />
      </div>

      <div className='mt-4'>
        <TextInput className='w-full' placeholder='Symbol' label='Symbol' {...form.getInputProps('symbol')} />
      </div>

      <div className='grid mt-6 xs:grid-cols-2 md:grid-cols-3 gap-x-3'>
        <TextInput label='Entry' placeholder='Entry' className='w-full' {...form.getInputProps('entry')} />
        <DatePicker label='Entry day' className='w-full' {...form.getInputProps('entryDate')} />
        <TimeInput label='Entry time' className='w-full' format='12' {...form.getInputProps('entryTime')} />
      </div>

      <div className='grid mt-6 xs:grid-cols-2 md:grid-cols-4 gap-x-3'>
        <TextInput label='Stop loss' placeholder='Stop loss' className='w-full' {...form.getInputProps('stopLoss')} />
        <DatePicker label='Stop loss day' className='w-full' {...form.getInputProps('stopLossDate')} disabled={!id} />
        <TimeInput label='Stop loss time' className='w-full' format='12' {...form.getInputProps('stopLossTime')} disabled={!id} clearable />

        <NativeSelect
          className='w-full'
          placeholder=''
          disabled={!id}
          label='Stop loss hit'
          data={['Yes', 'No']}
          onChange={(e: any) => form.setFieldValue('isStopLossHit', e.target.value)}
          value={form.values.isStopLossHit}
          error={form.errors.isStopLossHit}
        />
      </div>

      <div className='grid mt-6 xs:grid-cols-2 md:grid-cols-4 gap-x-3'>
        <TextInput label='Take profit 1' placeholder='Take profit 1' className='w-full' {...form.getInputProps('takeProfit1')} />
        <DatePicker label='Take profit 1 day' className='w-full' {...form.getInputProps('takeProfit1Date')} disabled={!id} />
        <TimeInput
          label='Take profit 1 time'
          className='w-full'
          format='12'
          {...form.getInputProps('takeProfit1Time')}
          clearable
          disabled={!id}
        />

        <NativeSelect
          className='w-full'
          disabled={!id}
          placeholder=''
          label='Take profit 1 hit'
          data={['Yes', 'No']}
          onChange={(e: any) => form.setFieldValue('isTakeProfit1Hit', e.target.value)}
          value={form.values.isTakeProfit1Hit}
          error={form.errors.isTakeProfit1Hit}
        />
      </div>

      <div className='grid mt-6 xs:grid-cols-2 md:grid-cols-4 gap-x-3'>
        <TextInput label='Take profit 2' placeholder='Take profit 1' className='w-full' {...form.getInputProps('takeProfit2')} />
        <DatePicker label='Take profit 2 day' className='w-full' {...form.getInputProps('takeProfit2Date')} disabled={!id} />
        <TimeInput
          label='Take profit 2 time'
          className='w-full'
          format='12'
          {...form.getInputProps('takeProfit2Time')}
          clearable
          disabled={!id}
        />

        <NativeSelect
          className='w-full'
          placeholder=''
          disabled={!id}
          label='Take profit 2 hit'
          data={['Yes', 'No']}
          onChange={(e: any) => form.setFieldValue('isTakeProfit2Hit', e.target.value)}
          value={form.values.isTakeProfit2Hit}
          error={form.errors.isTakeProfit2Hit}
        />
      </div>

      <div className='grid mt-6 xs:grid-cols-2 md:grid-cols-4 gap-x-3'>
        <TextInput label='Take profit 3' placeholder='Take profit 1' className='w-full' {...form.getInputProps('takeProfit3')} />
        <DatePicker label='Take profit 3 day' className='w-full' {...form.getInputProps('takeProfit3Date')} disabled={!id} />
        <TimeInput
          label='Take profit 3 time'
          className='w-full'
          format='12'
          {...form.getInputProps('takeProfit3Time')}
          clearable
          disabled={!id}
        />

        <NativeSelect
          className='w-full'
          placeholder=''
          disabled={!id}
          label='Take profit 3 hit'
          data={['Yes', 'No']}
          onChange={(e: any) => form.setFieldValue('isTakeProfit3Hit', e.target.value)}
          value={form.values.isTakeProfit3Hit}
          error={form.errors.isTakeProfit3Hit}
        />
      </div>

      <Box className='relative'>
        <DropzoneRemoveImage />
        <Dropzone
          className='z-0 p-2 mt-8'
          multiple={false}
          disabled={file != null || form.values.image != ''}
          onDrop={handleDropFiles}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}>
          <DropzoneChildren />
        </Dropzone>
      </Box>

      <div className='mb-20'>
        <Textarea label='Analysis' placeholder='Analysis' minRows={4} maxLength={140} className='mt-4' {...form.getInputProps('analysisText')} />
        <Textarea label='Comment' placeholder='Result' minRows={4} maxLength={140} className='mt-4' {...form.getInputProps('comment')} />
        <Button
          loading={isLoading}
          onClick={handleSubmit}
          leftIcon={<Send size={14} />}
          variant='filled'
          className='w-full mt-10 text-black transition border-0 bg-app-yellow hover:bg-opacity-90'>
          Submit
        </Button>
      </div>
    </Box>
  );
}

function getStringFromBool(isActive?: boolean) {
  if (isActive === undefined || isActive === null) return 'Yes';
  return isActive === true ? 'Yes' : 'No';
}

function getBoolFromString(isActive?: string) {
  if (isActive == 'Yes') return true;
  return false;
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
}
