import { Group } from '@mantine/core';
import useSocialLogin from '../../hook/useSocialLogin';
import GoogleButton from '../Button/GoogleButton';
import TwitterButton from '../Button/TwitterButton';


const SocialLogin = ({userErrorHandler}) => {
  // Social Login Hook
  const {twitterLoginHandler, googleLoginHandler, loading} = useSocialLogin(userErrorHandler);

    return (
      <Group grow mb="md" mt="md">
        <GoogleButton loading={loading} onClick={googleLoginHandler}  radius="xl">Google</GoogleButton>
        <TwitterButton loading={loading} onClick={twitterLoginHandler} radius="xl">Twitter</TwitterButton>
      </Group>
    );
};

export default SocialLogin;