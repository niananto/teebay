import {
  Button,
  Container,
  TextInput,
  Textarea,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Title,
  Flex,
  Text,
  FileInput,
  LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useRentTypes } from '../hooks/useRentTypes';

const steps = ['Title', 'Categories', 'Description', 'Price', 'Images', 'Summary'];

export default function AddProductPage() {
  const [step, setStep] = useState(0);

  const { fetchCategories, categories: categoryOptions, loading: loadingCategories } = useCategories();
  const { fetchRentTypes, rentTypes: rentTypeOptions, loading: loadingRentTypes } = useRentTypes();

  useEffect(() => {
    fetchCategories();
    fetchRentTypes();
  }, []);

  const form = useForm({
    initialValues: {
      name: '',
      categoryIds: [] as string[],
      description: '',
      price: 0,
      rent: 0,
      rentType: rentTypeOptions.length > 0 ? rentTypeOptions[0].value : '',
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

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const validateStep = () => {
    switch (step) {
      case 0:
        return form.validateField('name').hasError === false;
      case 1:
        return form.validateField('categoryIds').hasError === false;
      case 3:
        return !form.validateField('price').hasError &&
              !form.validateField('rent').hasError &&
              !form.validateField('rentType').hasError;
      default:
        return true;
    }
  };


  return (
    <Container size="xs" py="xl" pos="relative">
      <LoadingOverlay visible={loadingCategories || loadingRentTypes} />
      <Title order={3} ta="center" mb="lg">Adding New Product</Title>

      {step === 0 && (
        <Stack>
          <Title order={5} ta="center">Set a title for your product</Title>
          <TextInput
            placeholder="Product title"
            {...form.getInputProps('name')}
          />
        </Stack>
      )}

      {step === 1 && (
        <Stack>
          <Title order={5} ta="center">Select categories</Title>
          <MultiSelect
            data={categoryOptions}
            placeholder="Select categories"
            {...form.getInputProps('categoryIds')}
          />
          <Text fz="xs" c="dimmed" ta="center">
            NOTE: This is a multi-select dropdown
          </Text>
        </Stack>
      )}

      {step === 2 && (
        <Stack>
          <Title order={5} ta="center">Write a description</Title>
          <Textarea
            placeholder="Product description"
            minRows={4}
            resize='vertical'
            {...form.getInputProps('description')}
          />
        </Stack>
      )}

      {step === 3 && (
        <Stack>
          <Title order={5} ta="center">Enter Selling Price, Renting Price and Renting Type</Title>
          <NumberInput
            placeholder="Purchase price"
            min={0}
            prefix="$"
            {...form.getInputProps('price')}
          />
          <Flex gap="md" direction="row" wrap="wrap">
            <NumberInput
              placeholder="Rent price"
              min={0}
              prefix="$"
              style={{ flex: 1 }}
              {...form.getInputProps('rent')}
            />
            <Select
              placeholder="Select rent type"
              data={rentTypeOptions}
              style={{ flex: 1 }}
              {...form.getInputProps('rentType')}
            />
          </Flex>
        </Stack>
      )}

      {step === 4 && (
        <Stack>
          <Title order={5} ta="center">Upload Product Images</Title>
          <FileInput
            placeholder="Choose files"
            multiple
            accept="image/*"
            {...form.getInputProps('imageFiles')}
          />
          <Text fz="xs" c="dimmed" ta="center">
            NOTE: You can upload multiple images (optional)
          </Text>
        </Stack>
      )}

      {step === 5 && (
        <Stack>
          <Title order={5} ta="center">Summary</Title>
          <Text><strong>Title:</strong> {form.values.name}</Text>
          <Text>
            <strong>Categories:</strong>{' '}
            {categoryOptions
              .filter((c: { value: string; label: string }) => form.values.categoryIds.includes(c.value))
              .map((c: { value: string; label: string }) => c.label)
              .join(', ')
            }
          </Text>
          <Text><strong>Description:</strong> {form.values.description}</Text>
          <Text>
            <strong>Price:</strong> ${form.values.price}, Rent: ${form.values.rent} {form.values.rentType.replace('_', ' ')}
          </Text>
          <Text><strong>Images:</strong> {form.values.imageFiles.length} file(s) selected</Text>
        </Stack>
      )}

      <Flex justify="center" mt="xl" gap="md">
        {step > 0 && <Button variant="default" onClick={prevStep}>Back</Button>}

        {(step === 2 || step === 4) ? (
          <>
            <Button variant="light" onClick={nextStep}>Skip</Button>
            <Button onClick={() => {
              if (validateStep()) nextStep();
            }}>
              Next
            </Button>
          </>
        ) : step < steps.length - 1 ? (
          <Button onClick={() => {
            if (validateStep()) nextStep();
          }}>
            Next
          </Button>
        ) : (
          <Button color="green" onClick={() => console.log('Submitted:', form.values)}>
            Submit
          </Button>
        )}
      </Flex>

    </Container>
  );
}
