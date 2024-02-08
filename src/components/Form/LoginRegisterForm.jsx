import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLoginRegister from '../../hook/useLoginRegister';
import Captcha from '../Captcha/Captcha';
import SocialLogin from './SocialLogin';

const LoginRegisterForm = (props) => {
    const {pathname} = useLocation();
    const path = pathname.replace(/^\/|\/$/g, '');
    const [type, setType] = useState(path); //State for changing Form registration type
    const captchaRef = useRef(null)
  
    // Form data state
    const form = useForm({
      initialValues: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        terms: true,
        referral: props.query
      },
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
      },
    });

     // Login and Registration Handler hook
     const {loginHandler, registerHandler, userErrorHandler, loading} = useLoginRegister(form, captchaRef);

  
    return (
        <Container size='xs' mih='100vh' pt={50}>
            <Paper radius="md" p="xl" withBorder {...props}>
              <Text size="lg" fw={500}>
                Welcome to COINGRIP, {type} with
              </Text>

             {/* Social Login Component */}
              <SocialLogin userErrorHandler={userErrorHandler}/>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

{/* Form Start */}
      <form onSubmit={form.onSubmit(type === 'register' ? registerHandler : loginHandler)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              required
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              error={form.errors.password && 'Name is required'}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'login' && <Anchor type="button"  c="dimmed" size="xs">
            Forgot password?
          </Anchor>}

        {type === 'register' && (
            <PasswordInput
            required
            label="Confirm Password"
            placeholder="Your password"
            value={form.values.confirmPassword}
            onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
            error={form.errors.confirmPassword && 'Password should include at least 6 characters'}
            radius="md"
          />
          )}
        {type === 'register' && (
            <TextInput
            label="Referral (Optional)"
            placeholder="Referral code"
            value={form.values.referral}
            onChange={(event) => form.setFieldValue('referral', event.currentTarget.value)}
            radius="md"
          />
          )}

{/* Google recaptcha set up */}
          <Stack align='center'>
            <Captcha captchaRef={captchaRef}/>
          </Stack>

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
        <Anchor component="button" type="button" c="dimmed" onClick={() => setType(type === 'login' ? 'register' : 'login')} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>

          <Button loading={loading} type="submit" radius="xl" disabled={loading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
        </Container>
    );
};

export default LoginRegisterForm;