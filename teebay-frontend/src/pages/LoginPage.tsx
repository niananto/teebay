import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/LoginPage.module.css';
// import { gql, useMutation } from '@apollo/client';

// const LOGIN = gql`
//   mutation Login($data: AuthInput!) {
//     login(data: $data) {
//       success
//       user { id name }
//     }
//   }
// `;

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
    const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    initialValues: { email: '', password: '' },
  });

//   const [validateLogin] = useMutation(LOGIN);

  const handleSubmit = async (values: LoginFormValues) => {
    console.log('Submitting login with values:', values);
    // const res = await validateLogin({ variables: { data: values } });
    // console.log(res.data.login.user);    
    // localStorage.setItem('user', JSON.stringify(res.data.login.user));
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Test User' })); // Mock user data for demo
    // redirect to home page or dashboard
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>SIGN IN</div>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            placeholder="Email"
            className={styles.input}
            {...form.getInputProps('email')}
            required
          />
          <TextInput
            placeholder="Password"
            type="password"
            className={styles.input}
            {...form.getInputProps('password')}
            required
          />
          <Button type="submit" className={styles.button}>
            LOGIN
          </Button>
        </form>

        <div className={styles.linkText}>
          Don&apos;t have an account? <Link to='/register'>Signup</Link>
        </div>
      </div>
    </div>
  );
}
