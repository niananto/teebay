import { useForm } from '@mantine/form';
import { Button, TextInput, Text, ActionIcon } from '@mantine/core';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const LOGIN = gql`
  mutation Login($handle: String!, $password: String!) {
    login(input: { handle: $handle, password: $password }) {
      id
      first_name
      last_name
      username
      phone
      email
      address
    }
  }
`;

type LoginFormValues = {
  handle: string;
  password: string;
};

export default function LoginPage() {
  const { user, login } = useAuth();

  if (user) return <Navigate to="/products" />;

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<LoginFormValues>({
    initialValues: { handle: '', password: '' },
  });

  const [validateLogin, { loading }] = useMutation(LOGIN);

  const handleSubmit = async (values: LoginFormValues) => {
    setErrorMessage('');
    try {
      const res = await validateLogin({
        variables: { handle: values.handle, password: values.password },
      });
      const user = res.data.login;
      login({ id: user.id, username: user.username });
      navigate('/products');
    } catch (error: any) {
      setErrorMessage(`Login failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>SIGN IN</div>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            placeholder="Email/Username/Phone"
            className={styles.input}
            {...form.getInputProps('handle')}
            required
          />

          <TextInput
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            className={styles.input}
            rightSection={
              <ActionIcon onClick={() => setShowPassword((prev) => !prev)} variant='transparent'>
                {showPassword ? <IconEyeOff size="1rem" /> : <IconEye size="1rem" />}
              </ActionIcon>
            }
            {...form.getInputProps('password')}
            required
          />

          {errorMessage && (
            <Text color="red" size="sm" mt="sm">
              {errorMessage}
            </Text>
          )}

          <Button type="submit" className={styles.button} loading={loading}>
            LOGIN
          </Button>
        </form>

        <div className={styles.linkText}>
          Don&apos;t have an account? <Link to="/register">Signup</Link>
        </div>
      </div>
    </div>
  );
}
