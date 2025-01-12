import topImage from "../images/Homepage-top.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="font-serif mb-11">
      <div className="bg-white text-center mb-6 pt-10 md:pt-0 md:flex">
        <div className="px-6 md:mb-0 md:content-center md:pl-12">
          <h1 className="text-5xl font-bold m-8">
            Discover Japan’s Hidden Gems
          </h1>
        </div>
        <div className="h-64  overflow-hidden">
          <img
            src={topImage}
            alt="Cute pets"
            style={{
              width: "100%",
              height: "650px",
              margin: "auto",
              marginBottom: "100px",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
