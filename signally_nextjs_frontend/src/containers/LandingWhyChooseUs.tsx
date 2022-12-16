import { Container, Grid, Text } from '@mantine/core';
import { m } from 'framer-motion';

export default function LandingWhyChooseUs() {
  return (
    <Container className='' size='xl'>
      <Grid className='mt-28 mb-[150px] overflow-hidden align-middle'>
        <Grid.Col md={6} className='h-[600px] flex flex-col justify-center'>
          <Text className='mb-8 xs:text-4xl sm:text-5xl font-extrabold leading-[1.25] text-left'>
            What make Signally <span className='text-brand-yellow'>different?</span> <br />{' '}
          </Text>

          <Text className='mb-8 text-lg font-semibold text-left'>
            Our AI is constantly learning and improving. And Constantly scanning the crypto, forex and stock market for apportunities 24/7.
            <br></br>
            <Text>You can rest and we'll do the hard work for you.</Text>
          </Text>

          <Text className='mb-1 max-w-lg text-left text-2xl font-bold'>Download</Text>
          <Text className='mb-8 max-w-lg text-left'>Install the Signally App from Google Play, Apple Appstore or use our webapp</Text>

          <Text className='mb-1 max-w-lg text-left text-2xl font-bold'>Choose</Text>
          <Text className='mb-8 max-w-lg text-left'>
            Select a subscription that's right for you! All subscription give access to Forex, Crypto, Stocks signals
          </Text>

          <Text className='mb-1 max-w-lg text-left text-2xl font-bold'>Choose</Text>
          <Text className='mb-8 max-w-lg text-left'>
            Select a subscription that's right for you! All subscription give access to Forex, Crypto, Stocks signals
          </Text>
        </Grid.Col>

        <Grid.Col md={6} className='h-[580px]'>
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75 }}>
            <div className='h-36 flex xs:justify-center sm:justify-end'>
              <img src='/svg/hero-iphone.svg' className='h-[580px]' />
            </div>
          </m.div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
