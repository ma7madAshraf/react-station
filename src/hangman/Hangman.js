import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { data } from "./data";
import { AppContext } from "../reducers/context";
//sounds
import useSound from "use-sound";
import success from "../assets/sounds/success.mp3";
import fail from "../assets/sounds/fail.mp3";
import win from "../assets/sounds/win.mp3";
import lose from "../assets/sounds/lose.mp3";

const Hangman = () => {
   // eslint-disable-next-line
  const [theData, setTheData] = useState(data);
  const [isSucceed, setIsSucceed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [lives, setLives] = useState(7);
  const [wrongTries, setWrongTries] = useState(0);
  const [category, setCategory] = useState("");
  const [theWord, setTheWord] = useState("");
  const [remainingBoxes, setRemainingBoxes] = useState(theWord.length);
  const { setScoreInLocalStorage } = React.useContext(AppContext);
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  //sounds
  const [playSuccess] = useSound(success);
  const [playFail] = useSound(fail);
  const [playWin] = useSound(win);
  const [playLose] = useSound(lose);

  const generate = () => {
    let allKeys = Array.from(Object.keys(theData));
    let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
    setCategory(randomKey);

    //select random word from the random category
    let randomWord =
      theData[randomKey][Math.floor(Math.random() * theData[randomKey].length)];
    setTheWord(randomWord);
    setRemainingBoxes(randomWord.length);
    setIsSucceed(false);
    setIsFailed(false);
    setLives(7);
    setWrongTries(0);
     // eslint-disable-next-line
    Array.from(document.querySelectorAll(".letters span.clicked")).map((e) => {
      e.classList.remove("clicked");
       // eslint-disable-next-line
      Array.from(document.querySelectorAll(".guess-letters span")).map(
        (e) => (e.textContent = "")
      );
    });
  };

  const Check = (e, value) => {
    e.target.classList.add("clicked");
    const checkWord = theWord.toLowerCase();
    let checking = checkWord.includes(value);
    if (checking) {
      playSuccess();
      console.log(true);
      let guessBoxes = Array.from(
        document.querySelectorAll(".guess-letters span")
      );
      Array.from(checkWord).forEach((e, index) => {
        if (e === value) {
          setRemainingBoxes((remainingBoxes) => {
            const remain = remainingBoxes - 1;
            if (remain === 0) {
              setIsSucceed(true);
              setScoreInLocalStorage("hangman", null, 1, 0);
              playWin();
            }
            return remain;
          });
          guessBoxes[index].textContent = e;
        }
      });
    } else {
      playFail();
      setWrongTries((wrongTries) => {
        const newVal = wrongTries + 1;
        return newVal;
      });
      setLives((lives) => {
        const remainLives = lives - 1;
        if (remainLives === 0) {
          setIsFailed(true);
          setScoreInLocalStorage("hangman", null, 0, 1);
          playLose();
        }
        return remainLives;
      });
    }
  };

  useEffect(
    generate,
    // eslint-disable-next-line
    []
  );
  return (
    <>
      <Wrapper className="container">
        <div className="game-info">
          <div className="category">
            <span className="md-lg"> Category : </span>
            {""} <span>{category}</span>
          </div>
          <div className="name">
            <h2>Hangman</h2>
          </div>
          <div className="lives">
            lives : <span>{lives}</span>
          </div>
        </div>
        <div
          className={
            isFailed || isSucceed ? "finished game-letters" : "game-letters"
          }
        >
          <div className="draw">
            {wrongTries > 0 && <div className="hang"></div>}
            {wrongTries > 1 && <div className="rope"></div>}
            {wrongTries > 1 && <div className="head"></div>}
            {wrongTries > 2 && <div className="right-hand"></div>}
            {wrongTries > 3 && <div className="left-hand"></div>}
            {wrongTries > 4 && <div className="core"></div>}
            {wrongTries > 5 && <div className="right-leg"></div>}
            {wrongTries > 6 && <div className="left-leg"></div>}
          </div>
          <div className="letters">
            {Array.from(alpha).map((letter) => {
              return (
                <span
                  key={letter}
                  className="letter"
                  onClick={(e) => Check(e, letter)}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>
        <div className="guess-letters">
          {Array.from(theWord).map((e, index) => {
            if (e === " ") {
              setRemainingBoxes(remainingBoxes - 1);
              return (
                <span className="letter-box with-space" key={index}></span>
              );
            } else {
              return <span className="letter-box" key={index}></span>;
            }
          })}
        </div>
        {isFailed && (
          <div className="fail">
            <h3>Failed</h3>
            <div className="answer">{theWord}</div>
            <button className="playAgain" onClick={generate}>
              Play Again
            </button>
          </div>
        )}
        {isSucceed && (
          <div className="success">
            <h3>like a pro</h3>
            <button className="playAgain" onClick={generate}>
              Play Again
            </button>
          </div>
        )}
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  width: 98vw;
  margin-top: 60px;
  position: relative;
  height: var(--page-h);
  .md-lg {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .game-info {
    display: flex;
    background-color: var(--primary-clr-6);
    color: white;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;

    @media (min-width: 768px) {
    }
  }
  .game-info .category {
    display: flex;
  }
  .game-info h2 {
  }
  .game-info .lives {
  }
  .game-letters {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    @media (min-width: 768px) {
      margin-bottom: 10px;
    }
  }
  .game-letters.finished {
    opacity: 0.4;
    pointer-events: none;
  }
  .game-letters .draw {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 50%;
    min-height: 220px;
    margin: 0 auto;
  }

  .game-letters .draw .hang {
    display: block;
    position: absolute;
    background-color: black;
    height: 166px;
    width: 4px;
    top: 12%;
    left: 21%;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
  }
  .game-letters .draw .hang::before {
    content: "";
    background-color: black;
    position: absolute;
    display: block;
    height: 4px;
    width: 50px;
    top: 100%;
    right: -21px;
  }
  .game-letters .draw .hang::after {
    content: "";
    background-color: black;
    position: absolute;
    display: block;
    height: 4px;
    width: 92px;
    top: -2%;
    right: -88px;
  }
  .game-letters .draw .rope {
    display: block;
    position: absolute;
    border: 4px dotted;
    width: 50px;
    height: 50px;
    top: 17%;
    left: 38%;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }
  .game-letters .draw .rope::before {
    content: "";
    background-color: black;
    position: absolute;
    display: block;
    height: 9px;
    width: 4px;
    top: -31%;
    right: 48%;
  }
  .game-letters .draw .head {
    display: block;
    position: absolute;
    border: 3px solid;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    top: 20%;
    left: 39%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }
  .game-letters .draw .right-hand {
    display: block;
    background-color: black;
    position: absolute;
    height: 35px;
    width: 2px;
    top: 36%;
    right: 52%;
    transform: rotate(230deg);
    -webkit-transform: rotate(230deg);
    -moz-transform: rotate(230deg);
    -ms-transform: rotate(230deg);
    -o-transform: rotate(230deg);
  }
  .game-letters .draw .left-hand {
    display: block;
    background-color: black;
    position: absolute;
    height: 35px;
    width: 2px;
    top: 35%;
    right: 59%;
    transform: rotate(309deg);
    -webkit-transform: rotate(309deg);
    -moz-transform: rotate(309deg);
    -ms-transform: rotate(309deg);
    -o-transform: rotate(309deg);
  }
  .game-letters .draw .core {
    display: block;
    background-color: black;
    position: absolute;
    height: 70px;
    width: 3px;
    top: 40%;
    right: 55%;
  }
  .game-letters .draw .right-leg {
    display: block;
    background-color: black;
    position: absolute;
    height: 35px;
    width: 2px;
    top: 68%;
    right: 52%;
    transform: rotate(-45deg);
  }
  .game-letters .draw .left-leg {
    display: block;
    background-color: black;
    position: absolute;
    height: 35px;
    width: 2px;
    top: 68%;
    right: 58%;
    transform: rotate(45deg);
  }

  .game-letters .letters {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px 10px;
    max-width: 565px;
    margin: 0 auto;
  }
  .game-letters .letters span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 5px;
    background-color: var(--primary-clr-6);
    color: white;
    text-transform: capitalize;
    cursor: pointer;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }
  .game-letters .letters span.clicked {
    background-color: #222;
    opacity: 0.2;
    pointer-events: none;
  }
  .guess-letters {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .guess-letters span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 5px;
    background-color: var(--primary-clr-2);
    border-bottom: 1px solid #333;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    font-weight: 800;
    font-size: 1.2rem;
  }
  .guess-letters span.with-space {
    background: none;
    border-bottom: none;
    position: relative;
  }
  .guess-letters span.with-space::before {
    content: "";
    position: absolute;
    top: 50%;
    width: 15px;
    height: 2px;
    background-color: #222;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
  }
  .fail {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 65;
    background-color: var(--primary-clr-5);
    font-size: 1.6rem;
    color: #fff;
    width: 60%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
  }
  .success {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 65;
    background-color: var(--primary-clr-9);
    color: #fff;
    width: 60%;
    height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
  }
  .fail h3,
  .success h3 {
    letter-spacing: 2px;
    font-size: 1.6rem;
    @media (min-width: 768px) {
      letter-spacing: 5px;
    }
  }
  .fail div:first-of-type {
    font-size: 25px;
    margin: 10px;
  }
  .fail .answer {
    color: var(--primary-clr-10);
    font-size: 1rem;
  }
  .playAgain {
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #03a9f4;
    color: var(--primary-clr-10);
    margin-top: 10px;
    position: absolute;
    bottom: -19px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;
export default Hangman;
