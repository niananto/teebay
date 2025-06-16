import { useForm } from '@mantine/form';
import { Button, TextInput, Container } from '@mantine/core';
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
    window.location.href = '/';
  };

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" {...form.getInputProps('email')} />
        <TextInput label="Password" type="password" {...form.getInputProps('password')} />
        <Button type="submit" mt="md">Login</Button>
      </form>
    </Container>
  );
}
