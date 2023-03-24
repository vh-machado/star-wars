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
  const [results, setResults] = useState([]);
  const [pages, setPages] = useState({ previous: null, next: null });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.category) {
      if (params.search) {
        searchData(params.category, params.search, params.pageNumber);
      } else {
        filterData(params.category, params.pageNumber);
      }
    }
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

  const getPreviousNextPages = (data, path) => {
    return {
      previous: data.previous ? data.previous.replace(path, '') : null,
      next: data.next ? data.next.replace(path, '') : null,
    };
  };

  const searchPeople = async (search, page = 1) => {
    let path = `https://swapi.dev/api/people/?search=${search}&page=`;
    await swapiModule.getPeople({ page, search }, function (data) {
      setIdCategory(data.results);
      setResults(data.results);
      setPages(getPreviousNextPages(data, path));
    });
  };

  const searchPlanets = async (search, page = 1) => {
    let path = `https://swapi.dev/api/planets/?search=${search}&page=`;
    await swapiModule.getPlanets({ page, search }, function (data) {
      setIdCategory(data.results);
      setResults(data.results);
      setPages(getPreviousNextPages(data, path));
    });
  };

  const searchStarships = async (search, page = 1) => {
    let path = `https://swapi.dev/api/starships/?search=${search}&page=`;
    await swapiModule.getStarships({ page, search }, function (data) {
      setIdCategory(data.results);
      setResults(data.results);
      setPages(getPreviousNextPages(data, path));
    });
  };

  const filterPeople = async (page = 1) => {
    let path = 'https://swapi.dev/api/people/?page=';
    await swapiModule.getPeople({ page }, function (data) {
      setIdCategory(data.results);
      setResults(data.results);
      setPages(getPreviousNextPages(data, path));
    });
  };

  const filterPlanets = async (page = 1) => {
    let path = 'https://swapi.dev/api/planets/?page=';

    await swapiModule.getPlanets({ page }, function (data) {
      setIdCategory(data.results);
      setResults(data.results);
      setPages(getPreviousNextPages(data, path));
    });
  };

  const filterStarships = async (page = 1) => {
    let path = 'https://swapi.dev/api/starships/?page=';

    await swapiModule.getStarships({ page }, function (data) {
      setIdCategory(data.results);
      setResults(data.results);
      setPages(getPreviousNextPages(data, path));
    });
  };

  const filterByCategory = {
    people: page => filterPeople(page),
    planets: page => filterPlanets(page),
    starships: page => filterStarships(page),
  };

  const searchByCategory = {
    people: (search, page) => searchPeople(search, page),
    planets: (search, page) => searchPlanets(search, page),
    starships: (search, page) => searchStarships(search, page),
  };

  const filterData = (filter, page) => {
    setIsLoading(true);
    filterByCategory[filter](page);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const searchData = (category, search, page) => {
    setIsLoading(true);
    searchByCategory[category](search, page);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const navigateToFilter = (filter, page = 1) => {
    navigate(`/star-wars/${filter}/pages/${page}`);
    filterData(filter, page);
  };

  const navigateToSearch = (category, search, page = 1) => {
    navigate(`/star-wars/${category}/search/${search}/pages/${page}`);
    searchData(category, search, page);
  };

  const navigateToPage = pageNumber => {
    if (params.query) {
      navigateToSearch(params.category, params.query, pageNumber);
    } else {
      navigateToFilter(params.category, pageNumber);
    }
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
          <PageButton onClick={() => navigateToPage(previous)}>
            Previous
          </PageButton>
        ) : (
          <Box></Box>
        )}
        {next ? (
          <PageButton onClick={() => navigateToPage(next)}>Next</PageButton>
        ) : (
          <Box></Box>
        )}
      </Flex>
    );
  };

  return (
    <>
      <SearchBanner>
        <SearchBar {...{ params, navigateToSearch }} />
      </SearchBanner>

      <Filters {...{ navigateToFilter }} />
      {isLoading ? (
        <LoadingGif />
      ) : (
        <>
          <SearchResults {...{ results }} />
          <Pages />
        </>
      )}
    </>
  );
}
