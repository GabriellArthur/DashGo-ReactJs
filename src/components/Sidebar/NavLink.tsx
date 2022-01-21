import { ElementType } from "react";
import { ActiveLink as Link } from "../ActiveLink";
import {
  Link as ChakraLink,
  Icon,
  Text,
  LinkProps as ChakraLinkProps
} from "@chakra-ui/react";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  title: string;
  href: string;
}

export function NavLink({ icon, title, href, ...rest }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {title}
        </Text>
      </ChakraLink>
    </Link>
  );
}
