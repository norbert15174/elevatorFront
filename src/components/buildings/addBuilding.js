import React, { useState } from "react";
import styled from "styled-components";
import url from "./../../url";
import style from "./style.module.scss";

const Container = styled.div`
  width: 90vw;
  height: 90vh;
  min-height: 700px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  left: 5vw;
  top: 5vh;
  z-index: 20;
`;

const Section = styled.p`
  color: #f2cb79;
  font-style: italic;
  font-size: 50px;
  font-weight: 700;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;


const Button = styled.button`
  width: 250px;
  position: relative;
  height: 60px;
  background-color: red;
  left: calc(50% - 125px);
  margin-top: 50px;
  outline: none;
  border-radius: 25px;
  background-color: #f2cb79;
  font-size: 20px;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
  font-weight: 700;
  font-style: italic;
  border: none;
`;

function AddBuildings() {
  const building = {
    floorsNumber: 0,
    buldingName: " ",
  };

  const myHeaders = new Headers({
    Authorization: "Bearer " + localStorage.getItem("Bearer"),
    "Content-Type": "application/json"
  });


  const [name, setName] = useState(" asd ");
  const [flatsNumber, setFlatNumber] = useState(0);

  async function addBuildingFunction(){

    building.buldingName = name;
    building.floorsNumber = flatsNumber;
    if( name.length < 3 || name.length > 40 || flatsNumber > 40 || flatsNumber < 1){
        window.alert("The name cannot be longer than 40 and shorter than 4 characters, in addition the number of floors must be between 1-50 ")
    }else{
        await fetch(
            url + "/building/add",
            {
              method: "post",
              headers: myHeaders,
              body: JSON.stringify({
                  floorsNumber: flatsNumber,
                  buildingName: name,
                }),
            }
          ).then(response => {if(response.status === 200){
            alert("Building has been added");
            window.location.reload();
          } else{
            alert("Building couldn't be added")
          }});

          
    }
    
  }



  return (
    <Container>
        <div className={style.formContainer}>
            <Section>Add Building</Section>
      <div className={style.formContainer}>
        <input
          className={style.b}
          type="text"
          required="required"
          onChange={(e) => setName(e.target.value)}
          max="50"
        />
        <label className={style.formLabel}>Building name</label>
        <div className="cover"></div>
      </div>
      <div className={style.formContainer}>
        <input
          className={style.b}
          type="number"
          required="required"
          max="50"
          onChange={(e) => setFlatNumber(e.target.value)}
        />
        <label className={style.formLabel}>Number of floors</label>
        <div className="cover"></div>
      </div>
      <Button onClick={e => addBuildingFunction()}>Add</Button>
      </div>
    </Container>
  );
}

export default AddBuildings;
