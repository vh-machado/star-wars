import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';

import { swapiModule } from '../../api/swapi';
import LoadingGif from '../../components/LoadingGif';
import ModalAddList from '../../components/ModalAddList';
import { colors } from '../../assets/colors';
import peopleIcon from '../../assets/img/people-icon.png';
import planetsIcon from '../../assets/img/planets-icon.png';
import starshipsIcon from '../../assets/img/starships-icon.png';

export default function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const params = useParams();
  const { category, id } = params;

  const fetchPerson = personId => {
    swapiModule.getPerson(personId, function (data) {
      setDetails(data);
    });
  };

  const fetchPlanet = planetId => {
    swapiModule.getPlanet(planetId, function (data) {
      setDetails(data);
    });
  };

  const fetchStarship = starshipId => {
    swapiModule.getStarship(starshipId, function (data) {
      setDetails(data);
    });
  };

  const fetchByCategory = {
    people: id => fetchPerson(id),
    planets: id => fetchPlanet(id),
    starships: id => fetchStarship(id),
  };

  const categoryIcon = {
    people: peopleIcon,
    planets: planetsIcon,
    starships: starshipsIcon,
  };

  const categoryBackground = {
    people: colors.slateBlue,
    planets: colors.moonstone,
    starships: colors.unitedNationsBlue,
  };

  const fetchData = (category, id) => {
    //setIsLoading(true);
    fetchByCategory[category](id);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const formatAtributeTitle = atribute => {
    return (
      atribute.charAt(0).toUpperCase() + atribute.replace('_', ' ').slice(1)
    );
  };

  useEffect(() => {
    fetchData(category, id);
  }, []);

  const Atributes = () => {
    const atributes = Object.keys(details);

    return atributes?.map((atribute, index) => {
      return (
        details[atribute].length > 0 && (
          <Box key={index} my="20px">
            <Text
              borderColor={colors.spaceCadetLight}
              borderTopWidth={'3px'}
              borderStartWidth={'3px'}
              p={'10px'}
              mb={'10px'}
              borderTopStartRadius={'8px'}
              color={colors.lavender}
              fontSize={'md'}
              fontWeight={'bold'}
            >
              {formatAtributeTitle(atribute)}
            </Text>
            <AtributeDetail atribute={atribute} />
          </Box>
        )
      );
    });
  };

  const AtributeDetail = ({ atribute }) => {
    return Array.isArray(details[atribute]) ? (
      details[atribute].map((detail, index) => {
        return (
          <Text
            key={index}
            color={colors.lavender}
            fontSize={'sm'}
            whiteSpace={'pre-wrap'}
            mx={'20px'}
          >
            {detail}
          </Text>
        );
      })
    ) : (
      <Text
        color={colors.lavender}
        fontSize={'sm'}
        whiteSpace={'pre-wrap'}
        mx={'20px'}
      >
        {details[atribute]}
      </Text>
    );
  };

  const MenuButton = ({ children, leftIcon, onClick }) => {
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
        leftIcon={leftIcon}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  };

  const Menu = () => {
    return (
      <Flex
        h={'100px'}
        w="100%"
        justify={'space-between'}
        align={'flex-end'}
        mb={'10px'}
        p={'10px'}
      >
        <MenuButton onClick={() => navigate(-1)} leftIcon={<ArrowBackIcon />}>
          Voltar
        </MenuButton>
        <MenuButton
          onClick={() => {
            onOpen();
          }}
          leftIcon={<StarIcon />}
        >
          Save
        </MenuButton>
      </Flex>
    );
  };

  const HeaderDetails = () => {
    return (
      <Flex
        bg={categoryBackground[category]}
        borderRadius={'8px'}
        p={['20px']}
        justify={'center'}
      >
        <Image
          w={['24px', '32px']}
          h={['24px', '32px']}
          src={categoryIcon[category]}
        />
      </Flex>
    );
  };

  return (
    <Box mx={['5px', '10%', '20%']}>
      {isLoading ? (
        <LoadingGif />
      ) : (
        <>
          <Menu />
          <HeaderDetails />
          <Atributes />
        </>
      )}
      <ModalAddList {...{ isOpen, onClose, details }} />
    </Box>
  );
}
