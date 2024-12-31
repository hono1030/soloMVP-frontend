const HomePage: React.FC = () => {
  //   const [activePrefecture, setActivePrefecture] = useState<string>("");
  //   const [user, setUser] = useState<User | null>(null);

  //   const handleLogout = async () => {
  //     if (user) {
  //       try {
  //         await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
  //         setUser(null);
  //       } catch (error) {
  //         console.error("Error during logout:", error);
  //       }
  //     }
  //   };

  //   const checkLogedIn = async () => {
  //     const response = await axios.get(`${apiUrl}/sessions`, {
  //       withCredentials: true,
  //     });
  //     if (response.status === 200) {
  //       setUser({
  //         userid: response.data.userid,
  //         username: response.data.username,
  //       });
  //     } else {
  //       console.error("User Not Logged In");
  //     }
  //   };

  //   useEffect(() => {
  //     checkLogedIn();
  //   }, []);

  return (
    <div className="font-serif ">
      {/* {
          !user ? (
            <div className=" h-28  p-6 bg-black">
              <h1 className="font-bold text-white text-4xl mb-4 content-center">
                Discover Japan
              </h1>
              <Login setUser={setUser} />
            </div>
          ) :

        activePrefecture === "" ? (
          <div className="font-sans bg-sand-200">
            <div>
              <div className=""> */}
      {/* <div className="fixed top-0 left-0 sm:flex sm:justify-between bg-black w-full h-14 z-[102]">
                <nav className="flex items-center justify-between h-12 p-4 sm:px-6 lg:px-8 gap-4 w-full">
                  <h1 className="font-bold text-white text-2xl">
                    Discover Japan
                  </h1>
                  <Logout handleLogout={handleLogout} />
                </nav>
              </div> */}

      {/* <div className="sm:flex">
                  <div className="w-full">
                    <div className="w-full h-36  p-6 flex items-center justify-center">
                      <p className="font-bold text-5xl text-center">
                        Click a prefecture to see pictures
                      </p>
                    </div>
                    <JapanMap
                      setActivePrefecture={setActivePrefecture}
                    ></JapanMap>
                  </div>
                </div> */}
      {/* </div>
            </div>
          </div>
        ) : (
          <div className="font-sans bg-sand-200">
            <ImageView
              prefcode={activePrefecture}
              userid={user.userid}
              prefectureCode={activePrefecture}
              setActivePrefecture={setActivePrefecture}
            ></ImageView>
          </div>
        )
      } */}
    </div>
  );
};

export default HomePage;
