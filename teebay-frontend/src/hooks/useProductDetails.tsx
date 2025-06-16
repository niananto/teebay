// import { useQuery, gql } from '@apollo/client';

// export const GET_PRODUCT = gql`
//   query Product($id: ID!) {
//     products(id: $id) {
//       name
//       description
//       price
//       mode
//     }
//   }
// `;

// categories ELECTRONICS, FURNITURE, HOME APPLIANCES, SPORTING GOODS, OUTDOOR, TOYS
const dummyProducts = [
  { id: '1', name: 'Product 1', description: 'Description 1', price: 10, mode: 'buy', categories: ['ELECTRONICS'] },
  { id: '2', name: 'Product 2', description: 'Description 2', price: 20, mode: 'sell' , categories: ['FURNITURE'] },
  { id: '3', name: 'Product 3', description: 'Description 3', price: 30, mode: 'buy', categories: ['HOME APPLIANCES'] },
  { id: '4', name: 'Product 4', description: 'Description 4', price: 40, mode: 'sell', categories: ['SPORTING GOODS'] },
  { id: '5', name: 'Product 5', description: 'Description 5', price: 50, mode: 'buy', categories: ['OUTDOOR'] },
  { id: '6', name: 'Product 6', description: 'Description 6', price: 60, mode: 'sell', categories: ['TOYS'] },
  { id: '7', name: 'Product 7', description: 'Description 7', price: 70, mode: 'buy', categories: ['ELECTRONICS'] },
  { id: '8', name: 'Product 8', description: 'Description 8', price: 80, mode: 'sell', categories: ['FURNITURE'] },
  { id: '9', name: 'Product 9', description: 'Description 9', price: 90, mode: 'buy', categories: ['HOME APPLIANCES'] },
  { id: '10', name: 'Product 10', description: 'Description 10', price: 100, mode: 'sell', categories: ['SPORTING GOODS'] },
  { id: '11', name: 'Product 11', description: 'Description 11', price: 110, mode: 'buy', categories: ['OUTDOOR'] },
  { id: '12', name: 'Product 12', description: 'Description 12', price: 120, mode: 'sell', categories: ['TOYS'] },
];

export const useProductDetails = (id: number) => {
  // const { data, loading, error } = useQuery(GET_PRODUCT, {
  //   variables: { id },
  // });
  // return {
  //   product: data?.products?.[0] ?? null,
  //   loading,
  //   error,
  // };

  return {
    product: dummyProducts.find((p) => p.id === String(id)) || null,
    loading: false,
    error: null,
  };
}