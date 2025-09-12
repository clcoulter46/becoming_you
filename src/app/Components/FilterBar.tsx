import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

export default function SearchBar(): any {
  const dropdownProps = []

    return (
      <Menu>
        <MenuHandler>
          <Button> Filter by Status </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>
      </Menu>
    );
  }