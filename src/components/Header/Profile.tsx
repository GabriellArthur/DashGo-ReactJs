import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

type ProfileProps = {
  showProfileData?: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box marginRight="4" textAlign="right">
          <Text>Gabriel Arthur</Text>
          <Text color="gray.300" fontSize="small">
            dev.gabrielfiusa@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Gabriel Arthur"
        src="https://github.com/gabriellarthur.png"
      />
    </Flex>
  );
}
