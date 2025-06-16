import {
  Button,
  Container,
  Group,
  Select,
  MultiSelect,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();

  const { product, loading, error } = useProductDetails(Number(id));

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>Failed to load product</div>;

  const form = useForm({
    initialValues: {
      title: product.name,
      categories: product.categories || [],
      description: product.description || '',
      price: product.price || '',
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Edit submitted', values);
  };

  return (
    <Container size="sm" pt="lg">
      <Title order={2} mb="md">Edit product</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Title"
            placeholder="Enter product title"
            {...form.getInputProps('title')}
          />

          <MultiSelect
            label="Categories"
            placeholder="Select categories"
            data={['Electronics', 'Clothing', 'Books', 'Home Appliances']}
            {...form.getInputProps('categories')}
          />

          <Textarea
            label="Description"
            autosize
            minRows={4}
            {...form.getInputProps('description')}
          />

          <Group grow>
            <TextInput
              label="Price"
              // icon="$"
              {...form.getInputProps('price')}
            />
            <TextInput
              label="Rent"
              // icon="$"
              {...form.getInputProps('rent')}
            />
            <Select
              label=" "
              data={['per hr', 'per day', 'per week']}
              {...form.getInputProps('rentType')}
            />
          </Group>

          <Button type="submit" color="violet" mt="sm" fullWidth>
            Update
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
