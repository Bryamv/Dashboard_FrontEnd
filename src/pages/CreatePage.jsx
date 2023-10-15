import CreateForm from "../components/CreateForm";
import { Container, Row, Col } from "react-bootstrap";
const CreatePage = () => {
  return (
    <>
      <Container className="mt-5 ">
        <Row>
          <Col className="col-12 mx-auto">
            <CreateForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreatePage;
