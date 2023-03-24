import React from 'react';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { colors } from '../assets/colors';
import peopleIcon from '../assets/img/people-icon.png';
import planetsIcon from '../assets/img/planets-icon.png';
import starshipsIcon from '../assets/img/starships-icon.png';

export default function Card({ item: content, listsAsItems }) {
  const navigate = useNavigate();
  const { id, category, name } = content;

  const categoryIcon = {
    people: peopleIcon,
    planets: planetsIcon,
    starships: starshipsIcon,
  };

  const categoryBackground = {
    people: colors.slateBlue,
    planets: colors.moonstone,
    starships: colors.unitedNationsBlue,
  };

  return (
    <Button
      h="100px"
      w="100%"
      p="5px"
      bg={colors.spaceCadetLight}
      borderRadius="8px"
      flexGrow="1"
      _hover={{
        bg: colors.delftBlue,
      }}
      _active={{ bg: colors.delftBlue }}
      _disabled={{ cursor: 'pointer' }}
      onClick={() => navigate(listsAsItems ? id : `/star-wars/${category}/${id}`)}
    >
      {!listsAsItems && (
        <Flex
          h="100%"
          bg={categoryBackground[category]}
          borderRadius={'8px'}
          py="4px"
          px="12px"
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            src={categoryIcon[category]}
            objectFit={'contain'}
            w={['16px', '32px']}
            h={['16px', '32px']}
          />
        </Flex>
      )}
      <Flex w="100%" justify={'center'} align={'center'} p="5px">
        <Text color={colors.lavender} fontSize={'sm'} whiteSpace={'pre-wrap'}>
          {name}
        </Text>
      </Flex>
    </Button>
  );
}
