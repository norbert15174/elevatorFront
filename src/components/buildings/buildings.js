import React from "react";
import styled from "styled-components";
import url from "./../../url";
import AddBuildings from "./addBuilding";
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import SectionTitle from "./../sketch/sectionTitle";
import { CgClose } from "react-icons/cg";
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
`;

const AddButton = styled(IoMdAddCircle)`
  color: #333;
  font-size: 120px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 250px;
  position: relative;
  height: 60px;
  background-color: red;
  left: calc(50% - 125px);
  margin-top: 50px;
  color: #f2cb79;
  outline: none;
  border-radius: 25px;
  background-color: #333;
  font-size: 20px;
  padding: 10px 10px 10px 10px;
  cursor: pointer;
  font-weight: 700;
  font-style: italic;
  border: none;
`;

const BuildingList = styled.div`
  display: grid;
  width: 80vw;
  position: relative;
  left: 10vw;
  display: grid;
  grid-template-columns: 25vw 25vw 25vw;
  @media only screen and (max-width: 1200px) {
    grid-template-columns: 40vw 40vw;
  }
  grid-template-columns: 25vw 25vw 25vw;
  @media only screen and (max-width: 800px) {
    grid-template-columns: 80vw;
  }
`;

const BuildingContainer = styled.div`
  position: relative;
  height: 700px;
  animation: slidein 1s;
  opacity: 1;
  @keyframes slidein {
    from {
      transform: translateY(20%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }
`;

const Item = styled.div`
  width: 80%;
  position: relative;
  left: 10%;
  top: 50px;
  height: 600px;
  background-color: white;
  -webkit-box-shadow: 2px 7px 17px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 7px 17px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 2px 7px 17px 0px rgba(0, 0, 0, 0.75);
  padding: 15px 15px 15px 15px;
`;

const BuildingName = styled.p`
  color: #333;
  font-size: 40px;
  text-align: center;
  width: 100%;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;

const Icon = styled(AiOutlineHome)`
  position: relative;
  left: calc(50% - 70px);
  font-size: 140px;
  color: #f2cb79;
  top: 20px;
`;

const Owner = styled.span`
  font-size: 20px;
  position: absolute;
  right: 20px;
  bottom: 15px;
  font-style: italic;
  font-weight: 700;
  & span {
    color: #f2cb79;
  }
`;

const DeleteIcon = styled(TiDelete)`
  font-size: 60px;
  color: #7a0000;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

const CloseWindow = styled(CgClose)`
  color: #f2cb79;
  font-size: 80px;
  position: fixed;
  right: 5vw;
  top: 8vh;
  z-index: 500;
`;

const IsSure = styled.div`
  position: fixed;
  width: 600px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.6);
  top: calc(50vh - 160px);
  left: calc(50vw - 310px);
  z-index: 500;
  padding: 20px 20px 20px 20px;
  @media only screen and (max-width: 800px) {
    left: calc(50vw - 210px);
    width: 380px;
    height: 300px;
  }
`;

const TextInSure = styled.p`
  color: #f2cb79;
  font-style: italic;
  font-size: 30px;
  width: 100%;
  text-align: center;
  @media only screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

const ContainerHiddenBlock = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 400;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const LinkToManage = styled(Link)`

  border: none; 
  text-decoration: none;
  background: none;
  color: #f2cb79;

`;

const AnswerButton = styled.button`
  width: 220px;
  padding: 20px 20px 20px 20px;
  border: none;
  outline: none;
  color: ${({ func }) => (func === "yes" ? "#333" : "#f2cb79")};
  background-color: ${({ func }) => (func === "no" ? "#333" : "#f2cb79")};
  position: relative;
  font-size: 30px;
  font-weight: 600;
  font-style: italic;
  top: 80px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  @media only screen and (max-width: 800px) {
    width: 150px;
    font-size: 20px;
  }
`;

class Building extends React.Component {
  state = {
    data: [],
    isReady: "no",
    addClicked: "no",
    remove: " ",
  };

  isToken = localStorage.getItem("Bearer");
  username = localStorage.getItem("Username");

  myHeaders = new Headers({
    Authorization: "Bearer " + localStorage.getItem("Bearer"),
    "Content-Type": "application/json",
  });

  async componentDidMount() {
    await fetch(url + "/elevator/buildings", {})
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          data,
          isReady: "yes",
        })
      )
      .catch((error) => console.log(error));
  }

  async deleteBuilding(id) {
    await fetch(url + "/building/delete/" + id, {
      headers: this.myHeaders,
      method: "delete",
    })
      .then((response) => {
        if (response.status === 200) window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  setClicked = () => {
    this.setState({
      addClicked: this.state.addClicked === "no" ? "yes" : "no",
    });
  };

  setRemove = (e) =>{
    this.setState({
        remove: e,
      });
  }

  render() {
    return (
      <Container>
        {this.state.remove === " " ? null : (
            <>
            <ContainerHiddenBlock></ContainerHiddenBlock>
          <IsSure>
              
            <TextInSure>
              Are you sure that you want to delete this building from the
              buildings list ?
              <ButtonContainer>
                <AnswerButton func="yes" onClick={(del) => this.deleteBuilding(this.state.remove)}>Yes</AnswerButton>
                <AnswerButton func="no" onClick={(notdel) => this.setRemove(" ")}>No</AnswerButton>
              </ButtonContainer>
            </TextInSure>
          </IsSure>
          </>
        )}

        
        {this.state.addClicked !== "no" ? (
          <CloseWindow onClick={(e) => this.setClicked()}> </CloseWindow>
        ) : null}
        {this.isToken !== null && this.state.addClicked !== "no" ? (
          <AddBuildings></AddBuildings>
        ) : null}
        <SectionTitle title="Buildings"></SectionTitle>
        <BuildingList>
          {this.state.isReady === "yes"
            ? Object.keys(this.state.data).map((e) => (
                <>
                    
                  {this.state.data[e].map((b) => (
                    <BuildingContainer>
                      <Item>
                        {this.username !== null && this.username === e ? (
                          <DeleteIcon
                            onClick={(del) => this.setRemove(b.id)}
                          ></DeleteIcon>
                        ) : null}
                        <Icon></Icon>
                        <BuildingName key={b.buildingName}>
                          {b.buildingName}{" "}
                        </BuildingName>{" "}
                        <Owner key={e}>
                          Owner: <span>{e}</span>
                        </Owner>
                        <Button><LinkToManage to={"/" + e + "/" + b.id}>Manage</LinkToManage></Button>
                      </Item>
                    </BuildingContainer>
                  ))}
                </>
              ))
            : null}
        </BuildingList>
        {this.isToken !== null ? (
          <AddButton onClick={(e) => this.setClicked()}></AddButton>
        ) : null}
      </Container>
    );
  }
}

export default Building;
