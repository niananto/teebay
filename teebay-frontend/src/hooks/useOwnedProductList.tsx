import {useQuery, gql} from '@apollo/client';

export const GET_PRODUCTS = gql`
  query ProductsByOwnerId($ownerId: Int!, $page: Int!, $limit: Int!) {
    productsByOwnerId(ownerId: $ownerId, page: $page, limit: $limit) {
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
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
      variables: { ownerId, page, limit },
  });
  return {
      products: data?.productsByOwnerId?.products || [],
      totalPages: data?.productsByOwnerId?.totalPages || 0,
      loading,
      error,
  };
}