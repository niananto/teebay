import {useQuery, gql} from '@apollo/client';

export const GET_PRODUCTS = gql`
  query Products($page: Int, $limit: Int) {
    products(page: $page, limit: $limit) {
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

export const useProductList = ({ page = 1, limit = 5 }) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
      variables: { page, limit },
  });
  return {
      products: data?.products.products || [],
      totalPages: data?.products.totalPages || 0,
      loading,
      error,
  };
}