import { useForm } from '@mantine/form';
import { Button, TextInput, Container } from '@mantine/core';

type RegisterFormValues = {
  email: string;
  password: string;
};

export default function RegisterPage() {
  const form = useForm<RegisterFormValues>({
    initialValues: { email: '', password: '' },
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    console.log('Submitting registration with values:', values);
    // redirect to login page after successful registration
    window.location.href = '/login';
  };

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" {...form.getInputProps('email')} />
        <TextInput label="Password" type="password" {...form.getInputProps('password')} />
        <Button type="submit" mt="md">Create New Account</Button>
      </form>
    </Container>
  );
}
