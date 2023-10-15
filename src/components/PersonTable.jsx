import Table from "react-bootstrap/Table";
import { Button, Row, Col } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import "./table.css";
const PersonTable = () => {
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
        <tr>
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
            <Row>
              <Col md={6} className="w-100">
                <Button variant="info">
                  <FaEdit style={{ color: "white", fontSize: "20px" }} />
                </Button>
              </Col>
              <Col md={6} className="w-100">
                <Button variant="danger">
                  <FaTrash style={{ color: "white", fontSize: "20px" }} />
                </Button>
              </Col>
            </Row>
          </td>
        </tr>
        <tr>
          <td>TI</td>
          <td>987654321</td>
          <td>Jane</td>
          <td>Marie</td>
          <td>Johnson</td>
          <td>05/12/1985</td>
          <td>Femenino</td>
          <td>jane.johnson@example.com</td>
          <td>0987654321</td>
          <td>foto2.jpg</td>
          <td>
            <Row>
              <Col md={6}>
                <Button variant="info">
                  <FaEdit style={{ color: "white", fontSize: "20px" }} />
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="danger">
                  <FaTrash style={{ color: "white", fontSize: "20px" }} />
                </Button>
              </Col>
            </Row>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PersonTable;
