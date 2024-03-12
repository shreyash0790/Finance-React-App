
import { useRef, useState,  } from "react";
import {  useNavigate} from "react-router-dom";


const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const ResetPassword= function (){



const navigate = useNavigate()


  const enteredEmailRef = useRef();


  const [isLoading, setLoading] = useState(false);

  const signUpFormHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = enteredEmailRef.current.value;
 

    setLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          method: "POST",
        
          body: JSON.stringify({
            email: enteredEmail,
            requestType:"PASSWORD_RESET"
           
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.ok){
        const data=await response.json();
        console.log(data)
      setLoading(false)

     navigate('/home');
      
      }
      else{
 
        const data = await response.json();
        let errMessage = "failed";
        
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

    return (
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2">           
            <div className="flex items-center justify-center mt-24 mr-44 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
               
                <form onSubmit={signUpFormHandler} className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        className="text-base font-medium text-gray-900"
                        htmlFor="email"
                      >
                        {" "}
                        Email address{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="Email"
                          ref={enteredEmailRef}
                        />
                      </div>
                    </div>
                   
                    <div>
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      >
                        {!isLoading && <p>Reset</p>}
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
                
              </div>
            </div>
          </div>
        </section>
      );
}

export default ResetPassword