import {useQuery, gql} from '@apollo/client';

const GET_OTHERS_PRODUCTS = gql`
  query OthersProducts($ownerId: Int!, $page: Int!, $limit: Int!) {
    othersProducts(ownerId: $ownerId, page: $page, limit: $limit) {
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

export const useOthersProductList = ({ ownerId, page, limit }: UseOwnedProductListParams) => {
  const { data, loading, error } = useQuery(GET_OTHERS_PRODUCTS, {
      variables: { ownerId, page, limit },
  });
  return {
      products: data?.othersProducts?.products || [],
      totalPages: data?.othersProducts?.totalPages || 0,
      loading,
      error,
  };
}