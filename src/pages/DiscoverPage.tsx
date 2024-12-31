import Recommendations from "../components/Recommendations";

const DiscoverPage: React.FC = () => {
  return (
    <>
      <div className=" h-36  p-6 flex items-center justify-center">
        <p className="font-bold text-5xl my-5 ">
          What kind of trip are you looking for?
        </p>
      </div>
      <Recommendations></Recommendations>
    </>
  );
};

export default DiscoverPage;
