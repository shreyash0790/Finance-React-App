import { useContext, useRef, useState, useEffect } from "react";

import AuthContext from "../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const UserProfile = function () {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const enteredNameRef = useRef();

  const [isLoading, setLoading] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const [profileName, setName] = useState("");
  const [emailVerification, setVerification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          setName("");
         
        }

        setName(data.users[0].displayName);
        if(data.users[0].emailVerified===true){
        setVerification(true)
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileName,emailVerification]);

  const profileFormDisplay = () => {
    setDisplay(true);
  };

  const profileFormHandler = async (e) => {
    e.preventDefault();

    const enteredName = enteredNameRef.current.value;

    setLoading(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: enteredName,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setLoading(false);
        alert("Name Updated");
        navigate("/home");
        enteredNameRef.current.value = "";
      } else {
        const data = await response.json();
        let errMessage = "Authentication failed";

        if (data && data.error && data.error.message) {
          errMessage = data.error.message;
        }

        alert(errMessage);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

 const emailVerificationHandler =async ()=>{

    try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
          {
            method: "POST",
            body: JSON.stringify({
            requestType:"VERIFY_EMAIL",
              idToken: authCtx.token,
              
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
            
       
          alert("Verifaction Link Sent!");
        } else {
          const data = await response.json();
          let errMessage = "Verification failed";
  
          if (data && data.error && data.error.message) {
            errMessage = data.error.message;
          }
  
          alert(errMessage);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
 }


  
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-1 mb-44 ">
        <div className="flex items-center justify-center mt-44 mr-44 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
          <div className=" flex flex-col xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h1 className="  text-2xl font-bold leading-tight text-blue-950 sm:text-5xl">
              Hi, {profileName}
            </h1>

            <h1 className=" mt-3 text-xl font-bold leading-tight text-black sm:text-4xl">
              Welcome to EzzyFinance
            </h1>
            <br />
            <button
              className="text-sm   text-slate-900 sm:text-xl  hover:text-white"
              onClick={profileFormDisplay}
            >
              Update/Create Profile
            </button>
           {!emailVerification && (
            <button
              className="text-sm mt-1 font-semibold  text-indigo-950 sm:text-lg  hover:text-white"
              onClick={emailVerificationHandler}
            >
              Verify your email now!
            </button>
           )} 
            {isDisplay && (
              <form onSubmit={profileFormHandler} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        className="text-base font-medium text-gray-900"
                        htmlFor="name"
                      >
                        {" "}
                        Your Name{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Your Name"
                        ref={enteredNameRef}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      {!isLoading && <p>Confirm</p>}
                      {isLoading && <p>Loading...</p>}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
