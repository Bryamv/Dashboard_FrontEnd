import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

import "./table.css";
const LogTable = ({ data }) => {
  console.log(data);
  return (
    <Table striped>
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
        {data.map((person) => (
          <tr key={person.numero_documento}>
            <td>{person.tipo}</td>
            <td>{person.tipo_documento}</td>
            <td>{person.numero_documento}</td>
            <td>{person.fecha}</td>
            <td>{person.descripcion}</td>
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
