import { useEffect, useState } from "react";

import PersonTable from "../components/PersonTable";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Spinner, Pagination } from "react-bootstrap";
import { Form } from "react-bootstrap";
import getPeople from "../api/getPeople.js";

const ConsultPage = () => {
  const [people, setPeople] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const elementosPorPagina = 5;

  //codigo para filtrar los datos por documento
  const [filter, setFilter] = useState("");

  //fin de codigo para filtrar los datos por documento
  const fetchPeople = async () => {
    setLoading(true);
    try {
      const response = await getPeople();
      setPeople(response);
      //production
      //setPeople(response.usuarios);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPeople();
  }, []);

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
  const filteredPeople = people.filter((person) =>
    person.numero_documento.includes(filter)
  );
  // Calcular los elementos que se deben mostrar en la página actual
  const indexOfLastElement = currentPage * elementosPorPagina;
  const indexOfFirstElement = indexOfLastElement - elementosPorPagina;
  const currentElements = filteredPeople.slice(
    indexOfFirstElement,
    indexOfLastElement
  );

  // Crear los items de paginación
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredPeople.length / elementosPorPagina);
    i++
  ) {
    if (
      i === currentPage ||
      i === currentPage - 1 ||
      i === currentPage + 1 ||
      i === 1 ||
      i === Math.ceil(filteredPeople.length / elementosPorPagina)
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
              }}
            />
          </Form.Group>
        </Col>
        <Col className="col-12 mx-auto">
          <PersonTable data={currentElements} />
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
                console.log(filteredPeople.length);
                setCurrentPage(
                  currentPage <
                    Math.ceil(filteredPeople.length / elementosPorPagina)
                    ? currentPage + 1
                    : currentPage
                );
              }}
              disabled={
                currentPage ===
                Math.ceil(filteredPeople.length / elementosPorPagina)
              }
            />
            <Pagination.Last
              onClick={() =>
                setCurrentPage(
                  Math.ceil(filteredPeople.length / elementosPorPagina)
                )
              }
              disabled={
                currentPage ===
                Math.ceil(filteredPeople.length / elementosPorPagina)
              }
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultPage;
