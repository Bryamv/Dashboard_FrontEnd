import { useEffect, useState, useMemo } from "react";

import PersonTable from "../components/PersonTable";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Spinner, Pagination } from "react-bootstrap";
import { Form, Alert } from "react-bootstrap";
import getPeople from "../api/getPeople.js";
import Swal from "sweetalert2";
import axios from "axios";
const ConsultPage = () => {
  const [people, setPeople] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const elementosPorPagina = 5;

  //codigo para filtrar los datos por documento
  const [filter, setFilter] = useState("");

  //fin de codigo para filtrar los datos por documento
  const fetchPeople = async () => {
    setLoading(true);
    try {
      const response = await getPeople();
      //setPeople(response);
      //production
      setPeople(response.usuarios);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPeople();
    setReload(false);
  }, [reload]);

  //eliminar persona
  const handleDelete = (numero_documento) => {
    console.log(`documento a eliminar: ${numero_documento}`);
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar este registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            "http://localhost:5000/api/delete",
            {
              params: {
                numero_documento,
              },
            }
          );
          console.log(response.res);
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          setReload(true);
        } catch (error) {
          console.error("Error al eliminar el registro:", error);
          Swal.fire("Error", "No se pudo eliminar el registro.", "error");
        }
      }
    });
  };
  //fin de eliminar persona

  // Filtrar todos los elementos si el filtro no está vacío
  const elementsToShow = useMemo(() => {
    if (filter !== "") {
      return people.filter((person) =>
        person.numero_documento.includes(filter)
      );
    } else {
      return people;
    }
  }, [filter, people]);

  // Calcular los elementos que se deben mostrar en la página actual
  const currentElements = useMemo(() => {
    if (!elementsToShow) {
      return [];
    }
    const indexOfLastElement = currentPage * elementosPorPagina;
    const indexOfFirstElement = indexOfLastElement - elementosPorPagina;
    
    return elementsToShow.slice(indexOfFirstElement, indexOfLastElement);
  }, [elementsToShow, currentPage, elementosPorPagina]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "2em",
          color: "red",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "2em",
            color: "red",
          }}
        >
          <strong>Hubo un error al cargar los datos.</strong>

          <Button
            variant="info"
            type="button"
            className="mt-3"
            onClick={fetchPeople}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  // Crear los items de paginación
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(elementsToShow.length / elementosPorPagina);
    i++
  ) {
    if (
      i === currentPage ||
      i === currentPage - 1 ||
      i === currentPage + 1 ||
      i === 1 ||
      i === Math.ceil(elementsToShow.length / elementosPorPagina)
    ) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pageNumbers.push(<Pagination.Ellipsis key={pageNumbers.length + 1} />);
    }
  }

  return (
    <Container className="mt-5" fluid={true}>
      <Row className="mb-3">
        <Col className="col-12 mx-auto">
          <h1 className="text-center">Consultar Personas</h1>
        </Col>
      </Row>
      <Row>
        <Col className="col-4 my-3">
          <Form.Group controlId="formDocumentNumber">
            <Form.Label>Buscar Documento</Form.Label>
            <Form.Control
              type="text"
              value={filter}
              isInvalid={!isValid}
              onChange={(e) => {
                if (!/^[0-9]*$/.test(e.target.value)) {
                  setIsValid(false);
                } else {
                  setIsValid(true);
                }
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Form.Group>
        </Col>
        <Col className="col-12 mx-auto">
          <PersonTable data={currentElements} handleDelete={handleDelete} />
          {currentElements.length === 0 && (
            <Alert variant="info">No se encontraron resultados</Alert>
          )}
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
              }
              disabled={currentPage === 1}
            />
            {pageNumbers}
            <Pagination.Next
              onClick={() => {
                console.log(elementsToShow.length);
                setCurrentPage(
                  currentPage <
                    Math.ceil(elementsToShow.length / elementosPorPagina)
                    ? currentPage + 1
                    : currentPage
                );
              }}
              disabled={
                currentPage ===
                Math.ceil(elementsToShow.length / elementosPorPagina)
              }
            />
            <Pagination.Last
              onClick={() =>
                setCurrentPage(
                  Math.ceil(elementsToShow.length / elementosPorPagina)
                )
              }
              disabled={
                currentPage ===
                Math.ceil(elementsToShow.length / elementosPorPagina)
              }
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultPage;
