import { Button, Dialog, Group, Text } from "@mantine/core";

const useErrorHandler = () => {

    const ResponseError = (error)=>{
        const [opened, { toggle, close }] = useDisclosure(false);
        return(
            <>
            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
              <Text size="sm" mb="xs" fw={500}>
                Subscribe to email newsletter
              </Text>
      
              <Group align="flex-end">
                <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
                <Button onClick={close}>Subscribe</Button>
              </Group>
            </Dialog>
          </>
        )
    }

    return {ResponseError}
};

export default useErrorHandler;