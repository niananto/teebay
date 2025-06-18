import {
  Button,
  Container,
  Group,
  MultiSelect,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
  FileInput,
  Image,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';
import { useCategories } from '../hooks/useCategories';
import { useEffect } from 'react';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { product, loading, error } = useProductDetails(productId);
  const { fetchCategories, categories: categoryOptions, loading: loadingCategories } = useCategories();

  useEffect(() => { fetchCategories(); }, []);

  const form = useForm({
    initialValues: {
      name: product?.name || '',
      categoryIds: product?.categories?.map((cat: { id: number }) => cat.id.toString()) || [],
      description: product?.description || '',
      price: product?.price?.toString() || '',
      rent: product?.rent || 0,
      rentType: product?.rent_type || 'HOURLY',
      imageFiles: [] as File[],
    },

    validate: {
      name: (value) => (value.trim() === '' ? 'Title is required' : null),
      categoryIds: (value) => (value.length === 0 ? 'Select at least one category' : null),
      price: (value) => (value.trim() === '' ? 'Price is required' : null),
      rent: (value) => (value <= 0 ? 'Rent must be greater than 0' : null),
      rentType: (value) => (value === '' ? 'Rent type is required' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Edit submitted:', {
      ...values,
      price: parseFloat(values.price),
    });

    // TODO: send mutation to backend
  };

  if (loading || loadingCategories) {
    return <LoadingOverlay visible />;
  }

  if (error || !product) {
    return <Container pt="lg">Failed to load product</Container>;
  }

  return (
    <Container size="sm" pt="lg" pos="relative">
      <Title order={2} mb="md">Edit Product</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Title"
            placeholder="Enter product title"
            {...form.getInputProps('name')}
          />

          <MultiSelect
            label="Categories"
            placeholder="Select categories"
            data={categoryOptions}
            {...form.getInputProps('categoryIds')}
          />

          <Textarea
            label="Description"
            autosize
            minRows={4}
            placeholder="Describe the product"
            {...form.getInputProps('description')}
          />

          <Group grow>
            <TextInput
              label="Price"
              placeholder="e.g. 1000"
              {...form.getInputProps('price')}
            />
            <TextInput
              label="Rent"
              placeholder="e.g. 50"
              {...form.getInputProps('rent')}
            />
            <Select
              label="Rent Type"
              data={[
                { value: 'HOURLY', label: 'Hourly' },
                { value: 'DAILY', label: 'Daily' },
                { value: 'WEEKLY', label: 'Weekly' },
                { value: 'MONTHLY', label: 'Monthly' },
              ]}
              {...form.getInputProps('rentType')}
            />
          </Group>

          {/* Optional: Show existing images */}
          {product.imageUrls && product.imageUrls.length > 0 && (
            <Stack gap="xs">
              <Title order={6}>Current Images</Title>
              <Group>
                {product.imageUrls.map((url: string, index: number) => (
                  <Image key={index} src={url} alt={`Product image ${index + 1}`} width={80} radius="md" />
                ))}
              </Group>
            </Stack>
          )}

          <FileInput
            label="Add New Images"
            placeholder="Upload product images"
            multiple
            accept="image/*"
            {...form.getInputProps('imageFiles')}
          />

          <Button type="submit" color="violet" mt="sm" fullWidth>
            Update
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
