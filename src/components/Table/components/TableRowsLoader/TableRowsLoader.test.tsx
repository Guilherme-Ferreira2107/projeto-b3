import { render, screen } from "@testing-library/react";
import { TableRowsLoader } from "./TableRowsLoader";

describe("TableRowsLoader Component", () => {
  it("should render 5 table rows", () => {
    render(<TableRowsLoader />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(5);
  });

  it("should render 3 table cells per row", () => {
    render(<TableRowsLoader />);

    const rows = screen.getAllByRole("row");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("th");
      expect(cells).toHaveLength(3);
    });
  });
});
