import { useQuery, gql } from "@apollo/client";

const BOUGHT_PRODUCTS = gql`
  query BoughtProducts($userId: Int!) {
    boughtProducts(userId: $userId) {
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

const SOLD_PRODUCTS = gql`
  query SoldProducts($userId: Int!) {
    soldProducts(userId: $userId) {
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

const BORROWED_PRODUCTS = gql`
  query BorrowedProducts($userId: Int!) {
    borrowedProducts(userId: $userId) {
      rent_start
      rent_end
      product {
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
  }
`;

const LENT_PRODUCTS = gql`
  query LentProducts($userId: Int!) {
    lentProducts(userId: $userId) {
      rent_start
      rent_end
      product {
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
  }
`;

export const useBoughtProducts = (userId: number) => {
  const { loading, error, data } = useQuery(BOUGHT_PRODUCTS, {
    variables: { userId },
  });

  return {
    products: data?.boughtProducts || [],
    loading,
    error,
  };
}

export const useSoldProducts = (userId: number) => {
  const { loading, error, data } = useQuery(SOLD_PRODUCTS, {
    variables: { userId },
  });

  return {
    products: data?.soldProducts || [],
    loading,
    error,
  };
}

export const useBorrowedProducts = (userId: number) => {
  const { loading, error, data } = useQuery(BORROWED_PRODUCTS, {
    variables: { userId },
  });

  return {
    products: data?.borrowedProducts || [],
    loading,
    error,
  };
};

export const useLentProducts = (userId: number) => {
  const { loading, error, data } = useQuery(LENT_PRODUCTS, {
    variables: { userId },
  });

  return {
    products: data?.lentProducts || [],
    loading,
    error,
  };
};