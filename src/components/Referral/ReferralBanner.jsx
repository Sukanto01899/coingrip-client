import { ActionIcon, Button, CopyButton, Image, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import image from '../../assets/detailscard.svg';
import { useAuthData } from '../../context/AuthContext';
import classes from "./CSS/ReferralBanner.module.css";

const ReferralBanner = () => {
  const {state: {authUser}} = useAuthData()
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
            value={`${import.meta.env.VITE_WEB_INVITE_URL}/register?referral=${authUser._id}`}
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <CopyButton value={`${import.meta.env.VITE_WEB_INVITE_URL}/register?referral=${authUser._id}`} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
            {copied ? (
              <Button>Copied</Button>
            ) : (
              <Button >Copy</Button>
            )}
          </ActionIcon>
        </Tooltip>
      )}
         </CopyButton>
        </div>
      </div>
      <Image src={image} className={classes.image} />
    </div>
    );
};

export default ReferralBanner;