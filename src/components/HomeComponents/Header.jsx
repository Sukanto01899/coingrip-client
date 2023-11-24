import { Button, Container, Group, Image, Text, Title } from '@mantine/core';
import image from '../../assets/header.svg';
import classes from './CSS/Header.module.css';

const Header = () => {
    return (
        <>
            <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
          Jump <span className={classes.highlight}>start</span> <br /> your crypto <br /> portfolio
          </Title>
          <Text c="dimmed" mt="md">
          Coingrip is the easiest place to buy and sell cryptocurrency. Sign up and get started today.
          </Text>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
              Source code
            </Button>
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
        </>
    );
};

export default Header;