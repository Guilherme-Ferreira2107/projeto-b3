import { GridColDef, GridRowParams } from "@mui/x-data-grid";

export interface ITableProps {
  columns: GridColDef[];
  rows: IRows[];
  loading: boolean;
  onRowClick: (params: GridRowParams) => void;
}

export interface IRows {
  id: string;
  currency: string;
  value: string;
  date: string;
}
