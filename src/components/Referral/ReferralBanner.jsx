import { Button, Image, Text, TextInput, Title } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import image from '../../assets/detailscard.svg';
import classes from "./CSS/ReferralBanner.module.css";

const ReferralBanner = () => {
    const clipboard = useClipboard();

    return (
        <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}> Invite friends. </Title>
        <Text fw={500} fz="lg" mb={5}>
         Claim $100 off.
        </Text>
        <Text fz="sm" c="dimmed">
          Refer your friends and you'll both per $10 of your next paid  month of coingrip
        </Text>

        <div className={classes.controls}>
          <TextInput
            readOnly
            placeholder="https://coingrip.netlify.app?refer=8jeorhjteuu3o4"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button className={classes.control}>Copy Link</Button>
        </div>
      </div>
      <Image src={image} className={classes.image} />
    </div>
    );
};

export default ReferralBanner;