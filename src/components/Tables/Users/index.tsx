import { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { UseMutationResult } from "react-query";

import { UserItem } from "./UserItem";
import { DeleteModal } from "../../Users/DeleteModal";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface UsersTableProps {
  users: User[];
  deleteUser: UseMutationResult;
}

export function UsersTable({ users, deleteUser }: UsersTableProps) {
  const [selectedUsersToDelete, setSelectedUsersToDelete] = useState<number[]>(
    []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isWideVersion = useBreakpointValue<boolean>({
    base: false,
    lg: true
  });

  function handleChangeSelectAllCheckbox(ev: ChangeEvent<HTMLInputElement>) {
    if (ev.target.checked) {
      setSelectedUsersToDelete([...users.map(user => user.id)]);
    } else {
      setSelectedUsersToDelete([]);
    }
  }

  function handleChangeCheckbox(checked: boolean, id: number) {
    if (checked) {
      setSelectedUsersToDelete(prevValues => [...prevValues, id]);
    } else {
      setSelectedUsersToDelete(prevValues =>
        prevValues.filter(value => value !== id)
      );
    }
  }

  async function handleDelete(id: number) {
    await deleteUser.mutateAsync(id);
  }

  function deleteAllSelected() {
    selectedUsersToDelete.forEach(async id => {
      await handleDelete(id);
    });
  }

  function isChecked(id: number) {
    return !!selectedUsersToDelete.find(user => user === id);
  }

  const allChecked = selectedUsersToDelete.length === users.length;
  const isIndeterminate = selectedUsersToDelete.some(Number) && !allChecked;
  const isAnySelected = !!(selectedUsersToDelete.length > 0);

  return (
    <>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px={["4", "4", "6"]} color="gray.300" w="8">
              <Checkbox
                colorScheme="pink"
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={handleChangeSelectAllCheckbox}
              />
            </Th>
            <Th>Usuário</Th>
            {isWideVersion && <Th>Data de cadastro</Th>}
            <Th width="8">
              {isAnySelected && (
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="red"
                  leftIcon={<Icon as={RiDeleteBin2Line} fontSize={16} />}
                  cursor="pointer"
                  textTransform="none"
                  w="140px"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Excluir
                </Button>
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(item => (
            <UserItem
              key={item.id}
              user={item}
              isChecked={isChecked}
              onChangeCheckbox={handleChangeCheckbox}
              onDelete={handleDelete}
            />
          ))}
        </Tbody>

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onPressDelete={deleteAllSelected}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      </Table>
    </>
  );
}
