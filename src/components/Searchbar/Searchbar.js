import PropTypes from "prop-types";
import { useState } from "react";
import {
  Form,
  Bar,
  SearchBtn,
  SerchBtnLabel,
  SearchInput,
} from "./Searchbar.styled";

const Searchbar = ({ sendInputValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchInput = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendInputValue(inputValue);
  };

  return (
    <Form>
      <Bar onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <SerchBtnLabel />
        </SearchBtn>

        <SearchInput
          type="text"
          value={inputValue}
          onChange={handleSearchInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Bar>
    </Form>
  );
};

Searchbar.propTypes = { sendInputValue: PropTypes.func.isRequired };

export default Searchbar;
