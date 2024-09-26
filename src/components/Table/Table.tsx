import * as React from "react";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";

import { ITableProps } from "./interfaces";
import styles from "./Table.module.css";

const Table = ({ columns, rows, loading, onRowClick }: ITableProps) => {
  const theme = useTheme();
  const paginationModel = { page: 0, pageSize: 5 };

  const responsiveColumns = columns.map((column) => ({
    ...column,
    flex: 1,
    minWidth: 240,
    sortable: true,
  }));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className={styles.tableContainer}>
        <DataGrid
          rows={rows}
          columns={responsiveColumns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          autoHeight
          loading={loading}
          onRowClick={onRowClick}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${theme.palette.grey[400]}`,
            },
            "& > .MuiDataGrid-root": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </Paper>
  );
};

export { Table };
