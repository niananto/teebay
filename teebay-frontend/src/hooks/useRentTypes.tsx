// src/hooks/useRentTypes.ts
import { gql, useLazyQuery } from '@apollo/client';

const GET_RENT_TYPES = gql`
  query GetRentTypes {
    __type(name: "RentType") {
      enumValues {
        name
      }
    }
  }
`;

export const useRentTypes = () => {
  const [fetchRentTypes, { data, loading, error }] = useLazyQuery(GET_RENT_TYPES, {
    fetchPolicy: 'network-only',
  });

  const rentTypes =
    data?.__type?.enumValues?.map((r: { name: string }) => ({
      value: r.name,
      label: r.name.replace('_', ' '),
    })) || [];

  return { fetchRentTypes, rentTypes, loading, error };
};
