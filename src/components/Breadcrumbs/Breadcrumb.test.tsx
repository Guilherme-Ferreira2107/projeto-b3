import React from "react";
import { render, waitFor } from "@testing-library/react";
import Breadcrumb from "./Breadcrumbs";
// import { IItems } from "./interfaces";

const items = [
  { label: "Home", link: "/" },
  { label: "Products", link: "/products" },
  { label: "Shoes", link: "/products/shoes" },
];

describe("Breadcrumb", () => {
  it("renders Breadcrumb with correct items", async () => {
    const { container, debug } = render(<Breadcrumb items={items} />);

    debug();

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });
});
