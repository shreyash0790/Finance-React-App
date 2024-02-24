import { Fragment, useContext} from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg"

import AuthContext from "../Context/AuthContext";


const Header = function () {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler=()=>{
    authCtx.logout();
  }


  return (
    <Fragment>
      <div className=" fixed w-full h-30 bg-orange-900 ">
        <div className="mx-auto flex w-full h-30 items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2">
            <span>
            <img
        src={logo}
        alt="Logo"
        className=" w-24 h-44  mr-7 rounded-md md:aspect-auto md:h-[70px] lg:h-[70px]"
      />
            </span>
            <span className=" font-protest-r subpixel-antialiased  text-white text-4xl px-5 font-extrabold shadow-xl shadow-black rounded-lg ">
              EzzyFinance
            </span>
            <div className="hidden grow items-start lg:flex">
              <ul className="ml-24 inline-flex space-x-11 mr-44">
                <li>
                  <NavLink
                    to={"/home"}
                    className={({ isActive }) =>
                      isActive
                        ? " font-protest-r text-xl font-bold  text-white hover:text-slate-900"
                        : " font-protest-r text-xl font-bold text-slate-900 hover:text-white "
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to={"/about"}
                    className={({ isActive }) =>
                      isActive
                        ? " font-protest-r text-xl font-bold text-white hover:text-slate-900 "
                        : " font-protest-r text-xl font-bold text-slate-900 hover:text-white "
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/store"}
                    className={({ isActive }) =>
                      isActive
                        ? " font-protest-r text-xl font-bold text-white hover:text-slate-900 "
                        : " font-protest-r text-xl font-bold text-slate-900 hover:text-white "
                    }
                  >
                    Expenses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/contactUs"}
                    className={({ isActive }) =>
                      isActive
                        ? " font-protest-r text-xl font-bold text-white hover:text-slate-900 "
                        : " font-protest-r text-xl font-bold text-slate-900 hover:text-white "
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className=" flex justify-around  ml-96 ">
          {isLoggedIn &&(<button
            type="button"
            className="  rounded-sm bg-slate-800 px-6 py-2 text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={logoutHandler}
          >
          <NavLink to={'/'}>Logout</NavLink> 
          </button>)}
          {isLoggedIn &&(<button
            type="button"
            className=" ml-5 px-6 py-2 text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
          <NavLink to={'/profile'}>Profile</NavLink> 
          </button>)}
          {!isLoggedIn &&(<button
            type="button"
            className="  rounded-lg bg-slate-800 px-6 py-2 text-lg font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
           <NavLink to={'/'}>Login</NavLink> 
          </button>)}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
