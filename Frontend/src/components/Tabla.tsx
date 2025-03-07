import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";

type StatusType = "active" | "paused" | "vacation";

type ChipColor = "success" | "danger" | "warning" | "default" | "primary" | "secondary" | undefined;

const statusColorMap: Record<StatusType, ChipColor> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

interface Column {
  uid: string;
  name: string;
}

interface Item {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: StatusType;
}

interface TablaProps {
  apiEndpoint: string;
  columns: Column[];
}

const Tabla: React.FC<TablaProps> = ({ apiEndpoint, columns }) => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data: Item[]) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiEndpoint]);

  const renderCell = (item: Item, columnKey: string) => {
    const cellValue = item[columnKey as keyof Item];

    switch (columnKey) {
      case "name":
        return (
          <User avatarProps={{ radius: "lg", src: item.avatar }} description={item.email} name={cellValue as string} />
        );
      case "status":
        return <Chip color={statusColorMap[item.status]}>{item.status}</Chip>;
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit">
              <span className="cursor-pointer text-blue-500">✏️</span>
            </Tooltip>
            <Tooltip content="Delete">
              <span className="cursor-pointer text-red-500">🗑️</span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid}>{column.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>{renderCell(item, column.uid)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Tabla;
