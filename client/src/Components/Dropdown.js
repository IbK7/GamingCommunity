import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Grid } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const DropDownContainer = styled("div")`
  position: absolute;
  top: 1%;
  right: 1%;
`;

const DropDownHeader = styled("div")`
  // margin-bottom: 0.8em;
  // padding: 0.4em 2em 0.4em 1em;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  // background: #ffffff;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  top: 117%;
  right: 0;
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.15);
  width: 15vw;
  `;

const DropDownList = styled("ul")`
  padding: 0;
  margin-top: 0;
//   padding-left: 1em;
//   background: #ffffff;
//   border: 2px solid #e5e5e5;
//   box-sizing: border-box;
  color: #06113C;
//   font-size: 1.0rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  padding-bottom: 0.6em;
  padding-top: 0.6em;
  padding-left: 1em;
  &: hover {
      background-color: #FF8C32;
      cursor: pointer;
  }
`;

export default function Dropdown(props) {
    const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/')
}

  return (
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
            <Avatar 
                alt="@pn"
                sx={{cursor: "pointer"}}
                src={props.profilePic}
            />
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
                <ListItem onClick={() => {navigate('/myprofile')}} key={1}>
                    <Grid container direction="row" alignItems="center" justifyContent="flex-start" spacing = {1} >
                      <Grid item>
                        <PersonIcon sx = {{color: "#06113C"}} />
                      </Grid>
                      <Grid item>
                        My Profile
                      </Grid>
                    </Grid>
                </ListItem>

                <hr />
                <ListItem onClick={handleLogout} key={3}>
                <Grid container direction="row" alignItems="center" justifyContent="flex-start" spacing = {1} >
                      <Grid item>
                        <LogoutIcon sx = {{color: "#06113C"}} />
                      </Grid>
                      <Grid item>
                        Logout
                      </Grid>
                    </Grid>
                </ListItem>
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
  );
}