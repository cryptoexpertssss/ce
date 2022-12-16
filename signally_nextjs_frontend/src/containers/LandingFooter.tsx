import { Box, Button, Group, Image, Text, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function LandingFooter() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();
  return (
    <Box className='flex flex-col items-center justify-center dark:bg-dark-100 border-0'>
      <Box className='flex flex-col items-center justify-center bg-light-300 dark:bg-app-black w-full h-[250px] mb-10'>
        <Text className='text-center mb-8 text-2xl font-bold'>Designed to make you more profitable!</Text>
        <Button onClick={() => router.push('/signup')} className='bg-yellow-300 text-dark hover:bg-yellow-400 transition w-[150px]'>
          <Text>Sign up</Text>
        </Button>
      </Box>

      <Link href={'/landing'}>
        <Group className='cursor-pointer' spacing={0} align='center'>
          <Image src={colorScheme == 'dark' ? 'svg/logo-white.svg' : 'svg/logo-black.svg'} width={100} className='' />
        </Group>
      </Link>
      <Box className='mt-5'>
        <ul className='mb-8 mt-4 flex flex-wra items-center justify-center text-sm'>
          <li className='mb-2 md:mb-0 mx-2'>
            <a className='font-medium hover:text-gray-600' href='/terms'>
              Terms
            </a>
          </li>
          <li className='mb-2 md:mb-0 mx-2'>
            <a className='font-medium hover:text-gray-600' href='/privacy'>
              Privacy
            </a>
          </li>
          <li className='mb-2 md:mb-0 mx-2'>
            <a className='font-medium hover:text-gray-600' href='/contact-us'>
              Contact
            </a>
          </li>
        </ul>
      </Box>
      <Box className='flex justify-center mb-10'>
        <a className='flex justify-center items-center w-10 h-10 mx-2 bg-gray-50 rounded-full' href='#'>
          <svg className='text-gray-500' width='7' height='12' viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.0898 11.8182V6.51068H5.90537L6.17776 4.44164H4.0898V3.12086C4.0898 2.52201 4.25864 2.1139 5.13515 2.1139L6.25125 2.11345V0.26283C6.05824 0.238228 5.39569 0.181824 4.62456 0.181824C3.01431 0.181824 1.9119 1.14588 1.9119 2.91594V4.44164H0.0908203V6.51068H1.9119V11.8182H4.0898Z'
              fill='currentColor'></path>
          </svg>
        </a>
        <a className='flex justify-center items-center w-10 h-10 mx-2 bg-gray-50 rounded-full' href='#'>
          <svg className='text-gray-500' width='13' height='11' viewBox='0 0 13 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.5455 2.09728C12.0904 2.29892 11.6022 2.43566 11.0892 2.49671C11.613 2.18304 12.014 1.6855 12.204 1.09447C11.7127 1.38496 11.1703 1.59589 10.5924 1.71023C10.1296 1.21655 9.47138 0.909058 8.74128 0.909058C7.34059 0.909058 6.20489 2.04475 6.20489 3.44467C6.20489 3.64322 6.2273 3.83714 6.27057 4.02257C4.16298 3.91671 2.29411 2.90696 1.0433 1.37259C0.824652 1.74653 0.700269 2.18225 0.700269 2.64736C0.700269 3.52734 1.14837 4.30379 1.82825 4.75805C1.41259 4.74415 1.02166 4.62981 0.67942 4.43975V4.47142C0.67942 5.69983 1.55399 6.72504 2.71362 6.95837C2.50116 7.01554 2.27712 7.04722 2.04534 7.04722C1.88156 7.04722 1.72318 7.031 1.56788 7.00009C1.89081 8.00831 2.8272 8.74148 3.93663 8.76158C3.06902 9.44146 1.97504 9.84552 0.786814 9.84552C0.582087 9.84552 0.38043 9.83316 0.181885 9.81076C1.30445 10.5316 2.63716 10.9519 4.06952 10.9519C8.73514 10.9519 11.2854 7.0874 11.2854 3.73595L11.2769 3.4076C11.7752 3.05219 12.2063 2.60564 12.5455 2.09728Z'
              fill='currentColor'></path>
          </svg>
        </a>
        <a className='flex justify-center items-center w-10 h-10 mx-2 bg-gray-50 rounded-full' href='#'>
          <svg className='text-gray-500' width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.06713 0.454529H9.9328C11.9249 0.454529 13.5456 2.07519 13.5455 4.06715V9.93282C13.5455 11.9248 11.9249 13.5454 9.9328 13.5454H4.06713C2.07518 13.5454 0.45459 11.9249 0.45459 9.93282V4.06715C0.45459 2.07519 2.07518 0.454529 4.06713 0.454529ZM9.9329 12.3839C11.2845 12.3839 12.3841 11.2844 12.3841 9.93282H12.384V4.06714C12.384 2.71563 11.2844 1.61601 9.93282 1.61601H4.06715C2.71564 1.61601 1.61609 2.71563 1.61609 4.06714V9.93282C1.61609 11.2844 2.71564 12.384 4.06715 12.3839H9.9329ZM3.57148 7.00005C3.57148 5.10947 5.10951 3.5714 7.00005 3.5714C8.8906 3.5714 10.4286 5.10947 10.4286 7.00005C10.4286 8.89056 8.8906 10.4285 7.00005 10.4285C5.10951 10.4285 3.57148 8.89056 3.57148 7.00005ZM4.75203 6.99998C4.75203 8.23951 5.76054 9.24788 7.00004 9.24788C8.23955 9.24788 9.24806 8.23951 9.24806 6.99998C9.24806 5.76036 8.23963 4.75191 7.00004 4.75191C5.76046 4.75191 4.75203 5.76036 4.75203 6.99998Z'
              fill='currentColor'></path>
          </svg>
        </a>
      </Box>

      <Box className='flex justify-center align-middle items-center mt-0 mb-8'>
        <Text className='text-sm'>All rights reserved © 2022 Signally</Text>
      </Box>
    </Box>
  );
}
