import NavBar from "../components/Navbar";

const ErrorPage = () => {
  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium">Page not found</h2>
      </main>
    </>
  );
};

export default ErrorPage;