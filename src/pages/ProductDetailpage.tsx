import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Data } from "./ProductListPage";

const ProductDetailpage = () => {
  const [product, setProduct] = useState<Data | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetailpage;
