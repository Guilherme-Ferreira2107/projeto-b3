import { DataGrid } from "@mui/x-data-grid";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";

import { Table } from "./Table";
import { COLUMN_MOCK, ROWS_MOCK } from "@/__mocks__";

jest.mock("@mui/x-data-grid", () => ({
  DataGrid: jest.fn(() => <div data-testid="DataGrid" />),
}));

describe("Table Component", () => {
  const theme = createTheme();
  const columns = COLUMN_MOCK;
  const rows = ROWS_MOCK;

  const renderWithTheme = (component: JSX.Element) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it("should render the DataGrid component", () => {
    renderWithTheme(
      <Table
        columns={columns}
        rows={rows}
        loading={false}
        onRowClick={() => {}}
      />
    );
    expect(screen.getByTestId("DataGrid")).toBeInTheDocument();
  });

  it("should display correct number of rows", () => {
    renderWithTheme(
      <Table
        columns={columns}
        rows={rows}
        loading={false}
        onRowClick={() => {}}
      />
    );

    expect(DataGrid).toHaveBeenCalledWith(
      expect.objectContaining({ rows: rows }),
      expect.anything()
    );
  });

  it("should show loading state when loading is true", () => {
    renderWithTheme(
      <Table
        columns={columns}
        rows={rows}
        loading={true}
        onRowClick={() => {}}
      />
    );

    expect(DataGrid).toHaveBeenCalledWith(
      expect.objectContaining({ loading: true }),
      expect.anything()
    );
  });

  it("should apply responsive styles to columns", () => {
    renderWithTheme(
      <Table
        columns={columns}
        rows={rows}
        loading={false}
        onRowClick={() => {}}
      />
    );

    const expectedColumns = columns.map((col) => ({
      ...col,
      flex: 1,
      minWidth: 240,
      sortable: true,
    }));

    expect(DataGrid).toHaveBeenCalledWith(
      expect.objectContaining({ columns: expectedColumns }),
      expect.anything()
    );
  });
});
