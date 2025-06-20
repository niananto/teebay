import { useQuery, gql } from '@apollo/client';

export const GET_PRODUCT = gql`
 query Product($id: Int!) {
    product(id: $id) {
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

export const useProductDetails = (id: number) => {
  const { data, loading, error, refetch  } = useQuery(GET_PRODUCT, {
    variables: { id },
  });
  return {
    product: data?.product || null,
    loading,
    error,
    refetch,
  };
}