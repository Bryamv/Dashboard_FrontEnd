import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import ModalImage from "react-modal-image";

import "./table.css";
const LogTable = ({ data }) => {
  console.log(data);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Tipo De Documento</th>
          <th>No. Documento</th>
          <th>Primer Nombre</th>
          <th>Segundo Nombre</th>
          <th>Apellidos</th>
          <th>Fecha de Nacimiento</th>
          <th>Genero</th>
          <th>Correo</th>
          <th>Celular</th>
          <th>Foto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          (person) => (
            console.log(person),
            (
              <tr key={person.numero_documento}>
                <td>{person.tipo_documento}</td>
                <td>{person.numero_documento}</td>
                <td>{person.primer_nombre}</td>
                <td>{person.segundo_nombre}</td>
                <td>{person.apellidos}</td>
                <td>{person.fecha_nacimiento}</td>
                <td>{person.genero_id}</td>
                <td>{person.correo_electronico}</td>
                <td>{person.celular}</td>
                <td style={{ maxWidth: "100px" }}>
                  {person.foto && (
                    <ModalImage
                      small={`data:image/png;base64,${person.foto.$binary.base64}`}
                      large={`data:image/png;base64,${person.foto.$binary.base64}`}
                      alt={person.foto.name}
                    />
                  )}
                </td>
              </tr>
            )
          )
        )}
      </tbody>
    </Table>
  );
};

LogTable.propTypes = {
  data: PropTypes.array.isRequired,
};

LogTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default LogTable;
