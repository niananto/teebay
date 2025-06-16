// import {useQuery, gql} from '@apollo/client';

// export const GET_PRODUCTS = gql`
//   query {
//     products {
//       id
//       name
//       description
//       price
//       mode
//     }
//   }
// `;

export const useProductList = () => {
    // const { data, loading, error } = useQuery(GET_PRODUCTS);
    // return {
    //     products: data?.products || [],
    //     loading,
    //     error,
    // };

    return {
        products: [
            { id: '1', name: 'Product 1', description: 'Description 1', price: 10, mode: 'buy' },
            { id: '2', name: 'Product 2', description: 'Description 2', price: 20, mode: 'sell' },
        ],
        loading: false,
        error: null,
    };
}