import React from "react";
import gameHeader from "../assets/gameHeader.jpg";
import gameResults from "../assets/games-results.jpg";
import enjoy from "../assets/enjoy.jpg";
import games from "../assets/games.jpg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Wrapper className="home">
      <section className="header">
        <img src={gameHeader} alt="header" />
        <h2>
          {" "}
          <span>React</span>Station
        </h2>
        <p>
          React station come with a lot of games build with the fabulous
          React.js such as : hangman game , memory blocks game & type speed{" "}
        </p>
      </section>
      <section className="games">
        <img src={games} alt="games" />
        <h2>play our games</h2>
        <p>
          play our react.js based games and spend a happy time trying to defeat
          ypu friends Lorem ipsum dolor sit amet.{" "}
        </p>
        <Link to="/games">play now</Link>
      </section>
      <section className="results">
        <img src={gameResults} alt="results" />
        <h2>compare your scores</h2>
        <p>
          compare your scores with your friends and hare the joy with them Lorem
          ipsum dolor sit amet.{" "}
        </p>
        <Link to="/results">see scores</Link>
      </section>
      <section className="enjoy">
        <img src={enjoy} alt="enjoy" />
        <h2>enjoy the experience</h2>
        <p>
          we hope you enjoy our station and try our new monthly games Lorem
          ipsum dolor sit amet.{" "}
        </p>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 60px auto 25px;
  section {
    margin-bottom: 50px;
    img {
      width: 100%;
    }
    h2 {
      padding: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      position: relative;
      width: fit-content;
      margin: 1.5rem 0.5rem;
    }
    h2::before {
      content: "";
      position: absolute;
      height: 3px;
      width: 100%;
      bottom: 0px;
      background-color: var(--primary-clr-4);
    }
    p {
      padding: 10px 15px;
      line-height: 1.5;
    }
    a {
      display: block;
      width: fit-content;
      margin: 5px 15px 0px;
      text-transform: uppercase;
      padding: 6px 12px;
      font-size: 1.5rem;
      border: 1px solid var(--primary-clr-10);
      transform: var(--transition);
      border-radius: 6px;
      color: var(--primary-clr-10);
    }
    a:hover {
      background-color: var(--primary-clr-6);
      color: #fff;
    }
  }
   section:last-of-type {
    margin-bottom: 25px;
    padding-bottom: 50px;
  }
`;
export default Home;
