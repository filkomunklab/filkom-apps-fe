import React from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import SearchIcon from "@mui/icons-material/Search";

const SearchLocal = ({ sx }) => {
  return (
    <div style={{ paddingBottom: "28px" }}>
      <Search sx={{ color: "gray", width: "300px" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </div>
  );
};

export default SearchLocal;
