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
} from '@mantine/core';
import { useState } from 'react';

const steps = ['Title', 'Categories', 'Description', 'Price', 'Summary'];

export default function AddProductPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    categories: [] as string[],
    description: '',
    price: '',
    rent: 0,
    rentType: '',
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const updateForm = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Container size="xs" py="xl">
      <Title order={3} ta="center" mb="lg">Create product</Title>

      {step === 0 && (
        <Stack>
          <Title order={5} ta="center">Select a title for your product</Title>
          <TextInput
            placeholder="Product title"
            value={formData.title}
            onChange={(e) => updateForm('title', e.currentTarget.value)}
          />
        </Stack>
      )}

      {step === 1 && (
        <Stack>
          <Title order={5} ta="center">Select categories</Title>
          <MultiSelect
            data={['Electronics', 'Toys', 'Furniture']}
            placeholder="Select categories"
            value={formData.categories}
            onChange={(val) => updateForm('categories', val)}
          />
          <Text fz="xs" c="dimmed" ta="center">
            NOTE: This is a multi-select dropdown
          </Text>
        </Stack>
      )}

      {step === 2 && (
        <Stack>
          <Title order={5} ta="center">Select description</Title>
          <Textarea
            placeholder="Product description"
            value={formData.description}
            onChange={(e) => updateForm('description', e.currentTarget.value)}
            minRows={4}
          />
        </Stack>
      )}

      {step === 3 && (
        <Stack>
          <Title order={5} ta="center">Select price</Title>
          <TextInput
            placeholder="Purchase price"
            value={formData.price}
            onChange={(e) => updateForm('price', e.currentTarget.value)}
          />
          <Flex gap="md" direction="row" wrap="wrap">
            <NumberInput
              placeholder="Rent price"
              value={formData.rent}
              onChange={(val) => updateForm('rent', val ?? 0)}
              min={0}
              prefix="$"
            />
            <Select
              placeholder="Select rent type"
              data={[
                { value: 'per_hour', label: 'Per Hour' },
                { value: 'per_day', label: 'Per Day' },
                { value: 'per_week', label: 'Per Week' },
              ]}
              value={formData.rentType}
              onChange={(val) => updateForm('rentType', val || '')}
            />
          </Flex>
        </Stack>
      )}

      {step === 4 && (
        <Stack>
          <Title order={5} ta="center">Summary</Title>
          <Text><strong>Title:</strong> {formData.title}</Text>
          <Text><strong>Categories:</strong> {formData.categories.join(', ')}</Text>
          <Text><strong>Description:</strong> {formData.description}</Text>
          <Text>
            <strong>Price:</strong> ${formData.price}, Rent: ${formData.rent} {formData.rentType.replace('_', ' ')}
          </Text>
        </Stack>
      )}

      <Flex justify="center" mt="xl" gap="md">
        {step > 0 && <Button variant="default" onClick={prevStep}>Back</Button>}
        {step < steps.length - 1 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button color="green" onClick={() => console.log('Submitted:', formData)}>
            Submit
          </Button>
        )}
      </Flex>
    </Container>
  );
}
