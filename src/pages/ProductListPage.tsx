import { useEffect, useState } from "react";
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
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("low to high");

  const navigate = useNavigate();

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLocaleLowerCase();
    setSearchField(searchString);
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products").then((response) =>
      response.json().then((users) => setData(users))
    );
  }, []);

  useEffect(() => {
    const filteredData = data
      .sort((a, b) => {
        if (selectedOption === "high to low") {
          return b.price - a.price;
        } else {
          return a.price - b.price;
        }
      })
      .filter((item) =>
        item.title.toLowerCase().includes(searchField.toLowerCase())
      );

    setFilteredData(filteredData);
  }, [data, selectedOption, searchField]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`);
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
            <button onClick={() => handleViewDetails(item.id)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductListPage;
