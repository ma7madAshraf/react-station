import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "./typeData";
import { AppContext } from "../reducers/context";
import useSound from "use-sound";
import trueSound from "../assets/sounds/notification-for-game-scenes-132473.mp3";
import falseSound from "../assets/sounds/ouch-116112.mp3";

const TypeSpeed = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  // eslint-disable-next-line
  const [words, setWords] = useState([]);
  const [remainingWords, setRemainingWords] = useState([]);
  const [theWord, setTheWord] = useState("");
  const [timer, setTimer] = useState(1);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const theAnswer = useRef(null);

  //sounds
  const [playSuccess] = useSound(trueSound);
  const [playFail] = useSound(falseSound);

  const { setScoreInLocalStorage } = useContext(AppContext);
  const generateWords = () => {
    // get random word from the array
    const chosenWord =
      remainingWords[Math.floor(Math.random() * remainingWords.length)];
    //show it in the game
    setTheWord(chosenWord);
    //remove it from the array

    remainingWords.splice(remainingWords.indexOf(chosenWord), 1);

    checkWord(chosenWord);
  };
  // check if the word correct or not
  const checkWord = (chosenWord) => {
    //add 3 more seconds for the first one only
    if (remainingWords.length === 9) {
      setTimer(5);
    } else {
      setTimer(3);
    }
    const count = setInterval(() => {
      setTimer((timer) => {
        const newVal = timer - 1;
        if (newVal < 0) {
          clearInterval(count);
          if (
            chosenWord.toLowerCase() === theAnswer.current.value.toLowerCase()
          ) {
            //add to score and ply the success sound then clear the input
            setScore((score) => {
              const newScore = score + 1;
              return newScore;
            });
            // correctSound.play();
            playSuccess();
            theAnswer.current.value = "";
          } else {
            playFail();
            theAnswer.current.value = "";
          }
          //check if the array is finished or not
          if (remainingWords.length > 0) {
            generateWords();
          } else {
            setIsFinished(true);
            setScore((score) => {
              if (score < 5) {
                setScoreInLocalStorage("type", score, 0, 1);
              } else {
                setScoreInLocalStorage("type", score, 1, 0);
              }
              return score;
            });
          }
        }
        return newVal;
      });
    }, 1000);
  };
  const checkScore = () => {
    score > 7
      ? setResult("perfect")
      : score > 4
      ? setResult("good")
      : setResult("bad");
  };

  const playAgain = () => {
    setScore(0);
    setIsStarted(false);
    setIsFinished(false);
    setDifficulty("easy");
    setWords((words) => {
      let val = data[difficulty];
      setRemainingWords(val);
      return val;
    });
  };
  useEffect(
    () => checkScore(),
    // eslint-disable-next-line
    [score]
  );
  useEffect(() => {
    setWords((words) => {
      let val = data[difficulty];
      setRemainingWords([...val]);
      return val;
    });

    // eslint-disable-next-line
  }, [difficulty, isFinished]);

  return (
    <Wrapper>
      {!isStarted && (
        <div className="overlay">
          <div className="startup">
            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
              }}
            >
              <option value="easy">Easy</option>
              <option value="normal">normal</option>
              <option value="hard">hard</option>
            </select>
            <button
              id="startGame"
              onClick={() => {
                setIsStarted(true);
                generateWords();
              }}
            >
              Start Game
            </button>
          </div>
        </div>
      )}
      <div className="game-info">
        <div className="level">
          <span>{difficulty}</span>
        </div>
        <div className="game-name">
          <h2>Typing Speed</h2>
        </div>
        <div className="score">
          Score: <span>{score}</span>
        </div>
      </div>
      {isStarted && (
        <>
          <div className="game">
            <div
              className="the-word"
              onClick={() => console.log(theAnswer.current.value)}
            >
              <h2>{theWord}</h2>
            </div>
            <div className="input">
              <input id="answer" type="text" ref={theAnswer} autoFocus />
            </div>
            <div className="timer">
              <span>{timer}</span> secs
            </div>
          </div>
          <div className="upcoming-words">
            {remainingWords.map((word) => {
              return <span key={word}>{word}</span>;
            })}
          </div>
        </>
      )}
      {isFinished && (
        <div className="finish ">
          <div className={`result ${result}`}>
            <div className="user"></div>
            <h3>{result}</h3>
            <div className="score">
              Score: <span>{score}</span>
            </div>
            <button className="playAgain" onClick={playAgain}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 86px);
  margin: 60px auto 0;
  position: relative;
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(16, 11, 98);
    background: radial-gradient(
      circle,
      rgba(16, 11, 98, 1) 0%,
      rgba(16, 186, 208, 1) 92%,
      rgba(0, 212, 255, 1) 100%
    );
    z-index: 25;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .overlay.hide {
    display: none;
  }
  .startup {
    position: absolute;
    width: 90%;
    height: 50%;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .startup select {
    border: none;
    font-size: 1.2rem;
    text-transform: capitalize;
    padding: 3px 6px;
    margin: 20px 10px;
    border-radius: 5px;
  }
  .startup button {
    background-color: var(--primary-clr-1);
    border: none;
    font-size: 1.5rem;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 12px;
    color: var(--primary-clr-10);
  }

  .game-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: var(--primary-clr-6);
    color: white;
    padding: 10px;
    align-items: center;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    @media (min-width: 768px) {
      max-width: 650px;
      margin: 0 auto;
    }
  }
  .game-info .score span,
  .game-info .level span {
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: capitalize;
  }
  .game-info .game-name {
    ont-size: 1.2rem;
    background-color: var(--primary-clr-5);
    padding: 5px 10px;
    border-radius: 10px;
    font-weight: 600;
  }

  .game .the-word {
    font-size: 55px;
    text-align: center;
    padding: 20px 0;
    color: var(--primary-clr-10);
    user-select: none;
  }
  .game input {
    width: 100%;
    height: 50px;
    border-radius: 12px;
    caret-color: var(--lazuli);
    text-align: center;
    font-size: 27px;
    border-color: var(--lazuli);
    box-shadow: 0 0 5px inset;
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    -ms-border-radius: 12px;
    -o-border-radius: 12px;
    @media (min-width: 768px) {
      max-width: 650px;
      margin: 0 auto;
      display: block;
    }
  }
  .game .timer {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    flex-direction: column;
    width: 80px;
    height: 80px;
    background-color: var(--primary-clr-5);
    color: white;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
  }
  .game .timer span {
    font-size: 30px;
  }
  .upcoming-words {
    position: relative;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    border: 2px solid var(--primary-clr-5);
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    @media (min-width: 768px) {
      max-width: 650px;
      margin: 0 auto;
    }
  }
  .upcoming-words::before {
    content: "upcoming words";
    position: absolute;
    background-color: var(--primary-clr-5);
    color: white;
    font-size: 22px;
    border-radius: 12px;
    padding: 5px;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .upcoming-words span {
    background-color: var(--primary-clr-3);
    padding: 5px 10px;
    border-radius: 12px;
    margin: 10px 5px;
  }
  .finish {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background: white;
  }
  .finish .result {
    position: absolute;
    width: 90%;
    max-width: 900px;
    height: 35%;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--primary-clr-2);
    box-shadow: 0 0 10px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    text-align: center;
    @media (min-width: 768px) {
      height: 50%;
    }
  }
  .finish .user {
    color: var(--lazuli);
    font-size: 30px;
    text-transform: capitalize;
    font-weight: bold;
    font-variant: petite-caps;
    font-family: cursive;
    position: relative;
  }
  .finish h3 {
    font-size: 70px;
    margin: 15px 0 0px;
    letter-spacing: 3.5px;
    text-transform: capitalize;
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 6rem;
      margin: 15px 0 20px;
    }
  }
  .finish .perfect h3 {
    color: var(--primary-clr-7);
  }
  .finish .good h3 {
    color: #673ab7;
  }
  .finish .bad h3 {
    color: #dc3545;
  }
  .finish .result .score {
    font-size: 2rem;
    margin-top: 10px;
    letter-spacing: 1px;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }
  .finish .score span {
    color: var(--lazuli);
    font-weight: bold;
  }
  .playAgain {
    position: absolute;
    bottom: -26px px;
    padding: 8px 16px;
    font-size: 1.5rem;
    background-color: var(--primary-clr-8);
    color: var(--primary-clr-1);
    border: none;
    cursor: pointer;
    border-radius: 35px;
    margin-top: 40px;
    box-shadow: 0px 0px 10px black;
    left: 50%;
    transform: translateX(-50%);
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }
  .finish .results {
    width: 90%;
    background: var(--platanium);
    position: absolute;
    top: 450px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid var(--lazuli);
    border-radius: 5px;
    padding: 10px;
    position: relative;
    padding-top: 25px;
  }
  .finish .results::before {
    content: "Scores";
    position: absolute;
    background-color: var(--lazuli);
    color: white;
    font-size: 22px;
    border-radius: 12px;
    padding: 5px;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .finish .results div {
    display: grid;
    grid-template-columns: 30% 30% 30% 10%;
    align-items: center;
    padding: 0 5px;
  }
  .finish .results div:not(:last-of-type) {
    border-bottom: 1px solid var(--lazuli);
    margin-bottom: 5px;
  }
`;

export default TypeSpeed;
