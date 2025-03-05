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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const Tabla = ({
  apiUrl = null,
  initialData = [],
  columns,
  statusColorMap = {},
}) => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => (apiUrl ? fetchData(apiUrl) : initialData),
    enabled: !!apiUrl, // Solo ejecuta la consulta si hay una API definida
    initialData, // Usa datos estáticos si están disponibles
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar datos</p>;

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return <Chip className="capitalize" color={statusColorMap[cellValue] || "default"}>{cellValue}</Chip>;
      case "actions":
        return (
          <div className="flex space-x-2">
            <Tooltip content="Editar">
              <button className="text-blue-500 hover:text-blue-700">✏️</button>
            </Tooltip>
            <Tooltip content="Eliminar">
              <button className="text-red-500 hover:text-red-700">🗑️</button>
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
        {users.map((user) => (
          <TableRow key={user.id}>
            {columns.map((column) => (
              <TableCell key={column.uid}>{renderCell(user, column.uid)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Tabla;
