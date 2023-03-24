import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';

export default function LoadingGif() {
    return (
      <Flex h="100%" align="center" justify="center" direction={"column"}>
        <Player
          autoplay
          loop
          src="https://assets2.lottiefiles.com/animated_stickers/lf_tgs_fhiz0fdc.json"
          style={{ height: '180px', width: '180px' }}
        />
        <Player
          autoplay
          loop
          src="https://assets5.lottiefiles.com/packages/lf20_tiuij39a.json"
          style={{ height: '100px', width: '100px' }}
        />
      </Flex>
    );
  }