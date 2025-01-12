import topImage from "../images/Homepage-top.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="font-serif ">
      <div className="bg-white text-center mb-6 pt-10 md:pt-0 md:flex">
        <div className="px-6 md:mb-0 md:content-center md:pl-12">
          <h1 className="text-4xl font-bold ">Discover Japan’s Hidden Gems</h1>
          {/* <p className="text-lg text-gray-700 mt-4">sub title</p> */}
          <button
            // onClick={handleScrollToSearch}
            className="mt-6 bg-[#d87607] py-2 px-6 md:py-3 md:px-8 rounded-lg hover:bg-[#bc560a] transition"
          >
            Discover now
          </button>
        </div>
        <img
          src={topImage}
          alt="Cute pets"
          className="mt-8 md:my-0 my-2 mx-auto w-screen h-auto sm:h-96 md:h-[33rem] 2xl:h-[38rem] md:w-3/4 2xl:w-4/5 md:rounded-bl-full object-cover"
        />
      </div>
    </div>
  );
};

export default HomePage;
