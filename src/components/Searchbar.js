import React from 'react';
import {
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

export default function SearchBar({
  params: navigateParams,
  resources,
  setResults,
}) {
  const handleSubmit = e => e.preventDefault();

  const handleSearchChange = e => {
    console.log('resource atual para pesquisa: ', resources);

    if (!e.target.value) {
      if (navigateParams.category) {
        return setResults(resources);
      }
      return setResults([]);
    }

    const results = resources?.filter(resources =>
      resources.name.includes(e.target.value)
    );

    setResults(results);
  };

  return (
    <>
      <InputGroup
        w={["100%","70%"]}
        borderRadius={5}
        size="sm"
        bg="white"
        p="5px"
        onSubmit={handleSubmit}
        position={0}
      >
        <InputLeftAddon borderWidth={0} bg="white">
          <Search2Icon color="gray.600" />
        </InputLeftAddon>
        <Input
          type="text"
          placeholder="Search..."
          borderWidth={0}
          _focusVisible={false}
          onChange={handleSearchChange}
        />
      </InputGroup>
    </>
  );
}
