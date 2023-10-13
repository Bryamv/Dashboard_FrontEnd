import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
function CreateForm() {
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  //controlar la imagen que se sube
  const handleImageChange = (e) => {
    console.log("se escogio imagen");
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
      setValue("photo", e.target.files[0]);
    }
  };
  //fin de controlar la imagen que se sube
  useEffect(() => {
    register("photo");
  }, [register]);
  return (
    <Container>
      <Row className="justify-content-between">
        <Col md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formDocumentType">
              <Form.Label>Tipo de documento</Form.Label>
              <Form.Control
                as="select"
                {...register("documentType", {
                  required: "Este campo es obligatorio",
                })}
                isInvalid={!!errors.documentType}
              >
                <option>Tarjeta de identidad</option>
                <option>Cédula</option>
              </Form.Control>
              {errors.document && (
                <Form.Control.Feedback type="invalid">
                  {errors.document.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formDocumentNumber">
              <Form.Label>Nro. Documento</Form.Label>
              <Form.Control
                type="text"
                isValid={!errors.document}
                isInvalid={!!errors.document}
                {...register("document", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[0-9]{1,10}$/,
                    message: "Debe ser un número y no mayor de 10 caracteres",
                  },
                })}
              />
              {errors.document && (
                <Form.Control.Feedback type="invalid">
                  {errors.document.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Label>Primer Nombre</Form.Label>
                  <Form.Control type="text" {...register("firstName")} />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formSecondName">
                  <Form.Label>Segundo Nombre</Form.Label>
                  <Form.Control type="text" {...register("secondName")} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formLastName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" {...register("lastName")} />
            </Form.Group>

            <Form.Group controlId="formBirthDate">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" {...register("birthDate")} />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Género</Form.Label>
              <Form.Control as="select" {...register("gender")}>
                <option>Masculino</option>
                <option>Femenino</option>
                <option>No binario</option>
                <option>Prefiero no reportar</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" {...register("email")} />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Celular</Form.Label>
              <Form.Control type="tel" {...register("phone")} />
            </Form.Group>
            <Form.Group controlId="formPhoto">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}

                //verificar esto con el chatl
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
