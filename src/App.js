'use-strict'
// directory files
import Main from './Components/Main/Main';




// external components
import React from 'react';
// import React, { createContext } from "react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { login, logout } from './Redux/Reducer/User/userReducer';
import { ConfigureStore } from './Redux/configureStore';



// extra comp

const store = ConfigureStore();
// export const authContext = createContext();
// export const jobsContext = createContext();
// export const studentContext = createContext();

// function useAuth() {
// 	return useContext(authContext);
// }

// function useProvideAuth() {
//   // let history = useHistory();
//   const dispatch = useDispatch();

//   const user = useSelector(state => state.user);

//   const signin = (tokenId, history) => {
//     dispatch(login(tokenId, history));
//   };

//   const signout = () => {
//     dispatch(logout());
//   };

//   return {
//     user,
//     signin,
//     signout,
//   };
// }

// function ProvideAuth({ children }) {
//   // const jobs = useSelector((state) => state.jobs);
//   // const students = useSelector((state) => state.students);
//   const jobs = "jobs";
//   const students = "students"
//   const auth = useProvideAuth();
//   return (
//     <authContext.Provider value={auth}>
//       <jobsContext.Provider value={jobs}>
//         <studentContext.Provider value={students}>{children}</studentContext.Provider>
//       </jobsContext.Provider>
//     </authContext.Provider>
//   );
// }



// main functional component

function App() {
  return (

    <Provider store={store}>
      {/* <ProvideAuth> */}
      <BrowserRouter>
        <Main />
      </BrowserRouter>
      {/* </ProvideAuth> */}
    </Provider>
  );
}

export default App;
