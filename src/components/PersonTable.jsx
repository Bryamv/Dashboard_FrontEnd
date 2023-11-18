import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { Link } from "react-router-dom"; // Paso 1: Importar Link desde react-router-dom
import "./table.css";
const PersonTable = ({ data, handleDelete }) => {
  console.log(data);
  const eliminarElemento = (id) => {
    handleDelete(id);
  };
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
        {data.map((person) => (
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
                <img
                  alt={person.foto.name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </td>
            <td style={{ width: "220px" }}>
              <Link
                to={`/edit/${person.numero_documento}`}
                className="btn btn-info me-5"
                style={{ color: "white" }}
              >
                Editar
              </Link>
              <Button
                variant="danger"
                onClick={() => eliminarElemento(person.numero_documento)}
              >
                Eliminar
              </Button>
              {/* Paso 4: Utilizar el componente Link para envolver el botón de "Editar" */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

PersonTable.propTypes = {
  data: PropTypes.array.isRequired,
};

PersonTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default PersonTable;
