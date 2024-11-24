import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const retriveProduct = async ({queryKey}) => {
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}/${queryKey[1]}`);
  return response.data;
};

export const ProductDetails = ({ id }) => {
  const { data: product,error,isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn:retriveProduct,
  });
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product Details</h2>
      <div className="flex flex-col items-center m-2 border rounded-sm">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    </div>
  );
};
