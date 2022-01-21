import { Flex, Icon, Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  // Controlled components
  const [search, setSearch] = useState<string>("");

  // Uncontrolled components
  // const searchInputRef = useRef<HTMLInputElement>(null);

  function handleChangeSearchBox(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"      
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{
          color: "gray.400"
        }}
        value={search}
        onChange={handleChangeSearchBox}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
