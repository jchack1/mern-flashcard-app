import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const TileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: 75px auto;
  width: 70vw;

  @media (max-width: 625px) {
    width: 90vw;
  }
`;

const Tile = styled.div`
  height: 175px;
  width: 175px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 10%;
  padding: 20px;
  margin: 20px;

  @media (max-width: 500px) {
    height: 130px;
    width: 130px;
    margin: 10px;
  }
  @media (max-width: 350px) {
    height: 100px;
    width: 100px;
    margin: 10px;
  }
`;

const IconContainer = styled.p`
  font-size: 40px;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    font-size: 20px;
    margin-bottom: 5px;
  }
`;

const H1 = styled.h1`
  margin-left: 20px;
  margin-right: 20px;

  @media (max-width: 215px) {
    margin-left: 10px;
    font-size: 1.75rem;
  }
`;

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <H1 className="text-4xl font-bold mt-10 text-center text-gray-50">
        <i class="fas fa-flask" style={{margin: "10px", fontSize: "50px"}}></i>{" "}
        Science Flashcards
      </H1>
      <TileContainer>
        <Link to="/amino-acids">
          <Tile className="bg-purple-500 hover:bg-purple-700 flex items-center justify-center text-white font-medium border border-purple-800 sm:text-lg">
            <IconContainer>
              <i class="fas fa-vial"></i>
            </IconContainer>
            Amino Acids
          </Tile>
        </Link>
        <Link to="/organic-chem">
          <Tile className="bg-blue-500 hover:bg-blue-700 flex items-center justify-center text-white font-medium border border-blue-800 sm:text-lg">
            <IconContainer>
              <i class="fas fa-atom"></i>
            </IconContainer>
            Organic Chemistry
          </Tile>
        </Link>
        <Link to="/bio">
          <Tile className="bg-green-500 hover:bg-green-700 flex items-center justify-center text-white font-medium border border-green-800 sm:text-lg">
            <IconContainer>
              <i class="fas fa-dna"></i>
            </IconContainer>
            Biology
          </Tile>
        </Link>
        <Link to="/phys">
          <Tile className="bg-pink-500 hover:bg-pink-700 flex items-center justify-center text-white font-medium border border-pink-800 sm:text-lg">
            <IconContainer>
              <i class="fas fa-rocket"></i>
            </IconContainer>
            Physics
          </Tile>
        </Link>
        <Link to="/web-dev">
          <Tile className="bg-yellow-500 hover:bg-yellow-700 flex items-center justify-center text-white font-medium border border-yellow-800 sm:text-lg">
            <IconContainer>
              <i class="fas fa-laptop-code"></i>
            </IconContainer>
            Web Development
          </Tile>
        </Link>
      </TileContainer>
    </div>
  );
};

export default HomePage;
