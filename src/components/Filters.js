import { Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { colors } from '../assets/colors';

export default function Filters({ navigateToFilter }) {

  const FilterButton = ({ children, onClick }) => {
    return (
      <Button
        variant={'outline'}
        fontWeight={'medium'}
        color={colors.unitedNationsBlue}
        borderColor={colors.unitedNationsBlue}
        _hover={{ bg: colors.spaceCadetLight }}
        _active={{bg: colors.delftBlue}}
        borderRadius={'24px'}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  };

  return (
    <Box my={'10px'}>
      <Text color={colors.lavender}>Filters</Text>
      <HStack my={'5px'} >
        <FilterButton onClick={() => navigateToFilter('people')}>
          People
        </FilterButton>
        <FilterButton onClick={() => navigateToFilter('planets')}>
          Planets
        </FilterButton>
        <FilterButton onClick={() => navigateToFilter('starships')}>
          Starships
        </FilterButton>
      </HStack>
    </Box>
  );
}
