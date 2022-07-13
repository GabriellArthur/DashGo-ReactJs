import { Flex, Icon, Input } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

export function SearchBox() {
  return (
    <Flex
      as="label"
      flex="1"
      paddingY="4"
      paddingX="8"
      marginLeft="6"
      alignSelf="center"
      align="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
      maxWidth={400}
    >
      <Input
        color="gray.50"
        variant="unstyled"
        paddingX="4"
        marginRight="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
