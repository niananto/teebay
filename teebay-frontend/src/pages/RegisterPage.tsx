import { useForm } from '@mantine/form';
import {
  TextInput,
  Button,
  Box
} from '@mantine/core';
import { useState } from 'react';
import styles from '../styles/RegisterPage.module.css';
import { Link } from 'react-router-dom';

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const form = useForm<RegisterFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
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
  const togglePassword = () => setShowPassword((v) => !v);

  const handleSubmit = async (values: RegisterFormValues) => {
    console.log('Submitting registration with values:', values);
    window.location.href = '/login';
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
          <div className={styles.row}>
            <TextInput
              placeholder="Email"
              className={styles.inputHalf}
              {...form.getInputProps('email')}
            />
            <TextInput
              placeholder="Phone Number"
              className={styles.inputHalf}
              {...form.getInputProps('phone')}
            />
          </div>
          <div className={styles.input}>
            <div className={styles.passwordWrapper}>
              <TextInput
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                className={styles.passwordInput}
                {...form.getInputProps('password')}
              />
              <button
                type="button"
                onClick={togglePassword}
                className={styles.toggleButton}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.passwordWrapper}>
              <TextInput
                placeholder="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                className={styles.passwordInput}
                {...form.getInputProps('confirmPassword')}
              />
              <button
                type="button"
                onClick={togglePassword}
                className={styles.toggleButton}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
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
