import React, { useState, useEffect } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { swapiModule } from '../../api/swapi';
import SearchBar from '../../components/Searchbar';
import LoadingGif from '../../components/LoadingGif';
import SearchResults from '../../components/SearchResults';
import SearchBanner from '../../components/SearchBanner';
import Filters from '../../components/Filters';
import { colors } from '../../assets/colors';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [results, setResults] = useState([]);
  const [pages, setPages] = useState({ previous: null, next: null });

  const navigate = useNavigate();
  const params = useParams();

  const fetchResources = async () => {
    await getAllResources();
    if (params.category) {
      filterData(params.category);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  function setIdCategory(dataResults) {
    dataResults.forEach(item => {
      let itemUrl = item.url;
      let categoryAndId = itemUrl.replace('https://swapi.dev/api/', '');
      let categoryAndIdArray = categoryAndId.split('/');
      item['category'] = categoryAndIdArray[0];
      item['id'] = categoryAndIdArray[1];
    });
  }

  const getAllResources = async () => {
    let allResources = [];
    setIsLoading(true);

    await swapiModule.getPeople(function (data) {
      setIdCategory(data.results);
      allResources = allResources.concat(data.results);
    });
    await swapiModule.getPlanets(function (data) {
      setIdCategory(data.results);
      allResources = allResources.concat(data.results);
    });
    await swapiModule.getStarships(function (data) {
      setIdCategory(data.results);
      allResources = allResources.concat(data.results);
    });
    setResources(allResources);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const filterPeople = async (page = 1) =>
    await swapiModule.getPeople({ page }, function (data) {
      setIdCategory(data.results);
      setResources(data.results);
      setResults(data.results);
      setPages({
        previous: data.previous
          ? data.previous.replace('https://swapi.dev/api/people/?page=', '')
          : null,
        next: data.next
          ? data.next.replace('https://swapi.dev/api/people/?page=', '')
          : null,
      });
    });

  const filterPlanets = async (page = 1) =>
    await swapiModule.getPlanets({ page }, function (data) {
      setIdCategory(data.results);
      setResources(data.results);
      setResults(data.results);
      setPages({
        previous: data.previous
          ? data.previous.replace('https://swapi.dev/api/planets/?page=', '')
          : null,
        next: data.next
          ? data.next.replace('https://swapi.dev/api/planets/?page=', '')
          : null,
      });
    });

  const filterStarships = async (page = 1) =>
    await swapiModule.getStarships({ page }, function (data) {
      setIdCategory(data.results);
      setResources(data.results);
      setResults(data.results);
      setPages({
        previous: data.previous
          ? data.previous.replace('https://swapi.dev/api/starships/?page=', '')
          : null,
        next: data.next
          ? data.next.replace('https://swapi.dev/api/starships/?page=', '')
          : null,
      });
    });

  const filterByCategory = {
    people: (page) => filterPeople(page),
    planets: (page) => filterPlanets(page),
    starships: (page) => filterStarships(page),
  };

  const filterData = (filter, page) => {
    setIsLoading(true);
    filterByCategory[filter](page);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const navigateToFilter = (filter, page = 1) => {
    navigate(`/${filter}/pages/${page}`);
    filterData(filter, page);
  };

  const PageButton = ({ children, onClick }) => {
    return (
      <Button
        variant={'outline'}
        color={colors.lavender}
        borderColor={colors.lavender}
        _hover={{
          bg: colors.spaceCadetLight,
          borderColor: colors.unitedNationsBlue,
          color: colors.unitedNationsBlue,
        }}
        _active={{ bg: colors.delftBlue }}
        borderRadius={'8px'}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  };

  const Pages = () => {
    const { previous, next } = pages;
    return (
      <Flex w="100%" justify={'space-between'}>
        {previous ? (
          <PageButton onClick={() => navigateToFilter(params.category, previous)}>
            Previous
          </PageButton>
        ) : (
          <Box></Box>
        )}
        {next ? (
          <PageButton onClick={() => navigateToFilter(params.category, next)}>Next</PageButton>
        ) : (
          <Box></Box>
        )}
      </Flex>
    );
  };

  return (
    <>
      <SearchBanner>
        <SearchBar {...{ params, resources, setResults }} />
      </SearchBanner>

      <Filters {...{ navigateToFilter }} />
      {isLoading ? <LoadingGif /> : <SearchResults {...{ results }} />}
      <Pages />
    </>
  );
}
