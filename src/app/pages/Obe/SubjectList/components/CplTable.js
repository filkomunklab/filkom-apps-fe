import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const CplTable = () => {
  return (
    <div className="mb-3 w-[600px]">
      <TableContainer>
        <Table>
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>Warna</TableCell>
              <TableCell>Variabel</TableCell>
              <TableCell>Keterangan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="w-6 h-6 bg-blue-300 rounded-full" />
              </TableCell>
              <TableCell>S</TableCell>
              <TableCell>SIKAP</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="w-6 h-6 bg-red-300 rounded-full" />
              </TableCell>
              <TableCell>P</TableCell>
              <TableCell>PENGETAHUAN</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="w-6 h-6 bg-green-300 rounded-full" />
              </TableCell>
              <TableCell>KU</TableCell>
              <TableCell>KETERAMPILAN UMUM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="w-6 h-6 bg-yellow-300 rounded-full" />
              </TableCell>
              <TableCell>KK</TableCell>
              <TableCell>KETERAMPILAN KHUSUS</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CplTable;
