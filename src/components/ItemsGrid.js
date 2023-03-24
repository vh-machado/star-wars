import React from 'react';
import { Button, Flex, SimpleGrid } from '@chakra-ui/react';

import Card from './Card';
import { DeleteIcon } from '@chakra-ui/icons';
import { colors } from '../assets/colors';

export default function ItemsGrid({
  items,
  removeItem = undefined,
  listsAsItems = false,
}) {
  const DeleteButton = ({ onClick }) => {
    return (
      <Button
        color={colors.lavender}
        borderWidth={'2px'}
        h="100%"
        ms="10px"
        variant={'outline'}
        borderColor={colors.delftBlue}
        _hover={{
          bg: colors.spaceCadetLight,
          borderColor: colors.burntSienna,
          color: colors.burntSienna,
        }}
        _active={{ bg: colors.delftBlue }}
        onClick={onClick}
      >
        <DeleteIcon />
      </Button>
    );
  };

  return (
    <SimpleGrid columns={[1, 2]} spacing={'20px'} mt="20px">
      {items?.map(item => {
        return (
          <Flex key={`${item.id}${item.category}`}>
            <Card {...{ item, listsAsItems }} />
            {removeItem && <DeleteButton onClick={() => removeItem(item.id)} />}
          </Flex>
        );
      })}
    </SimpleGrid>
  );
}
