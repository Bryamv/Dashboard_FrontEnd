import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

//import { FaTrash, FaEdit } from "react-icons/fa"; eliminar si es necesario
import "./table.css";
const PersonTable = ({ data }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí  se hará el llamado a la api de eliminar
        console.log("Eliminando registro con id: ", id);
        Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
      }
    });
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
            <td>{person.tipo_documento_id}</td>
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
                  //src={URL.createObjectURL(person.foto)}
                  alt={person.foto.name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </td>
            <td style={{ width: "500px" }}>
              <Button
                variant="info"
                style={{ color: "white" }}
                className="me-5"
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(person.numero_documento)}
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
        {/* <tr>
            <td>CC</td>
            <td>123456789</td>
            <td>John</td>
            <td>Doe</td>
            <td>Smith</td>
            <td>01/01/1990</td>
            <td>Masculino</td>
            <td>john.smith@example.com</td>
            <td>1234567890</td>
            <td>foto.jpg</td>
            <td style={{ width: "500px" }}>
              <Button variant="info" style={{ color: "white" }} className="me-5">
                Editar
              </Button>
              <Button variant="danger">Eliminar</Button>
            </td>
          </tr> */}
      </tbody>
    </Table>
  );
};

PersonTable.propTypes = {
  data: PropTypes.array.isRequired,
};
export default PersonTable;
