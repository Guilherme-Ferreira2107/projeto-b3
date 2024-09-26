import { Skeleton, TableCell, TableRow } from "@mui/material";

const TableRowsLoader = () => {
  return [...Array(5)].map((row, index) => (
    <TableRow key={index}>
      {[...Array(3)].map((subRow, subIndex) => (
        <TableCell
          key={subIndex}
          component="th"
          scope="row"
          style={{ flex: 1, minWidth: 200, width: "100%" }}
        >
          <Skeleton
            animation="wave"
            variant="text"
            style={{ flex: 1, minWidth: 200, width: "100%" }}
          />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export { TableRowsLoader };
