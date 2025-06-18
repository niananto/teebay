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
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';
import { useCategories } from '../hooks/useCategories';
import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Int!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      rent
      rent_type
      is_available
    }
  }
`;

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
      price: (value) => (value <= 0 ? 'Price must be greater than 0' : null),
      rent: (value) => (value <= 0 ? 'Rent must be greater than 0' : null),
      rentType: (value) => (value === '' ? 'Rent type is required' : null),
    },
  });

  const [updateProduct, { loading: updating, error: updateError }] = useMutation(UPDATE_PRODUCT);
  const navigate = useNavigate();
  
  const handleSubmit = async (values: typeof form.values) => {
    await updateProduct({
      variables: {
        id: productId,
        input: {
          name: values.name,
          description: values.description,
          price: values.price,
          rent: values.rent,
          rent_type: values.rentType,
          categoryIds: values.categoryIds.map(Number),
          imageUrls: [],
        },
      },
    });

    if (updateError) {
      console.error('Update failed:', updateError);
    } else {
      // Optionally, redirect or show success message
      console.log('Product updated successfully');
      // You can use a router to redirect or show a success notification
      navigate(`/products/${productId}`);
    }
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
            <NumberInput
              label="Price"
              min={0}
              prefix="$"
              placeholder="e.g. 1000"
              {...form.getInputProps('price')}
            />
            <NumberInput
              label="Rent"
              min={0}
              prefix="$"
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

          <Button type="submit" color="violet" mt="sm" fullWidth loading={updating}>
            Update
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
