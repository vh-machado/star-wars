import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';

import { colors } from '../assets/colors';
import bannerDroids from '../assets/img/search-banner-droids.png'

export default function SearchBanner({ children }) {
  return (
    <Flex
      minH="200px"
      bgGradient={`linear(to-r, ${colors.slateBlue}, ${colors.unitedNationsBlue}, ${colors.pictonBlue})`}
      p="30px"
      borderRadius={'8px'}
      direction={'column'}
      justify={'space-between'}
      my={'10px'}
      overflow={"hidden"}
    >

      <Text fontSize={'lg'} color={'white'}>
        Search with the Force
      </Text>
      {children}
    </Flex>
  );
}
