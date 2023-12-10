import { useContext, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { AppContext } from "../reducers/context";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa";
import { MdAutoFixHigh } from "react-icons/md";

const Results = () => {
  const { user, loginWithRedirect } = useAuth0();
  const { getScoresFromLocalStorage } = useContext(AppContext);
  // eslint-disable-next-line
  const [typeScore, setTypeScore] = useState(getScoresFromLocalStorage("type"));
  // eslint-disable-next-line
  const [memoryScore, setMemoryScore] = useState(
    getScoresFromLocalStorage("memory")
  );
  // eslint-disable-next-line
  const [hangmanScore, setHangmanScore] = useState(
    getScoresFromLocalStorage("hangman")
  );

  if (!user) {
    return (
      <Wrapper>
        <section className="section-page">
          <div className="no-user">
            <h2> you must sign in to see your scores</h2>
            <button className="btn" onClick={() => loginWithRedirect()}>
              sign in
            </button>
          </div>
        </section>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h2 className="score-header">statistics</h2>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Hangman" title="Hangman">
          {!hangmanScore ? (
            <section className="empty-result">
              {" "}
              <h4>you don`t have scores in that game</h4>
              <Link to="/hangman" className="btn">
                play now
              </Link>
            </section>
          ) : (
            <>
              <h4>
                <FaGamepad />
                played :<span> {hangmanScore.played}</span>
              </h4>
              <h4>
                <IoCheckmarkCircle />
                wins :<span> {hangmanScore.wins}</span>
              </h4>
              <h4>
                <IoCloseCircle />
                loses :<span> {hangmanScore.loses}</span>
              </h4>{" "}
            </>
          )}
        </Tab>
        <Tab eventKey="Memory Blocks" title="Memory Blocks">
          {!memoryScore ? (
            <section className="empty-result">
              {" "}
              <h4>you don`t have scores in that game</h4>
              <Link to="/memory" className="btn">
                play now
              </Link>
            </section>
          ) : (
            <>
              <h4>
                <FaGamepad />
                played :<span> {memoryScore.played}</span>
              </h4>
              <h4>
                <IoCheckmarkCircle />
                wins :<span> {memoryScore.wins}</span>
              </h4>
              <h4>
                <IoCloseCircle />
                loses :<span> {memoryScore.loses}</span>
              </h4>{" "}
            </>
          )}
        </Tab>
        <Tab eventKey="Type Speed" title="Type Speed">
          {!typeScore ? (
            <section className="empty-result">
              {" "}
              <h4>you don`t have scores in that game</h4>
              <Link to="/typeSpeed" className="btn">
                play now
              </Link>
            </section>
          ) : (
            <>
              <h4>
                <FaGamepad />
                played :<span> {typeScore.played}</span>
              </h4>
              <h4>
                <IoCheckmarkCircle />
                wins :<span> {typeScore.wins}</span>
              </h4>
              <h4>
                <IoCloseCircle />
                loses :<span> {typeScore.loses}</span>
              </h4>{" "}
              <h4>
                <MdAutoFixHigh />
                high score :<span> {typeScore.score}</span>
              </h4>
            </>
          )}
        </Tab>
      </Tabs>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 60px;
  min-height: var(--page-h);
  padding: 20px 10px;
  .section-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--page-h);
    .no-user {
      margin: 0 auto;
      width: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  h4 {
    font-size: 1.2rem;
    text-transform: capitalize;
    margin-bottom: 1.3rem;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
    svg {
      color: var(--primary-clr-6);
      margin-right: 1rem;
      font-size: 2.3rem;
    }
  }
  .nav-tabs {
    --bs-nav-tabs-border-width: 4px;
    justify-content: center;
  }
  .nav-link {
    font-size: 0.9rem;
    color: var(--primary-clr-10);
    @media (min-width: 500px) {
      font-size: 1.2rem;
    }
  }
  .nav-link.active {
    background-color: var(--primary-clr-6);
    border: var(--primary-clr-6);
    color: #fff;
  }
  .empty-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 30vh;
  }
  h2 {
    font-size: 2rem;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .score-header {
    position: relative;
    width: fit-content;
    margin: 0px auto 2rem;
  }
  .score-header::before {
    content: "";
    position: absolute;
    height: 3px;
    width: 100%;
    bottom: -7px;
    background-color: var(--primary-clr-4);
  }
  .btn {
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
  .btn:hover {
    background-color: var(--primary-clr-6);
    color: #fff;
  }
`;
export default Results;
