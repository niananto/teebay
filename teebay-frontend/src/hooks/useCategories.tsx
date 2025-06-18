// src/hooks/useCategories.ts
import { gql, useLazyQuery } from '@apollo/client';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export const useCategories = () => {
  const [fetchCategories, { data, loading, error }] = useLazyQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
  });

  const categories =
    data?.categories?.map((c: { id: number; name: string }) => ({
      value: String(c.id),
      label: c.name,
    })) || [];

  return { fetchCategories, categories, loading, error };
};
