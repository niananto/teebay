import { useForm } from '@mantine/form';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { ActionIcon, TextInput, Button, Box } from '@mantine/core';
import { useState } from 'react';
import styles from '../styles/RegisterPage.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      username
      email
    }
  }
`;

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      address: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register] = useMutation(REGISTER);

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const { data } = await register({
        variables: {
          input: {
            first_name: values.firstName,
            last_name: values.lastName,
            username: values.username,
            phone: values.phone,
            email: values.email,
            password: values.password,
          },
        },
      });
      console.log('Registration success:', data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      <Box className={styles.card}>
        <div className={styles.title}>REGISTRATION</div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className={styles.row}>
            <TextInput
              placeholder="First Name"
              className={styles.inputHalf}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              placeholder="Last Name"
              className={styles.inputHalf}
              {...form.getInputProps('lastName')}
            />
          </div>

          <div className={styles.input}>
            <TextInput
              placeholder="Address"
              {...form.getInputProps('address')}
            />
          </div>

          <div className={styles.input}>
            <TextInput
              placeholder="Email"
              {...form.getInputProps('email')}
            />
          </div>

          <div className={styles.row}>
            <TextInput
              placeholder="Username"
              className={styles.inputHalf}
              {...form.getInputProps('username')}
            />
            <TextInput
              placeholder="Phone Number"
              className={styles.inputHalf}
              {...form.getInputProps('phone')}
            />
          </div>

          <div className={styles.input}>
            <TextInput
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              className={styles.passwordInput}
              {...form.getInputProps('password')}
              rightSection={
                <ActionIcon onClick={() => setShowPassword((prev) => !prev)} variant="transparent">
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </ActionIcon>
              }
              required
            />
          </div>

          <div className={styles.input}>
            <TextInput
              placeholder="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              className={styles.passwordInput}
              {...form.getInputProps('confirmPassword')}
              rightSection={
                <ActionIcon onClick={() => setShowConfirmPassword((prev) => !prev)} variant="transparent">
                  {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </ActionIcon>
              }
              required
            />
          </div>

          <Button type="submit" className={styles.button}>
            REGISTER
          </Button>
        </form>
        <div className={styles.linkText}>
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </Box>
    </div>
  );
}
