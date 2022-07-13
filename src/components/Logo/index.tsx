import { Text, TextProps } from '@chakra-ui/react';

type LogoProps = TextProps;

export function Logo({ ...rest }: LogoProps) {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      width="64"
      {...rest}
    >
      dashgo
      <Text as="span" color="pink.500" marginLeft="1">
        .
      </Text>
    </Text>
  );
}
