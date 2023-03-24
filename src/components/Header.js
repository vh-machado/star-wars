import React from 'react';
import { Button, Flex, HStack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { colors } from '../assets/colors';
import border from '../assets/img/header-border.png';

export default function Header() {
  const MenuButton = ({ children, onClick }) => {
    return (
      <Button
        variant={'ghost'}
        size={['sm', 'md']}
        fontWeight={'medium'}
        _hover={{ bg: colors.spaceCadetLight, color: colors.unitedNationsBlue }}
        _active={{ bg: colors.delftBlue }}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  };

  const Menu = () => {
    const navigate = useNavigate();

    return (
      <HStack w="100%" justifyContent={'end'} fontFamily={'Montserrat'}>
        <MenuButton onClick={() => navigate('/')}>Home</MenuButton>
        <MenuButton onClick={() => navigate('/lists')}>Lists</MenuButton>
      </HStack>
    );
  };

  const Title = () => {
    return (
      <Flex
        w="100%"
        alignSelf={'center'}
        align={'center'}
        justify={'space-between'}
        mb="5px"
        mt="10px"
      >
        <Image
          src={border}
          w={['73.4px', '209.7px']}
          h={['16.5px', '47.1px']}
          objectFit="contain"
        />
        <Text
          fontFamily={'Poller One'}
          fontSize={['sm', 'md', '2xl']}
          textAlign={'center'}
          mx="15px"
        >
          GALAXY MUSEUM
        </Text>
        <Image
          src={border}
          w={['73.4px', '209.7px']}
          h={['16.5px', '47.1px']}
          objectFit="contain"
          transform={'scaleX(-1)'}
        />
      </Flex>
    );
  };

  return (
    <Flex
      w="100%"
      color={colors.lavender}
      justifyContent="start"
      alignItems={'start'}
      direction={'column'}
      p="15px"
    >
      <Menu />
      <Title />
    </Flex>
  );
}
