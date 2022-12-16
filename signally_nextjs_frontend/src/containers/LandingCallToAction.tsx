import { Box, Container, Text } from '@mantine/core';
import { m } from 'framer-motion';

export default function LandingCallToAction() {
  return (
    <Container className='text-center xs:mt-10 sm:mt-36' size='xl'>
      <Box className='flex xs:flex-col-reverse sm:flex-row'>
        <Box className='xs:w-full sm:w-1/2'>
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75 }}>
            <div className='h-[600px] flex xs:justify-center sm:justify-start'>
              <img src='/svg/call-to-action-iphone.svg' className='h-[600px]' />
            </div>
          </m.div>
        </Box>

        <Box className='xs:w-full sm:w-1/2 h-[600px] flex flex-col justify-center '>
          <Text className='mb-2 max-w-lg text-left text-5xl font-bold'>Signals you can trust!</Text>
          <Text className='mb-8 max-w-lg text-left'>Start your first trade with these easy steps.</Text>

          <Text className='mb-1 max-w-lg text-left text-2xl font-bold'>Download</Text>
          <Text className='mb-8 max-w-lg text-left'>Install the Signally App from Google Play, Apple Appstore or use our webapp</Text>

          <Text className='mb-1 max-w-lg text-left text-2xl font-bold'>Choose</Text>
          <Text className='mb-8 max-w-lg text-left'>
            Select a subscription that's right for you! All subscription give access to Forex, Crypto, Stocks signals
          </Text>

          <Text className='mb-1 max-w-lg text-left text-2xl font-bold'>Start Trading</Text>
          <Text className='mb-8 max-w-lg text-left'>
            You're good to go! Buy/sell crypto, forex, stocks by copy trading with our signals in real-time.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
