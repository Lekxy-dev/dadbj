import Container from "@/app/Component/Container";

import ProductDetails from "../ProductDetails";

import ListRating from "./ListRating";
import { products } from "@/Utils/Products";



interface IParams {
    productid?: string;
  }
  
  const product = ({ params }: { params: IParams }) => {
    console.log("params", params);

  const product = products.find((item) => item.id === params.productid);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails produc={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add Rating</div>
          <ListRating produc={product} />
        </div>
      </Container>
    </div>
  );
}
 
export default product;



/* import Container from "@/app/Component/Container";
import ProductDetails from "../ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/Utils/Products";

interface IParams {
  productId?: string;
}

const ProductPage = ({ params }: { params: IParams }) => {
  console.log("params", params);

  // Find the product using the productId from params
  const product = products.find((item) => item.id === params.productId);

  // Proceed with rendering only if product exists
  if (product) {
    return (
      <div className="p-8">
        <Container>
          <ProductDetails product={product} />
          <div className="flex flex-col mt-20 gap-4">
            <div>Add Rating</div>
            <ListRating product={product} />
          </div>
        </Container>
      </div>
    );
  }

  // Do nothing (no fallback UI or error message shown)
  return null;
};

export default ProductPage;
 */