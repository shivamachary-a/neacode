
import {Center, Heading, Box, Grid, GridItem, Flex } from '@chakra-ui/react';
import {isMobile} from 'react-device-detect';


const Index = () => {
  if (!isMobile) {
    return (
  <Box h="100vh" w="100vw">
  <Grid columns={3}  rows={1} gap={0}>
    <GridItem colStart={1} rowStart={1} bg="main" h="100vh" w="60vw">
      <Center h="100%" w="100%"  overflowX="auto" whiteSpace="nowrap">
      <Flex shrink={0} ml={"10vh"}>
        <Box p={16}>
          <img style={{borderRadius:"30px"}} src="https://cdn.discordapp.com/attachments/692861972731002995/812364551227441212/iPhone_X-XS-11_Pro_2.png"></img>
        </Box>
        <Box p={16}>
          <img style={{borderRadius:"30px"}} src="https://cdn.discordapp.com/attachments/692861972731002995/812364552457027614/iPhone_X-XS-11_Pro_1.png"></img>
        </Box>
        
        <Box p={16}>
          <img style={{borderRadius:"30px"}} src="https://cdn.discordapp.com/attachments/692861972731002995/812364553459204196/iPhone_X-XS-11_Pro_3.png"></img>
        </Box>
      </Flex>
      </Center>
    </GridItem>
    <GridItem colStart={3} rowStart={1} bg="white" h="100vh" w="40vw">
      <Center h="100%" w="100%" p={"200px"}>
        <Heading color="black">the next wave in personal finance technology</Heading>
        <img src="https://media.discordapp.net/attachments/692861972731002995/810216310452781106/logo.png?width=200&height=200"></img>
      </Center>
    </GridItem>
  </Grid>
  </Box>
    )}
  else {
    return (
      <Center h="100vh" w="100vw">
        <img src="https://media.discordapp.net/attachments/692861972731002995/810216310452781106/logo.png?width=200&height=200"></img>
      </Center>
    )
  }
}

export default Index
//https://cdn.discordapp.com/attachments/692861972731002995/812364553459204196/iPhone_X-XS-11_Pro_3.png