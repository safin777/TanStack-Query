import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const retriveProducts = async ({ queryKey}) => {
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
  return response.data;
};
export const ProductList = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retriveProducts,
    // staleTime: 5000,
    //refetchInterval: 5000 or false or true
    //refetchInterval: ({ pageParam }) => (pageParam ? 5000 : false),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex flex-col items-center m-2 border rounded-sm"
          >
            <img
              className="object-cover h-64 w-96 rounded-sm"
              src={product.image}
              alt={product.name}
            />
            <p className="text-xl my-3">{product.name}</p>
          </li>
        ))}
      </ul>
      {/* <div className='flex'>
          {
            products.prev && (
              <button
                className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
                onClick={() => setPage(products.prev)} > Prev </button>
            )
          }
          {
            products.next && (
              <button
                className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
                onClick={() => setPage(products.next)} > Next </button>
            )
          }

        </div> */}
    </div>
  );
};
