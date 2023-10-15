import PersonTable from "../components/PersonTable";
import { Container, Row, Col } from "react-bootstrap";

const ConsultPage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="col-12 mx-auto">
          <PersonTable />
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultPage;
