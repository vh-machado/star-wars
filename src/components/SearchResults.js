import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { colors } from '../assets/colors';
import ItemsGrid from './ItemsGrid';

export default function SearchResults({ results: items }) {
  return (
    <Flex my="20px" direction={'column'}>
      {items.length > 0 && <Text color={colors.lavender}>Results</Text>}

      <ItemsGrid items={items}/>
    </Flex>
  );
}
