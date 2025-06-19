// src/hooks/useUserProfile.ts
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      first_name
      last_name
      username
      phone
      email
      address
    }
  }
`;

export const useProfileDetails = (id: number) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
    skip: !id,
  });

  return {
    user: data?.user,
    loading,
    error,
  };
};
