import React, { useState } from 'react';
import { Button, Input, InputGroup, InputRightAddon, useDisclosure } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import AlertSearch from './AlertSearch';

export default function SearchBar({
  params: navigateParams,
  navigateToSearch,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState('');
  const handleChange = e => setValue(e.target.value);

  const handleSubmit = e => e.preventDefault();

  const validateSearch = () => {
    if(navigateParams.category) {
      navigateToSearch(navigateParams.category, value)
    } else {
      onOpen()
    }
  }

  return (
    <>
      <InputGroup
        w={['100%', '70%']}
        borderRadius={5}
        size="sm"
        bg="white"
        px="0px"
        py="5px"
        onSubmit={handleSubmit}
        alignItems={'center'}
        position={0}
      >
        <Input
          type="text"
          placeholder="Search..."
          borderWidth={0}
          value={value}
          m={'5px'}
          _focusVisible={false}
          onChange={handleChange}
        />
        <InputRightAddon borderWidth={0} px={'10px'} bg="white">
          <Button
            colorScheme={'teal'}
            onClick={() => validateSearch()}
          >
            <Search2Icon color="white" />
          </Button>
        </InputRightAddon>
      </InputGroup>

      <AlertSearch {...{isOpen, onClose}}/>
    </>
  );
}
