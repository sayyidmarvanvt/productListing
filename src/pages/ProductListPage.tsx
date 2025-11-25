import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Data {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
}

function ProductListPage() {
  const [data, setData] = useState<Data[]>([]);
  const [searchField, setSearchField] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("low to high");

  const navigate = useNavigate();

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value.toLowerCase());
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => setData(products));
  }, []);

  const filteredData = useMemo(() => {
    return [...data]
      .sort((a, b) =>
        selectedOption === "high to low" ? b.price - a.price : a.price - b.price
      )
      .filter((item) =>
        item.title.toLowerCase().includes(searchField.toLowerCase())
      );
  }, [data, selectedOption, searchField]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <input type="search" placeholder="search" onChange={onSearchChange} />
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="low to high">Low to High</option>
        <option value="high to low">High to Low</option>
      </select>

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
    </>
  );
}

export default ProductListPage;
