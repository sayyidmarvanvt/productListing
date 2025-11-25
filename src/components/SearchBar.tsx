import { type ChangeEvent } from "react";

interface SearchBarProps {
  handleOptionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedOption: string;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({
  handleOptionChange,
  onSearchChange,
  selectedOption,
}) => {
  return (
    <>
      <input type="search" placeholder="search" onChange={onSearchChange} />
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="low to high">Low to High</option>
        <option value="high to low">High to Low</option>
      </select>
    </>
  );
};

export default SearchBarComponent;
