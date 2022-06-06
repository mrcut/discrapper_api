import notfound from "../assets/notfound.png";

const NotFound = () => {
  return (
    <img
      src={notfound}
      alt="404-not-found"
      style={{ width: "30%", margin: "80px 0 0 35%" }}
    />
  );
};

export default NotFound;
