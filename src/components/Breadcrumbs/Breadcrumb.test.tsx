import React from "react";
import { render, screen } from "@testing-library/react";
import { ITEMS_MOCK } from "__mocks__/breadcrumb.mocks";

import Breadcrumb from "./Breadcrumbs";

describe("Breadcrumb", () => {
  it("renders Breadcrumb with correct items", () => {
    render(<Breadcrumb items={ITEMS_MOCK} />);

    ITEMS_MOCK.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("renders correct links for each item", () => {
    render(<Breadcrumb items={ITEMS_MOCK} />);

    ITEMS_MOCK.forEach((item) => {
      const linkElement = screen.getByText(item.label);
      expect(linkElement.closest("a")).toHaveAttribute("href", item.link);
    });
  });
});
