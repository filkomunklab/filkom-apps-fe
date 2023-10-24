import React from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import SearchIcon from "@mui/icons-material/Search";
import Div from "@jumbo/shared/Div";

const SearchLocal = ({ sx }) => {
  return (
    <Div sx={{ width: "100%" }}>
      <Search sx={{ color: "gray" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Div>
  );
};

export default SearchLocal;
