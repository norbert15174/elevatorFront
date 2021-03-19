import React, { useState } from "react";
import styled from "styled-components";
import url from "./../../url";

const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  display: grid;
  padding-top: 15px;
  padding-bottom: 15px;
  grid-template-columns: 25% 25% 25% 25%;
  position: relative;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 50% 50%;
  }
`;

const Button = styled.button`
  width: 200px;
  padding: 10px 10px 10px 10px;
  border: none;
  outline: none;
  color: #f2cb79;
  background-color: #333;
  position: relative;
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
  margin-left: auto;
  margin-right: auto;
  border-radius: 30px;
  margin-top: 20px;
  cursor: pointer;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 50% 50%;
    width: 160px;
    font-size: 14px;
    padding: 15px 15px 15px 15px;
  }
`;

const Flats = styled.div`
  margin-top: 20px;
  color: #f2cb79;
  font-size: 20px;
`;

const ChooseFloor = styled.div`
  width: 400px;
  position: fixed;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.8);
  left: calc(50vw - 200px);
  top: calc(50vh - 200px);

  z-index: 500;
`;
const ChooseFloorBackground = styled.div`
  width: 100vw;
  position: fixed;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 500;
`;

const PickNumber = styled.input`
  width: 200px;
  height: 30px;
  padding: 15px 15px 15px 15px;
  left: calc(50% - 110px);
  position: relative;
  top: 100px;
  background: #333;
  border-radius: 20px;
  outline: none;
  border: none;
  top: 40px;
  color: #f2cb79;
`;

const TextPut = styled.h3`
  width: 100%;
  text-align: center;
  color: #f2cb79;
  position: relative;
  top: 30px;
`;

const ButtonPick = styled.button`
  width: 180px;
  padding: 20px 20px 20px 20px;
  border: none;
  outline: none;
  color: #f2cb79;
  background-color: #333;
  position: relative;
  font-size: 20px;
  font-weight: 600;
  font-style: italic;
  cursor: pointer;
  border-radius: 20px;
  left: calc(50% - 90px);
  top: 120px;
`;

const Close = styled.p`

  color: #f2cb79;
  font-size: 18px;
  width: 100%;
  position: relative;
  text-align: center;
  top: 130px;
  cursor: pointer;
`;

function Elevator({ user, elev, build, num }) {
    const [close, setClose] = useState("no");
    const [floor, setFloor] = useState(1);
  const addFloor = (id) => {
      if(floor > 1 && floor <= num){
        fetch(url + "/elevator/add/" + floor, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user,
              buildingId: build,
              elevatorId: elev.id,
            }),
          })
            .then((response) => {
              if (response.status === 200) window.location.reload();
            })
            .catch((error) => console.log(error));
      }else{
          window.alert("Wrong Floor");
      }
    
  };

  const elevatorMove = () => {
    fetch(url + "/elevator/move", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        buildingId: build,
        elevatorId: elev.id,
      }),
    })
      .then((response) => {
        if (response.status === 200) window.location.reload();
      })
      .catch((error) => console.log(error));
  };


  return (
    <Container>
      <Flats>
        Next Floors:{" "}
        {elev.nextFlats !== null ? elev.nextFlats.map((e) => e + ",") : null}
      </Flats>
      <Button onClick={(e) => elevatorMove()}>Step</Button>
      <Button onClick={(e) => setClose("yes")}>Pick Up</Button>
      <Button onClick={(e) => window.location.reload()}>
        Get Current Data
      </Button>
      {close === "yes" ?      <ChooseFloorBackground>
        <ChooseFloor>
          <TextPut>Put Floor Number</TextPut>
          <PickNumber type="number" onChange={e => setFloor(e.target.value)}></PickNumber>
          <ButtonPick onClick={(e) => addFloor()}>Pick Up</ButtonPick>
          <Close onClick={(e) => setClose("no")}>close</Close>
        </ChooseFloor>
      </ChooseFloorBackground> : null}
 
    </Container>
  );
}

export default Elevator;
