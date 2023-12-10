import React, { useContext, useEffect, useState } from "react";
import useSound from "use-sound";
import trueSound from "../assets/sounds/notification-for-game-scenes-132473.mp3";
import falseSound from "../assets/sounds/error-2-126514.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faGhost,
  faDragon,
  faHeart,
  faChessKing,
  faChessQueen,
  faDice,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faAngular,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { AppContext } from "../reducers/context";

const Memory = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [isFailed, setIsFailed] = useState(false);
  // eslint-disable-next-line
  const [remain, setRemain] = useState(0);
  const [lives, setLives] = useState(0);
  const duration = 800;
  const { setScoreInLocalStorage } = useContext(AppContext);

  //sounds
  const [playSuccess] = useSound(trueSound);
  const [playFail] = useSound(falseSound);

  const changeOrder = () => {
    let blocks = Array.from(document.querySelectorAll(".block"));
    setRemain(blocks.length);
    let newOrder = Array.from({ length: blocks.length }, (_, index) => {
      return index;
    });
    shuffle(newOrder);
    blocks.forEach((e, index) => {
      e.style.order = newOrder[index];
      e.onclick = () => {
        flipped(e);
      };
    });

    setLives((lives) => {
      let newVal;
      if (difficulty === "hard") {
        newVal = 7;
      }
      if (difficulty === "normal") {
        newVal = 10;
      }
      if (difficulty === "easy") {
        newVal = 15;
      }
      return newVal;
    });
  };
  function shuffle(array) {
    let current = array.length,
      temp,
      random;
    while (current > 0) {
      random = Math.floor(Math.random() * current);
      current--;
      temp = array[current];
      array[current] = array[random];
      array[random] = temp;
    }

    return array;
  }

  function flipped(e) {
    e.classList.add("flipped");
    let flippedCards = Array.from(document.querySelectorAll(".flipped"));
    //add condition after flipping 2 cards only
    if (flippedCards.length === 2) {
      //matched cards
      if (flippedCards[0].dataset.name === flippedCards[1].dataset.name) {
        //add class (matched)
        flippedCards.forEach((e) => {
          e.classList.add("matched");
        });
        //     //playing sucess sound
        playSuccess();
        //change the count for (remain blocks)
        setRemain((remain) => {
          const newVal = remain - 2;
          //check if all blocks are matched
          if (newVal === 0) {
            setIsSucceed(true);
            setScoreInLocalStorage("memory", null, 1, 0);
          }
          return newVal;
        });
      } else {
        //play fail sound
        playFail();
        //change remaining lives
        setLives((lives) => {
          const newVal = lives - 1;
          if (newVal === 0) {
            setIsFailed(true);
            setScoreInLocalStorage("memory", null, 0, 1);
          }
          return newVal;
        });
      }
      //timeout to remove (flipped) from classlist
      flippedCards.forEach((e) => {
        setTimeout(() => {
          e.classList.remove("flipped");
        }, duration);
      });
    } else if (flippedCards.length > 2) {
      flippedCards.forEach((e) => {
        e.classList.remove("flipped");
      });
    }
  }
  const playAgain = () => {
    setIsStarted(false);
    setIsSucceed(false);
    setIsFailed(false);
  };
  useEffect(() => {
    changeOrder();
    // eslint-disable-next-line
  }, [isStarted]);
  return (
    <Wrapper>
      {!isStarted && (
        <div className="memory-overlay">
          <div className="level">
            <label htmlFor="difficulty"> difficulty :</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">easy</option>
              <option value="normal">normal</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <button onClick={() => setIsStarted(true)}>Start Game</button>
        </div>
      )}
      <div className="memory-container">
        {isStarted && (
          <>
            <div className="game-info">
              <div className="name">
                difficulty : <span>{difficulty}</span>
              </div>
              <div className="tries">
                lives: <span>{lives}</span>
              </div>
            </div>
            <div className="blocks-container">
              <div className="block " data-name="github">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
              </div>
              <div className="block " data-name="github">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
              </div>
              <div className="block " data-name="angular">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faAngular} />
                </div>
              </div>
              <div className="block " data-name="angular">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faAngular} />
                </div>
              </div>
              <div className="block " data-name="react">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faReact} />
                </div>
              </div>
              <div className="block " data-name="react">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faReact} />
                </div>
              </div>
              <div className="block " data-name="ghost">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faGhost} />
                </div>
              </div>
              <div className="block " data-name="ghost">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faGhost} />
                </div>
              </div>
              <div className="block " data-name="dragon">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faDragon} />
                </div>
              </div>
              <div className="block " data-name="dragon">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faDragon} />
                </div>
              </div>
              <div className="block " data-name="heart">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
              <div className="block " data-name="heart">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
              <div className="block " data-name="king">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faChessKing} />
                </div>
              </div>
              <div className="block " data-name="king">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faChessKing} />
                </div>
              </div>
              <div className="block " data-name="queen">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faChessQueen} />
                </div>
              </div>
              <div className="block " data-name="queen">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faChessQueen} />
                </div>
              </div>
              <div className="block " data-name="dice">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faDice} />
                </div>
              </div>
              <div className="block " data-name="dice">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faDice} />
                </div>
              </div>
              <div className="block " data-name="sheild">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
              </div>
              <div className="block " data-name="sheild">
                <div className="face front">
                  <FontAwesomeIcon icon={faQuestion} />
                </div>
                <div className="face back">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
              </div>
            </div>
          </>
        )}
        {isSucceed && (
          <div className="result">
            <div className="win">
              <div className="text">Congratulation</div>
              <button className="play-again" onClick={playAgain}>
                play again
              </button>
            </div>
          </div>
        )}
        {isFailed && (
          <div className="result">
            <div className="lose">
              <div className="text">game over</div>
              <button className="play-again" onClick={playAgain}>
                play again
              </button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .memory-overlay {
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
  .memory-overlay select {
    border: none;
    font-size: 1.2rem;
    text-transform: capitalize;
    padding: 3px 6px;
    margin: 20px 10px;
    border-radius: 5px;
  }
  .memory-overlay label {
    text-transform: capitalize;
    font-size: 1.5rem;
    color: white;
  }
  .memory-overlay button {
    background-color: var(--primary-clr-1);
    border: none;
    font-size: 1.5rem;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 12px;
    color: var(--primary-clr-10);
  }
  .memory-container {
    width: 100vw;
    margin-top: 60px;
    background-color: var(--primary-clr-1);
    min-height: var(--page-h);
  }
  .memory-container .game-info {
    display: flex;
    background-color: var(--primary-clr-6);
    color: white;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;

    @media (min-width: 768px) {
      max-width: 800px;
      margin: 0 auto;
      font-size: 1.3rem;
    }
    @media (min-width: 1200px) {
      max-width: 900px;
      margin: 0 auto;
      font-size: 1.3rem;
    }
  }

  .memory-container .blocks-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 100px);
    gap: 2px;
    margin: 50px auto;
    width: 97%;
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 100px);
      gap: 3px;
    }
  }

  .memory-container .blocks-container .block {
    background-color: rgba(0, 0, 0, 0.664);
    width: 1fr;
    height: 100px;
    transform-style: preserve-3d;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
  }
  .memory-container .blocks-container .block .face {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2196f3;
    width: 100%;
    height: 100%;
    cursor: pointer;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .memory-container .blocks-container .block .front {
    font-size: 90px;
  }
  .memory-container .blocks-container .block .back {
    font-size: 65px;
    background-color: white;
    transform: translateY(-100px) rotateY(180deg);
    -webkit-transform: translateY(-100px) rotateY(180deg);
    -moz-transform: translateY(-100px) rotateY(180deg);
    -ms-transform: translateY(-100px) rotateY(180deg);
    -o-transform: translateY(-100px) rotateY(180deg);
  }

  .memory-container .blocks-container .block.flipped {
    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -ms-transform: rotateY(-180deg);
    -o-transform: rotateY(-180deg);
  }
  .memory-container .blocks-container .block.matched {
    pointer-events: none;
    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -ms-transform: rotateY(-180deg);
    -o-transform: rotateY(-180deg);
  }
  .memory-container .blocks-container .block.matched .back {
    opacity: 0.7;
  }

  .memory-container .result {
    width: 100%;
    height: 99vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    font-weight: bold;
    text-transform: capitalize;
    border-radius: 5px;
    margin-top: 5px;
    background-color: #4a545c80;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .memory-container .result .win,
  .memory-container .result .lose {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    gap: 10px;
    @media (min-width: 768px) {
      justify-content: space-between;
      min-height: 45vh;
      margin-top: 10vh;
    }
  }
  .memory-container .result .lose {
  }
  .memory-container .result button {
    font-size: 1.3rem;
    color: white;
    font-weight: bold;
    margin-top: 25px;
    background-color: #2196f3;
    padding: 10px 20px;
    border-radius: 54px;
    box-shadow: 0 0 4px white;
    @media (min-width: 768px) {
      font-size: 2.3rem;
      cursor: pointer;
    }
  }
  .memory-container .result .correct {
    flex: 1;
  }
  .memory-container .result .remain {
    float: right;
  }

  .memory-container .result .win .text,
  .memory-container .result .lose .text {
    font-size: 2rem;
    color: white;
    font-weight: bold;
    background-color: #673ab7;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 0 1px white inset;
    text-align: center;
    @media (min-width: 768px) {
      font-size: 4rem;
      padding: 25px 50px;
    }
  }
  .memory-container .result .lose .text {
    background-color: #b73a3a;
  }
`;

export default Memory;
