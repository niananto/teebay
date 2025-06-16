// import {useQuery, gql} from '@apollo/client';

// export const GET_PRODUCTS = gql`
//   query Products($page: Int, $limit: Int) {
//     products(page: $page, limit: $limit) {
//       id
//       name
//       description
//       price
//       mode
//     }
//   }
// `;

const dummyProducts = [
  { id: '1', name: 'Product 1', description: 'Description 1', price: 10, mode: 'buy' },
  { id: '2', name: 'Product 2', description: 'Description 2', price: 20, mode: 'sell' },
  { id: '3', name: 'Product 3', description: 'Description 3', price: 30, mode: 'buy' },
  { id: '4', name: 'Product 4', description: 'Description 4', price: 40, mode: 'sell' },
  { id: '5', name: 'Product 5', description: 'Description 5', price: 50, mode: 'buy' },
  { id: '6', name: 'Product 6', description: 'Description 6', price: 60, mode: 'sell' },
  { id: '7', name: 'Product 7', description: 'Description 7', price: 70, mode: 'buy' },
  { id: '8', name: 'Product 8', description: 'Description 8', price: 80, mode: 'sell' },
  { id: '9', name: 'Product 9', description: 'Description 9', price: 90, mode: 'buy' },
  { id: '10', name: 'Product 10', description: 'Description 10', price: 100, mode: 'sell' },
  { id: '11', name: 'Product 11', description: 'Description 11', price: 110, mode: 'buy' },
  { id: '12', name: 'Product 12', description: 'Description 12', price: 120, mode: 'sell' },
];

export const useProductList = ({ page = 1, limit = 5 }) => {
  // const { data, loading, error } = useQuery(GET_PRODUCTS, {
  //     variables: { page, limit },
  // });
  // return {
  //     products: data?.products || [],
  //     loading,
  //     error,
  // };

  return {
    products:
      dummyProducts.slice((page - 1) * limit, page * limit),
    loading: false,
    error: null,
  };
}