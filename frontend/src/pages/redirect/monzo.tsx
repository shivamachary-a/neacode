
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthenticateMonzoQuery } from '../../generated/graphql';

const Redirect = () =>{ 
    
    const router = useRouter();
    const {code, state} = router.query;

    

    if (!(code && state)) {
      return (<Center h="100vh" p={16}>
      <Box textAlign="center" fontSize="xl">
        <Heading size="3xl" mb="16" p={4}>there seems to be an issue authenticating you.</Heading>
        <Center mx="auto" alignContent="center">
          <img src="https://media.discordapp.net/attachments/692861972731002995/810216310452781106/logo.png?width=468&height=468" height="400" width="400vh" ></img>
          </Center>
        <Heading textAlign="center" size="2xl" mb="16" p={4}>return to the app and try again.</Heading>
      </Box>
      </Center>)
    }
    else {
      const [{data, fetching}]:any = useAuthenticateMonzoQuery({variables: {
        code: code as string,
        state: state as string
  
      }});
      
    if (fetching) {
      return (
        <Center h="100vh">
      <Heading fontSize="3xl">Hold on...</Heading>
      </Center>
      )
    }

    if (data.authenticateMonzo.error[0].field != "") {
      return (
      <Center h="100vh"  p={16}>
    <Box textAlign="center" fontSize="xl">
      <Heading size="3xl" mb="16" p={4}>oops!</Heading>
      <Center mx="auto" alignContent="center">
        <img src="https://media.discordapp.net/attachments/692861972731002995/810216310452781106/logo.png?width=468&height=468" height="400" width="400vh" ></img>
        </Center>
      <Heading textAlign="center" size="2xl" mb="16" p={4}>something went wrong. try again later.</Heading>
      <Text fontSize={8}>{JSON.stringify(data)}</Text>
    </Box>
    </Center>)
    }

    return (

        <Center h="100vh" p={16}>
    <Box textAlign="center" fontSize="xl">
      <Heading size="3xl" mb="16" p={4}>thanks!</Heading>
      <Center mx="auto" alignContent="center">
        <img src="https://media.discordapp.net/attachments/692861972731002995/810216310452781106/logo.png?width=468&height=468" height="400" width="400vh" ></img>
        </Center>
      <Heading textAlign="center" size="2xl" mb="16" p={4}>just verify us on your monzo app, and we're good to go.</Heading>
    </Box>
    </Center>

)}}

export default withUrqlClient((_ssrExchange, ctx) => ({
    url: 'http://isohel.co.uk/api/graphql',
  }))(Redirect);
  
