import {useQuery, gql} from '@apollo/client';

const GET_OWNED_PRODUCTS = gql`
  query ProductsByOwnerId($ownerId: Int!, $page: Int!, $limit: Int!) {
    ownedProducts(ownerId: $ownerId, page: $page, limit: $limit) {
      total
      page
      totalPages
      products {
          id
          name
          description
          price
          rent
          rent_type
          is_available
          created
          categories {
              id
              name
          }
      }
    }
  }
`;

interface UseOwnedProductListParams {
  ownerId: number;
  page: number;
  limit: number;
}

export const useOwnedProductList = ({ ownerId, page, limit }: UseOwnedProductListParams) => {
  const { data, loading, error } = useQuery(GET_OWNED_PRODUCTS, {
      variables: { ownerId, page, limit },
  });
  return {
      products: data?.ownedProducts?.products || [],
      totalPages: data?.ownedProducts?.totalPages || 0,
      loading,
      error,
  };
}