import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

function CreateForm() {
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  return (
    <Container>
      <Row className="justify-content-between">
        <Col md={8}>
          <Form>
            <Form.Group controlId="formDocumentType">
              <Form.Label>Tipo de documento</Form.Label>
              <Form.Control as="select">
                <option>Tarjeta de identidad</option>
                <option>Cédula</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDocumentNumber">
              <Form.Label>Nro. Documento</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>Primer Nombre</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formSecondName">
              <Form.Label>Segundo Nombre</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formBirthDate">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Género</Form.Label>
              <Form.Control as="select">
                <option>Masculino</option>
                <option>Femenino</option>
                <option>No binario</option>
                <option>Prefiero no reportar</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Celular</Form.Label>
              <Form.Control type="tel" />
            </Form.Group>
            <Form.Group controlId="formPhoto">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            {/* Aquí va el botón de envío */}
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>

        {/* Aquí va la previsualización de la imagen */}
        {image && (
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            {/* Se han añadido estilos para que la previsualización de la imagen tenga bordes redondeados y una sombra */}
            <img
              src={image}
              alt="preview"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                objectFit: "cover",
              }}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default CreateForm;
