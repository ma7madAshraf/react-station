import mLogo from "../assets/mlogo.png";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper className="footer">
      <div className="left">
        Designed by
        <img alt="logo" src={mLogo} />
      </div>
      <div className="right">
        copyright
        <span className="year">&copy;{new Date().getFullYear()}</span>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 26px;
  width: 100%;
  position: fixed;
  overflow: hidden;
  background-color: var(--primary-clr-10);
  bottom: 0;
  display: flex;
  justify-content: space-between;
  z-index: 99;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  .left {
    padding: 0px 5px;
    width: 50%;
    display: flex;
    align-items: center;
    text-align: left;
    @media (min-width: 786px) {
      padding: 0px 15px;
    }
    img {
      width: 68px;
      @media (min-width: 786px) {
        width: 85px;
      }
    }
  }
  .right {
    padding: 0px 15px;
    text-align: right;
    display: flex;
    align-items: center;
    .year {
      text-align: center;
      color: #009688;
      font-weight: 800;
      margin-left: 5px;
    }
  }
`;

export default Footer;
