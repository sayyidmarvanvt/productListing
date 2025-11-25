import { useNavigate } from "react-router-dom";
import type { Data } from "../pages/ProductListPage";




interface ProductCardProps {
  filteredData: Data[];
}

const ProductCard: React.FC<ProductCardProps> = ({ filteredData }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      {filteredData.map((item) => (
        <div className="card" key={item.id}>
          <img src={item.image} alt={item.title} className="card-img" />
          <p>{item.title}</p>
          <p>{item.price}</p>
          <button onClick={() => navigate(`/products/${item.id}`)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
