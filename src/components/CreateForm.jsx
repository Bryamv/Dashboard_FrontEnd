import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./style.css";
function CreateForm() {
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
    let size = Object.keys(data).length;
    console.log(`tamaño: ${size}`);
    Swal.fire({
      title: "Datos enviados!",
      text: "Tus datos han sido enviados exitosamente",
      icon: "success",
      confirmButtonText: "Ok",
    });
    setImage(null);
    reset();
  };

  //controlar la imagen que se sube
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];

      // Validar el tamaño del archivo (no debe superar los 2 MB)
      if (img.size > 2 * 1024 * 1024) {
        setError("photo", {
          type: "manual",
          message: "El archivo no debe superar los 2 MB",
        });
        e.target.value = null;
        setImage(null);
        return;
      }

      // Validar que el archivo sea de tipo imagen
      if (!img.type.startsWith("image/")) {
        setError("photo", {
          type: "manual",
          message: "El archivo debe ser una imagen",
        });
        e.target.value = null;
        setImage(null);
        return;
      }

      clearErrors("photo");
      setImage(URL.createObjectURL(img));
      setValue("photo", img);
    }
  };

  //fin de controlar la imagen que se sube
  useEffect(() => {
    register("photo");
  }, [register]);
  return (
    <Container>
      <div className="text-center">
        <h1>Registrar Persona</h1>
      </div>
      <Row className="justify-content-between form">
        <Col md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formDocumentType">
              <Form.Label>Tipo de documento</Form.Label>
              <Form.Control as="select" {...register("documentType")}>
                <option>Tarjeta de identidad</option>
                <option>Cédula</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDocumentNumber">
              <Form.Label>Nro. Documento</Form.Label>
              <Form.Control
                type="text"
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
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.firstName}
                    {...register("firstName", {
                      required: "Este campo es obligatorio",
                      maxLength: {
                        value: 30,
                        message: "No debe ser mayor de 30 caracteres",
                      },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "No debe ser un número",
                      },
                    })}
                  />
                  {errors.firstName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formSecondName">
                  <Form.Label>Segundo Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    isInvalid={!!errors.secondName}
                    {...register("secondName", {
                      required: "Este campo es obligatorio",
                      maxLength: {
                        value: 30,
                        message: "No debe ser mayor de 30 caracteres",
                      },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "No debe ser un número",
                      },
                    })}
                  />
                  {errors.secondName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.secondName.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formLastName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                isInvalid={!!errors.lastName}
                {...register("lastName", {
                  required: "Este campo es obligatorio",
                  maxLength: {
                    value: 60,
                    message: "No debe ser mayor de 60 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "No debe ser un número",
                  },
                })}
              />
              {errors.lastName && (
                <Form.Control.Feedback type="invalid">
                  {errors.lastName.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formBirthDate">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                isInvalid={!!errors.birthDate}
                {...register("birthDate", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.birthDate && (
                <Form.Control.Feedback type="invalid">
                  {errors.birthDate.message}
                </Form.Control.Feedback>
              )}
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
              <Form.Control
                type="email"
                isInvalid={!!errors.email}
                {...register("email", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Formato de correo electrónico inválido",
                  },
                })}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                type="tel"
                isInvalid={!!errors.phone}
                {...register("phone", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message:
                      "Debe ser un número y tener exactamente 10 caracteres",
                  },
                })}
              />
              {errors.phone && (
                <Form.Control.Feedback type="invalid">
                  {errors.phone.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="formPhoto">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                isInvalid={!!errors.photo}
                required
              />
              {errors.photo && (
                <Form.Control.Feedback type="invalid">
                  {errors.photo.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {/* Aquí va el botón de envío */}
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Registrar
            </Button>
          </Form>
        </Col>

        {/* Aquí va la previsualización de la imagen */}
        {image && (
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            {
              <div className="text-center">
                <img
                  src={image}
                  alt="Preview"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "5px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                    objectFit: "cover",
                  }}
                />
                <p className="mt-2 preview-text">
                  Previsualización de la imagen
                </p>
              </div>
              /* Se han añadido estilos para que la previsualización de la imagen tenga bordes redondeados y una sombra */
            }
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default CreateForm;
