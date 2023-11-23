import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

import "./table.css";
const LogTable = ({ data }) => {
  const getRowClass = (tipo) => {
    switch (tipo) {
      case "CREATE":
        return "table-success";
      case "UPDATE":
        return "table-info";
      case "DELETE":
        return "table-danger";
      case "READ":
        return "table-warning"; // He escogido el color amarillo para 'READ'
      default:
        return "";
    }
  };
  console.log(data);
  return (
    <Table>
      <thead>
        <tr>
          <th>Tipo De Transaccion</th>
          <th>Tipo De Documento</th>
          <th>No. Documento</th>
          <th>Fecha de Transaccion</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        {data.map((log) => (
          <tr key={log._id} className={getRowClass(log.tipo)}>
            <td>{log.tipo}</td>
            <td>{log.tipo_documento}</td>
            <td>{log.numero_documento}</td>
            <td>{log.fecha}</td>
            <td>{log.descripcion}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

LogTable.propTypes = {
  data: PropTypes.array.isRequired,
};

LogTable.propTypes = {
  data: PropTypes.array.isRequired,
};
export default LogTable;
