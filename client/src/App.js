import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserHistory } from "history";
import Home from './Pages/Home';
import Landing from './Pages/Landing'
import Login from './Pages/Login'
import Register from './Pages/Register'
import MyProfile from "./Pages/MyProfile";
import EditProfile from "./Pages/EditProfile";
import AddGames from "./Pages/AddGames";

const theme= createTheme({
  palette:{
    primary:{
      main: "#06113C"
    },
    secondary:{
      main: "#FF8C32"
    },
    background:{
      main: "#EEEEEE"
    }
  }
})

const browserHistory = createBrowserHistory();

function App() {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter browserHistory = {browserHistory}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/register" element={<Register /> } />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/addgame" element={<AddGames />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

// import Settings from "@mui/icons-material/Settings";
// import { IconButton } from "@mui/material";
// import React, { useState } from "react";
// import styled from "styled-components";

// const DropDownContainer = styled("div")`
//   position: absolute;
//   top: 0;
//   right: 0;
// `;

// const DropDownHeader = styled("div")`
//   // margin-bottom: 0.8em;
//   // padding: 0.4em 2em 0.4em 1em;
//   // box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
//   font-weight: 500;
//   font-size: 1.3rem;
//   color: #3faffa;
//   // background: #ffffff;
// `;

// const DropDownListContainer = styled("div")`
//   position: absolute;
//   right: 5%;
//   width: 30vw;
//   `;

// const DropDownList = styled("ul")`
//   padding: 0;
//   margin: 0;
//   padding-left: 1em;
//   // background: #ffffff;
//   border: 2px solid #e5e5e5;
//   box-sizing: border-box;
//   color: #06113C;
//   font-size: 1.3rem;
//   font-weight: 500;
//   &:first-child {
//     padding-top: 0.8em;
//   }
// `;

// const ListItem = styled("li")`
//   list-style: none;
//   margin-bottom: 0.8em;
// `;

// const options = ["Profile", "Settings", "Log"];

// export default function App() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);

//   const toggling = () => setIsOpen(!isOpen);

//   const onOptionClicked = value => () => {
//     setSelectedOption(value);
//     setIsOpen(false);
//     console.log(selectedOption);
//   };

//   return (
//       <DropDownContainer>
//         <DropDownHeader onClick={toggling}>
//           <IconButton>
//             <Settings fontSize="large" sx={{color:"#06113C"}}/>
//           </IconButton>
//         </DropDownHeader>
//         {isOpen && (
//           <DropDownListContainer>
//             <DropDownList>
//               {options.map(option => (
//                 <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
//                   {option}
//                 </ListItem>
//               ))}
//             </DropDownList>
//           </DropDownListContainer>
//         )}
//       </DropDownContainer>
//   );
// }