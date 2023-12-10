import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import games from "../assets/games.jpg";
import gameHeader from "../assets/gameHeader.jpg";
import hangman from "../assets/3.jpg";
import memory from "../assets/5.jpg";
import type from "../assets/8.png";
const Games = () => {
  return (
    <Wrapper className="games">
      <section className="games">
        <img src={games} alt="games" />
        <h2>play our games</h2>
        <p>
          Play our react.js based games and spend a happy time trying to defeat
          your friends Lorem ipsum dolor sit amet.{" "}
        </p>
      </section>
      <section className="hangman">
        <img src={hangman} alt="hangman" className="mb" />
        <img src={gameHeader} alt="hangman" className="md-lg" />
        <h2>Hangman</h2>
        <p>
          Guess the word before the man get hang with only 6 false guesses
          allowed .. React.js based game
        </p>
        <Link to="/hangman">play now</Link>
      </section>
      <section className="memory">
        <img src={memory} alt="memory" className="mb" />
        <img src={gameHeader} alt="memory" className="md-lg" />
        <h2>memory blocks</h2>
        <p>
          Test your memory with the classic memory blocks game with different
          levels of difficulty to improve yor memory
        </p>
        <Link to="/memory">play now</Link>
      </section>
      <section className="type">
        <img src={type} alt="type" className="mb" />
        <img src={gameHeader} alt="type" className="md-lg" />
        <h2>typing game</h2>
        <p>
          Challenge yourself and friends to know wo is better in typing with
          that game with many levels of difficulty
        </p>
        <Link to="/typeSpeed">play now</Link>
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
      &.md-lg {
        display: none;
      }
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
  }
  p {
    padding: 0px 15px;
    line-height: 1.5;
  }
  a {
    display: block;
    width: fit-content;
    margin: 5px 15px 0px;
    text-transform: uppercase;
    padding: 6px 12px;
    font-size: 1.2rem;
    border: 1px solid var(--primary-clr-10);
    transform: var(--transition);
    border-radius: 6px;
    color: var(--primary-clr-10);
  }
  a:hover {
    background-color: var(--primary-clr-6);
    color: #fff;
  }
  @media (min-width: 550px) {
    .mb {
      display: none;
    }
    .md-lg {
      display: block !important;
    }
  }
   section:last-of-type {
    margin-bottom: 25px;
    padding-bottom: 50px;
  }
`;
export default Games;
