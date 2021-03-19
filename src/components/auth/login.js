import React, { useState } from "react";
import styled from "styled-components";
import style from "./style.module.scss";
import url from "./../../url";
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 80%;
  position: relative;
  left: 10%;
  top: 10%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Button = styled.button`
  width: 250px;
  position: relative;
  height: 60px;
  background-color: red;
  left: calc(50% - 125px);
  margin-top: 50px;
  outline: none;
  border-radius: 15px;
  background-color: #f2cb79;
  font-size: 20px;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
  font-weight: 700;
  font-style: italic;
`;

const Continue = styled.button`
  width: 400px;
  position: relative;
  height: 100px;
  background-color: red;
  left: calc(50% - 200px);
  margin-top: 50px;
  outline: none;
  border-radius: 15px;
  color: #f2cb79;
  background-color: #222;
  font-size: 25px;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
  font-weight: 700;
  font-style: italic;
  border: none;
  @media only screen and (max-width: 600px) {
    width: 300px;
    height: 60px;
    left: calc(50% - 150px);
    font-size: 20px;
  }
`;

const CreateAccount = styled.p`
  color: #f2cb79;
  font-style: italic;
  font-size: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const ShowError = styled.p`
  color: red;
  font-style: italic;
  font-size: 30px;
  width: 100%;
  text-align: center;
`;

const LinkToManage = styled(Link)`

  border: none; 
  text-decoration: none;
  background: none;
  color: #f2cb79;

`;

function Login() {
  const [option, setOption] = useState("Log in");
  const [username, setUsername] = useState(" asd ");
  const [password, setPassword] = useState(" asd ");
  const [incorret, setIncorrect] = useState(" correct ");
  const createHistory = require("history").createBrowserHistory;
  async function Auth() {
    if (option === "Log in") {
      const path = url + "/auth/login";
      await fetch(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            setIncorrect("incorrect");
          }
        })
        .then((data) => {
          data.Token !== "" ? localStorage.setItem("Bearer", data.Token) : console.log(data);
          data.Username !== "" ? localStorage.setItem("Username", data.Username) : console.log(data);
        
          const createHistory = require("history").createBrowserHistory;
            createHistory().push("/buildings");
            let pathUrl = window.location.href;
            window.location.href = pathUrl;

        })
        .catch((er) => null);
    } else {
      const path = url + "/auth/register";
      await fetch(path, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            setOption("Log in");
            alert("You can log in!")
            return response.json();
          } else {
            setIncorrect("incorrect");
          }
        }).catch((er) => null);
    }
  }
  



  if (localStorage.getItem("Bearer") != null && localStorage.getItem("Username") != null) {

    fetch(url + "/building/add/elevator", {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Bearer"),
        "Content-Type": "application/json",
      }
    }).then((response) => {
      if (response.status === 200) {
        createHistory().push("/buildings");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
      } else {
        localStorage.removeItem("Bearer");
        localStorage.removeItem("Username");
      }
    });



  }
  return (
    <Container>
        
      <div className={style.formContainer}>
      {incorret === "incorrect" ? <ShowError>Inccorect password or username</ShowError> : null}
        <div className={style.formContainer}>
          <input
            className={style.b}
            type="tel"
            required="required"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={style.formLabel}>Login</label>
          <div className="cover"></div>
        </div>
        <div className={style.formContainer}>
          <input
            className={style.b}
            type="password"
            required="required"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={style.formLabel}>Password</label>
          <div className="cover"></div>
        </div>
        <Button onClick={(e) => Auth()}>{option}</Button>
        <CreateAccount
          onClick={(e) =>
            setOption(option === "Log in" ? "Register" : "Log in")
          }
        >
          {option === "Log in" ? "Create Account" : "Log in"}
        </CreateAccount>
        <Continue><LinkToManage to="/buildings">Continue without account</LinkToManage></Continue>
      </div>
    </Container>
  );
}

export default Login;
