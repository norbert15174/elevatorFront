import React from "react";
import styled from "styled-components";


const Tittle = styled.div`
  text-align: center;
  color: black;
  font-size: 55px;
  font-weight: 500;
  position: relative;
  margin-bottom: 80px;
  &:before {
    font-family: Arial, Helvetica, sans-serif;
    position: relative;
    content: '${({sectionTitle}) => sectionTitle}';
    color: black;
    display: block;
    position: relative;
    opacity: 0.3;
    top: 90px;
    font-size: 100px;
    font-weight: 700;
    font-style: italic;
  }
`;

const SectionTitle = ({title}) => (
    <Tittle sectionTitle={title}>{title}</Tittle>
);

export default SectionTitle;