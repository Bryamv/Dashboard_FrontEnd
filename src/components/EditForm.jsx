import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
const EditForm = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({ mode: "onChange" });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/people/${id}`);
        const data = await response.json();
        setPerson(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  //controlar la imagen que se sube
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];

      // Validar el tamaño del archivo (no debe superar los 2 MB)
      if (img.size > 2 * 1024 * 1024) {
        setError("foto", {
          type: "manual",
          message: "El archivo no debe superar los 2 MB",
        });
        e.target.value = null;
        setImage(null);
        return;
      }

      // Validar que el archivo sea de tipo imagen
      if (!img.type.startsWith("image/")) {
        setError("foto", {
          type: "manual",
          message: "El archivo debe ser una imagen",
        });
        e.target.value = null;
        setImage(null);
        return;
      }

      clearErrors("foto");
      setImage(URL.createObjectURL(img));
      setValue("foto", img);
    }
  };
  return (
    <div>
      {person ? (
        <div>
          <h1>{id}</h1>
          <p>{person.age}</p>
          <p>{person.email}</p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};

export default EditForm;
