import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { colors } from './assets/colors';
import Header from './components/Header';

export default function Layout() {
  return (
    <Flex
      h="100vh"
      bg={colors.spaceCadet}
      direction={'column'}
      align={'flex-start'}
      justify={'flex-start'}
    >
      <Header />
      <Flex
        h="100%"
        minW="100vw"
        px={["5%","10%", "15%"]}
        py="2%"
        direction={'column'}
        overflowY={'auto'}
        fontFamily={'Montserrat'}
      >
        <Outlet />
      </Flex>
    </Flex>
  );
}
