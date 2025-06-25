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
  LoadingOverlay,
  Progress,
  Card,
  Group,
  ThemeIcon
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useRentTypes } from '../hooks/useRentTypes';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const ADD_PRODUCT = gql`
  mutation CreateProduct($ownerId: Int!, $input: CreateProductInput!) {
    createProduct(ownerId: $ownerId, input: $input) {
      id
      name
      description
      price
      rent
      rent_type
      is_available
      owner_id
      created
      categories {
          id
          name
      }
    }
  }
`;

const steps = ['Title', 'Categories', 'Description', 'Price', 'Images', 'Summary'];

export default function AddProductPage() {
  const navigate = useNavigate();

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

  const { user } = useAuth();
  if (!user) {
    return <Text color="red">You must be logged in to add a product.</Text>;
  }
  const [addProduct, { loading: submitting, error: submitError }] = useMutation(ADD_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      cache.modify({
        fields: {
          ownedProducts(existingOwnedProducts = {}, modifierDetails) {
            const newProductRef = cache.writeFragment({
              data: createProduct,
              fragment: gql`
                fragment NewProduct on Product {
                  id
                  name
                  description
                  price
                  rent
                  rent_type
                  is_available
                  owner_id
                  created
                  categories {
                    id
                    name
                  }
                }
              `,
            });

            const existingProducts = existingOwnedProducts.products || [];
            const newTotal = (existingOwnedProducts.total || 0) + 1;

            let limit = 5;
            if (modifierDetails && typeof modifierDetails.storeFieldName === 'string') {
              const match = modifierDetails.storeFieldName.match(/limit:(\d+)/);
              if (match) {
                limit = parseInt(match[1], 10);
              }
            }

            return {
              ...existingOwnedProducts,
              total: newTotal,
              totalPages: Math.ceil(newTotal / limit),
              products: [newProductRef, ...existingProducts],
            };
          },
        },
      });
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    const valid = form.validate();

    if (!valid.hasErrors) {
      try {
        const response = await addProduct({
          variables: {
            ownerId: user.id,
            input: {
              name: form.values.name,
              description: form.values.description,
              price: values.price,
              rent: form.values.rent,
              rent_type: form.values.rentType,
              categoryIds: form.values.categoryIds.map((id) => parseInt(id, 10)),
              imageUrls: [],
            },
          },
        });

        console.log('Product created:', response.data.createProduct);
        navigate('/products');
      } catch (err) {
        console.error('Submission failed:', err);
      }
    }
  };

  const [step, setStep] = useState(0);
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

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Container size="md" py="xl" pos="relative">
      <LoadingOverlay visible={loadingCategories || loadingRentTypes} />
      
      <Card className="glass-card" p="3rem" radius="xl">
        <Stack gap="xl">
          <div>
            <Title order={2} ta="center" className="gradient-text" mb="md">
              Add New Product
            </Title>
            <Progress 
              value={progress} 
              size="lg" 
              radius="xl"
              style={{
                background: 'rgba(102, 126, 234, 0.1)',
              }}
              styles={{
                bar: {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }
              }}
            />
            <Text size="sm" ta="center" mt="sm" c="dimmed">
              Step {step + 1} of {steps.length}: {steps[step]}
            </Text>
          </div>

          <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center' }}>
            {step === 0 && (
              <Stack w="100%" gap="lg">
                <div style={{ textAlign: 'center' }}>
                  <ThemeIcon size={60} radius="xl" mb="md" style={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    margin: '0 auto'
                  }}>
                    <IconCheck size={30} />
                  </ThemeIcon>
                  <Title order={4} className="gradient-text">Set a title for your product</Title>
                </div>
                <TextInput
                  placeholder="Enter an attractive product title"
                  size="lg"
                  {...form.getInputProps('name')}
                  styles={{
                    input: {
                      borderRadius: '12px',
                      border: '2px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      fontSize: '1.1rem',
                      padding: '12px 16px',
                    }
                  }}
                />
              </Stack>
            )}

            {step === 1 && (
              <Stack w="100%" gap="lg">
                <div style={{ textAlign: 'center' }}>
                  <Title order={4} className="gradient-text">Select categories</Title>
                  <Text size="sm" c="dimmed" mt="xs">Choose all relevant categories for better visibility</Text>
                </div>
                <MultiSelect
                  data={categoryOptions}
                  placeholder="Select categories"
                  size="lg"
                  {...form.getInputProps('categoryIds')}
                  styles={{
                    input: {
                      borderRadius: '12px',
                      border: '2px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                    }
                  }}
                />
              </Stack>
            )}

            {step === 2 && (
              <Stack w="100%" gap="lg">
                <div style={{ textAlign: 'center' }}>
                  <Title order={4} className="gradient-text">Write a description</Title>
                  <Text size="sm" c="dimmed" mt="xs">Describe your product in detail (optional)</Text>
                </div>
                <Textarea
                  placeholder="Describe your product's features, condition, and any important details..."
                  minRows={6}
                  resize='vertical'
                  size="lg"
                  {...form.getInputProps('description')}
                  styles={{
                    input: {
                      borderRadius: '12px',
                      border: '2px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                    }
                  }}
                />
              </Stack>
            )}

            {step === 3 && (
              <Stack w="100%" gap="lg">
                <div style={{ textAlign: 'center' }}>
                  <Title order={4} className="gradient-text">Set your pricing</Title>
                  <Text size="sm" c="dimmed" mt="xs">Enter selling price, rental price and rental period</Text>
                </div>
                <NumberInput
                  label="Purchase Price"
                  placeholder="Enter selling price"
                  min={0}
                  prefix="$"
                  size="lg"
                  {...form.getInputProps('price')}
                  styles={{
                    input: {
                      borderRadius: '12px',
                      border: '2px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                    }
                  }}
                />
                <Group grow>
                  <NumberInput
                    label="Rental Price"
                    placeholder="Enter rental price"
                    min={0}
                    prefix="$"
                    size="lg"
                    {...form.getInputProps('rent')}
                    styles={{
                      input: {
                        borderRadius: '12px',
                        border: '2px solid rgba(102, 126, 234, 0.1)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                      }
                    }}
                  />
                  <Select
                    label="Rental Period"
                    placeholder="Select period"
                    data={rentTypeOptions}
                    size="lg"
                    {...form.getInputProps('rentType')}
                    styles={{
                      input: {
                        borderRadius: '12px',
                        border: '2px solid rgba(102, 126, 234, 0.1)',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                      }
                    }}
                  />
                </Group>
              </Stack>
            )}

            {step === 4 && (
              <Stack w="100%" gap="lg">
                <div style={{ textAlign: 'center' }}>
                  <Title order={4} className="gradient-text">Upload product images</Title>
                  <Text size="sm" c="dimmed" mt="xs">Add photos to showcase your product (optional)</Text>
                </div>
                <FileInput
                  placeholder="Choose image files"
                  multiple
                  accept="image/*"
                  size="lg"
                  {...form.getInputProps('imageFiles')}
                  styles={{
                    input: {
                      borderRadius: '12px',
                      border: '2px solid rgba(102, 126, 234, 0.1)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                    }
                  }}
                />
              </Stack>
            )}

            {step === 5 && (
              <Stack w="100%" gap="lg">
                <div style={{ textAlign: 'center' }}>
                  <Title order={4} className="gradient-text">Review your product</Title>
                  <Text size="sm" c="dimmed" mt="xs">Please review all details before publishing</Text>
                </div>
                <Card p="lg" radius="md" style={{ background: 'rgba(102, 126, 234, 0.05)', border: '1px solid rgba(102, 126, 234, 0.1)' }}>
                  <Stack gap="sm">
                    <Text><strong>Title:</strong> {form.values.name}</Text>
                    <Text>
                      <strong>Categories:</strong>{' '}
                      {categoryOptions
                        .filter((c: { value: string; label: string }) => form.values.categoryIds.includes(c.value))
                        .map((c: { value: string; label: string }) => c.label)
                        .join(', ')
                      }
                    </Text>
                    <Text><strong>Description:</strong> {form.values.description || 'No description provided'}</Text>
                    <Text>
                      <strong>Pricing:</strong> ${form.values.price} to buy, ${form.values.rent} to rent {form.values.rentType.toLowerCase()}
                    </Text>
                    <Text><strong>Images:</strong> {form.values.imageFiles.length} file(s) selected</Text>
                  </Stack>
                </Card>
              </Stack>
            )}
          </div>

          <Group justify="center" gap="lg">
            {step > 0 && (
              <Button 
                variant="outline" 
                onClick={prevStep}
                leftSection={<IconChevronLeft size={18} />}
                style={{ borderRadius: '12px' }}
              >
                Back
              </Button>
            )}

            {(step === 2 || step === 4) ? (
              <Group gap="sm">
                <Button 
                  variant="light" 
                  onClick={nextStep}
                  style={{ borderRadius: '12px' }}
                >
                  Skip
                </Button>
                <Button 
                  variant="gradient"
                  gradient={{ from: '#667eea', to: '#764ba2' }}
                  onClick={() => {
                    if (validateStep()) nextStep();
                  }}
                  rightSection={<IconChevronRight size={18} />}
                  style={{ borderRadius: '12px' }}
                >
                  Next
                </Button>
              </Group>
            ) : step < steps.length - 1 ? (
              <Button 
                variant="gradient"
                gradient={{ from: '#667eea', to: '#764ba2' }}
                onClick={() => {
                  if (validateStep()) nextStep();
                }}
                rightSection={<IconChevronRight size={18} />}
                style={{ borderRadius: '12px' }}
              >
                Next
              </Button>
            ) : (
              <Button 
                size="lg"
                variant="gradient"
                gradient={{ from: '#10b981', to: '#059669' }}
                onClick={() => {handleSubmit(form.values);}}
                loading={submitting}
                style={{ borderRadius: '12px', padding: '12px 32px' }}
              >
                Publish Product
              </Button>
            )}
          </Group>

          {submitError && (
            <Text c="red" ta="center" p="sm" style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px'
            }}>
              {submitError.message}
            </Text>
          )}
        </Stack>
      </Card>
    </Container>
  );
}