import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { colors } from '../../assets/colors';
import ItemsGrid from '../../components/ItemsGrid';
import user from '../../user';
import { EditIcon } from '@chakra-ui/icons';

export default function ListDetails() {
  const [currentList, setCurrentList] = useState({ name: '', items: [] });
  const [onEditName, setOnEditName] = useState(false);

  const params = useParams();
  const { id: currentListId } = params;

  const listDetails = user.lists.find(
    userList => userList.id === currentListId
  );
  const { name, items } = listDetails;

  useEffect(() => {
    setCurrentList({ name, items });
  }, []);

  const saveName = newName => {
    let userListFound = user.lists.find(list => list.id === currentListId);
    userListFound.name = newName;
    setCurrentList({ ...currentList, name: userListFound.name });
    setOnEditName(false);
  };

  const removeItem = itemId => {
    let userListFound = user.lists.find(
      userList => userList.id === currentListId
    );
    userListFound.items = userListFound.items.filter(
      item => item.id !== itemId
    );
    setCurrentList({ ...currentList, items: userListFound.items });
  };

  const EditButton = ({ onClick }) => {
    return (
      <Button
        variant={'ghost'}
        _hover={{ bg: colors.spaceCadetLight, color: colors.unitedNationsBlue }}
        _active={{ bg: colors.delftBlue }}
        onClick={onClick}
      >
        <EditIcon />
      </Button>
    );
  };

  const ListName = () => {
    const [nameValue, setNameValue] = useState(name);
    const handleChange = e => setNameValue(e.target.value);
    const handleKeyDown = e => {
      if (e.key === 'Enter') {
        saveName(nameValue);
      }
    };

    return (
      <Flex h={'70px'} color={colors.lavender} py="20px" align={'center'}>
        {onEditName ? (
          <Input
            variant="unstyled"
            placeholder={'Name your list'}
            value={nameValue}
            fontSize={'xl'}
            fontWeight={'semibold'}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <>
            <Text me={'20px'} fontSize={'xl'} fontWeight={'semibold'}>
              {currentList.name}
            </Text>
            <EditButton onClick={() => setOnEditName(true)} />
          </>
        )}
      </Flex>
    );
  };

  return (
    <>
      <ListName />
      {currentList.items.length > 0 ? (
        <ItemsGrid items={currentList.items} removeItem={removeItem} />
      ) : (
        <Text color={colors.lavender}>Save something in your list</Text>
      )}
    </>
  );
}
