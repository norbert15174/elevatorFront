import React from "react";
import styled from "styled-components";
import url from "./../../url";
import { AiOutlineHome } from "react-icons/ai";
import { GiElevator } from "react-icons/gi";
import Elevator from "./elevator";
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
`;

const Icon = styled(AiOutlineHome)`
  position: relative;
  left: calc(50% - 70px);
  font-size: 250px;
  color: #333;
  top: 50px;
  @media only screen and (max-width: 1000px) {
    left: calc(50% - 125px);
  }
`;

const Building = styled.div`
  width: 80vw;
  position: relative;
  top: 50px;
  left: 10vw;
  padding: 30px 20px 200px 20px;
  -webkit-box-shadow: 1px 6px 16px 5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 6px 16px 5px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 6px 16px 5px rgba(0, 0, 0, 0.75);
  @media only screen and (max-width: 1000px) {
    width: 88vw;
    padding: 15px 10px 200px 10px;
    left: 3vw;
  }
`;

const BuildingInformationContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 30% 70%;
  border-bottom: 2px solid #f2cb79;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 100%;
  }
`;

const BuildingInformation = styled.div`
  display: grid;
  grid-template-columns: 100%;
  position: relative;
  @media only screen and (max-width: 1000px) {
    margin-top: 100px;
  }
`;

const InformationItem = styled.div`
  position: relative;
  width: 80%;
  left: 10%;
`;

const Item = styled.p`
  font-size: 30px;
  color: #f2cb79;
`;

const ItemSpan = styled.span`
  color: #333;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  position: relative;
`;

const ElevatorIcon = styled(GiElevator)`
  font-size: 50px;
  top: 20px;
  position: relative;
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const ElevatorContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  position: relative;
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 50% 50%;
  }
  @media only screen and (max-width: 800px) {
    grid-template-columns: 50% 50%;
  }
`;

const ElevatorId = styled.h1`
  color: #f2cb79;
  position: relative;
  @media only screen and (max-width: 1000px) {
    font-size: 20px;
    left: 20px;
  }
`;

const CurrentFloor = styled.h1`
  color: #f2cb79;
  position: relative;
  @media only screen and (max-width: 1000px) {
    font-size: 20px;
    left: 20px;
  }
`;



const ElevatorMainContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f2cb79;
  position: relative;
  top: 100px;
`;

const Button = styled.button`
  width: 400px;
  padding: 20px 20px 20px 20px;
  border: none;
  outline: none;
  color: ${({ func }) => (func === "yes" ? "#333" : "#f2cb79")};
  background-color: ${({ func }) => (func === "no" ? "#333" : "#f2cb79")};
  position: relative;
  font-size: 30px;
  font-weight: 600;
  font-style: italic;
  top: 40px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  @media only screen and (max-width: 1000px) {
    width: 200px;
    font-size: 20px;
  }
  @media only screen and (max-width: 800px) {
    width: 150px;
    font-size: 20px;
  }
`;

const ItemContainer = styled.div`
  position: relative;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media only screen and (max-width: 800px) {
    height: 50px;
  }
`;

class BuildingElevator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  state = {
    data: [],
    isReady: "no",
  };

  componentDidMount() {
    const path =
      url +
      "/elevator/user/" +
      this.props.match.params.name +
      "/" +
      this.props.match.params.id;
    console.log(path);
    fetch(path, {})
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data,
          isReady: "yes",
        });
      })
      .catch((error) => console.log(error));
  }

  addElevator() {
    fetch(url + "/building/add/elevator", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Bearer"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.props.match.params.name,
        buildingId: this.props.match.params.id,
      }),
    }).then((response) => {
      if (response.status === 200) {
        window.alert("Elevator has been added");
        window.location.reload();
      } else {
        window.alert("Elevator couldn't be added");
      }
    });
  }

  render() {
    return (
      <Container>
        <Building>
          <BuildingInformationContainer>
            <Icon></Icon>
            {this.state.isReady === "yes" ? (
              <BuildingInformation>
                <InformationItem>
                  <Item>
                    Owner: <ItemSpan>{this.props.match.params.name}</ItemSpan>
                  </Item>
                </InformationItem>
                <InformationItem>
                  <Item>
                    ID: <ItemSpan>{this.props.match.params.id}</ItemSpan>
                  </Item>
                </InformationItem>
                <InformationItem>
                  <Item>
                    Building Name:{" "}
                    <ItemSpan>{this.state.data.buildingName}</ItemSpan>
                  </Item>
                </InformationItem>
                <InformationItem>
                  <Item>
                    Number of floors:{" "}
                    <ItemSpan>{this.state.data.floorsNumber}</ItemSpan>
                  </Item>
                </InformationItem>
              </BuildingInformation>
            ) : null}
          </BuildingInformationContainer>
          {this.props.match.params.name === localStorage.getItem("Username") ? (
            <ButtonContainer>
              <Button func="yes" onClick={(e) => this.addElevator()}>
                Add Elevator
              </Button>
              <Button func="no" onClick={(e) => window.location.reload()}>
                Refresh Data
              </Button>
            </ButtonContainer>
          ) : null}

          {this.state.isReady === "yes" ? (
            <div>
              {Object.values(this.state.data.elevatorInUseList).map((v) => (
                <ElevatorMainContainer key={v.id}>
                  <ElevatorContainer>
                    <ItemContainer>
                      <ElevatorId>ID # {v.id}</ElevatorId>
                    </ItemContainer>

                    <ItemContainer>
                      <ElevatorIcon></ElevatorIcon>
                    </ItemContainer>
                    <ItemContainer>
                      <CurrentFloor>Current Floor: {v.currentFloor}</CurrentFloor>
                    </ItemContainer>
                  </ElevatorContainer>
                  <Elevator
                    user={this.props.match.params.name}
                    elev={v}
                    build={this.props.match.params.id}
                    num={this.state.data.floorsNumber}
                  ></Elevator>
                </ElevatorMainContainer>
              ))}
            </div>
          ) : null}
        </Building>
      </Container>
    );
  }
}
export default BuildingElevator;
