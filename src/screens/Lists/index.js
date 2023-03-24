import React, { useEffect, useState } from 'react';
import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import { colors } from '../../assets/colors';
import user from '../../user';
import ItemsGrid from '../../components/ItemsGrid';

export default function Lists() {
  const [arrayOfLists, setArrayOfLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setArrayOfLists(user.lists);
  }, []);

  const removeList = listId => {
    console.log(user.lists);
    user.lists = user.lists.filter(list => list.id !== listId);
    setArrayOfLists(user.lists);
  };

  const ListBanner = () => {
    return <Text color={colors.lavender}>ListBanner</Text>;
  };

  const List = ({ id, name }) => {
    return (
      <Flex w="80%">
        <Button w="100%" key={id} onClick={() => navigate(id)}>
          {name}
        </Button>
        <Button h="100%" ms="10px" onClick={() => removeList(id)}>
          <DeleteIcon />
        </Button>
      </Flex>
    );
  };

  return (
    <>
      <ListBanner />
      {arrayOfLists.length > 0 ? (
        <ItemsGrid items={arrayOfLists} removeItem={removeList} listsAsItems={true} />
      ) : (
        /*
        <VStack>
          {arrayOfLists.map(list => {
            return <List key={list.id} {...list} />;
          })}
        </VStack>
        */

        <Text color={colors.lavender}>Create your first list</Text>
      )}
    </>
  );
}
