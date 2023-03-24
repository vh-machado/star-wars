import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { colors } from '../../assets/colors';

export default function PageNotFound() {
  return (
    <Flex h="100%" align="center" justify="center" direction={'column'}>
      <Player
        autoplay
        loop
        src="https://assets7.lottiefiles.com/animated_stickers/lf_tgs_a01runig.json"
        style={{ height: '180px', width: '180px' }}
      />
      <Text color={colors.lavender} fontWeight={'medium'} mt="30px">
        Page not found, may the Force be with you
      </Text>
    </Flex>
  );
}
