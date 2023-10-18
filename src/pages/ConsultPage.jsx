import { useEffect, useState } from "react";

import PersonTable from "../components/PersonTable";
import { Container, Row, Col } from "react-bootstrap";
import { Spinner, Pagination } from "react-bootstrap";

import getPeople from "../api/getPeople.js";

const ConsultPage = () => {
  const [people, setPeople] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const elementosPorPagina = 5;

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await getPeople();
      setPeople(response);
    };

    fetchPeople();
  }, []);

  if (!people) {
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
  // Calcular los elementos que se deben mostrar en la página actual
  const indexOfLastElement = currentPage * elementosPorPagina;
  const indexOfFirstElement = indexOfLastElement - elementosPorPagina;
  const currentElements = people.slice(indexOfFirstElement, indexOfLastElement);

  // Crear los items de paginación
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(people.length / elementosPorPagina); i++) {
    if (
      i === currentPage ||
      i === currentPage - 1 ||
      i === currentPage + 1 ||
      i === 1 ||
      i === Math.ceil(people.length / elementosPorPagina)
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
              onClick={() =>
                setCurrentPage(
                  currentPage < Math.ceil(people.length / elementosPorPagina)
                    ? currentPage + 1
                    : currentPage
                )
              }
              disabled={
                currentPage === Math.ceil(people.length / elementosPorPagina)
              }
            />
            <Pagination.Last
              onClick={() =>
                setCurrentPage(Math.ceil(people.length / elementosPorPagina))
              }
              disabled={
                currentPage === Math.ceil(people.length / elementosPorPagina)
              }
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultPage;
