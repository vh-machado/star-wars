import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { colors } from '../../assets/colors';
import user from '../../user';
import ItemsGrid from '../../components/ItemsGrid';
import { Player } from '@lottiefiles/react-lottie-player';

export default function Lists() {
  const [arrayOfLists, setArrayOfLists] = useState([]);

  useEffect(() => {
    setArrayOfLists(user.lists);
  }, []);

  const removeList = listId => {
    console.log(user.lists);
    user.lists = user.lists.filter(list => list.id !== listId);
    setArrayOfLists(user.lists);
  };

  const NoLists = () => {
    return (
      <Flex h="100%" align="center" justify="center" direction={'column'}>
        <Player
          autoplay
          loop
          src="https://assets7.lottiefiles.com/animated_stickers/lf_tgs_pp2pze08.json"
          style={{ height: '180px', width: '180px' }}
        />
        <Text color={colors.lavender} fontWeight={'medium'} mt="30px">Create your first list</Text>
      </Flex>
    );
  };

  return (
    <>
      <Text color={colors.lavender} fontSize={'2xl'} fontWeight={"semibold"}>
        My Lists
      </Text>
      {arrayOfLists.length > 0 ? (
        <ItemsGrid
          items={arrayOfLists}
          removeItem={removeList}
          listsAsItems={true}
        />
      ) : (
        <NoLists />
      )}
    </>
  );
}
