import { IRows } from "@/components/Table/interfaces";
import { GridColDef } from "@mui/x-data-grid";
import { ICurrencyData } from "@/interfaces";
import { v4 } from "uuid";

export const column: GridColDef[] = [
  {
    field: "currency",
    headerName: "Moeda",
    description: "Par de moeda",
    flex: 1,
    sortable: true,
  },
  {
    field: "value",
    headerName: "Valor (em EUR)",
    description: "Valor convertido em reais.",
    flex: 1,
    sortable: true,
  },
  {
    field: "date",
    headerName: "Horário",
    description: "Horário de cotação atual.",
    flex: 1,
    sortable: true,
  },
];

export const transformFixerResponseToRows = (
  response: ICurrencyData
): IRows[] => {
  const { rates, date } = response;

  const rows = Object.entries(rates).map(([currency, value]) => ({
    id: v4(),
    currency,
    value: value.toFixed(2).replace(".", ","),
    date: `${date} às ${new Date(response.timestamp * 1000).toLocaleTimeString("pt-BR")}`,
  }));

  return rows;
};
