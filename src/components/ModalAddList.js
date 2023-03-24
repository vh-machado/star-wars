import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import uuid from 'react-uuid';

import { colors } from '../assets/colors';
import user from '../user';
import { useNavigate, useParams } from 'react-router-dom';

export default function ModalAddList({ isOpen, onClose, details }) {
  const [selectedLists, setSelectedLists] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const newItem = {
    id: params.id,
    category: params.category,
    name: details.name,
  };

  function isCurrentItemInList(list) {
    return list.find(
      item => item.id === params.id && item.category === params.category
    );
  }

  function saveLists(newItem) {
    selectedLists.forEach(listId => {
      let userListFound = user.lists.find(userList => userList.id === listId);

      if (!isCurrentItemInList(userListFound.items)) {
        userListFound.items.push(newItem);
      }
    });
    onClose();
  }

  function createNewList(firstItem) {
    let newList = {
      id: uuid(),
      name: 'New List',
      items: [firstItem],
    };
    user.lists.push(newList);
    navigate(`/lists/${newList.id}`);
  }

  function selectList(listId) {
    if (selectedLists.includes(listId)) {
      setSelectedLists(selectedLists.filter(list => list !== listId));
    } else {
      setSelectedLists([...selectedLists, listId]);
    }
  }

  const ListButton = ({ children, onClick, id }) => {
    return (
      <Button
        w="100%"
        variant={'outline'}
        borderColor={colors.delftBlue}
        borderWidth={'2px'}
        _hover={{ bg: colors.delftBlue }}
        _active={{
          bg: colors.delftBlue,
          color: colors.moonstone,
          borderColor: colors.moonstone,
        }}
        isActive={selectedLists.includes(id)}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={colors.spaceCadetLight} color={colors.lavender}>
        <ModalHeader>My Lists</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {user.lists.length > 0 ? (
            <VStack>
              {user.lists.map(list => {
                return (
                  <ListButton
                    key={list.id}
                    id={list.id}
                    onClick={() => selectList(list.id)}
                  >
                    {list.name}
                  </ListButton>
                );
              })}
            </VStack>
          ) : (
            <Text>Create your first list</Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            colorScheme={'cyan'}
            mr={3}
            onClick={() => createNewList(newItem)}
          >
            New List
          </Button>
          <Button colorScheme="teal" onClick={() => saveLists(newItem)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
