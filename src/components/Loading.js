import loading from "../assets/preloader.gif";

const Loading = () => {
  return (
    <div className="section section-center">
      <div className="loading">
        <img src={loading} alt="loading" />
      </div>
    </div>
  );
};

export default Loading;
