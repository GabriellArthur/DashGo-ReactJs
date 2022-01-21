import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPressDelete: () => void;
}

export function DeleteModal({
  isOpen,
  onClose,
  onPressDelete
}: DeleteModalProps) {
  const cancelButtonRef = useRef();

  function handleClick() {
    onPressDelete();
    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelButtonRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          bg="gray.800"
          borderColor="transparent"
          boxShadow="lg"
          color="white"
        >
          <AlertDialogCloseButton />
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir usuários selecionados
          </AlertDialogHeader>

          <AlertDialogBody>
            Você tem certeza que quer excluir os usuários selecionados?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelButtonRef} colorScheme="purple" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleClick} ml={3}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
