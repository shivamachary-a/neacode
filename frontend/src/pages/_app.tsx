
import { ChakraProvider } from '@chakra-ui/react';
import { withUrqlClient,  } from 'next-urql';
import React from 'react';
import theme from '../theme';
import { createURQLclient } from '../utils/createUrqlClient';



function MyApp({ Component, pageProps }: any) {

  return (
    <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />

    </ChakraProvider>
  )
}

export default withUrqlClient(createURQLclient)(MyApp)