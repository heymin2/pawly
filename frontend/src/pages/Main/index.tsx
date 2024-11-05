/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  container,
  BtnContainer,
  HamBtnCss,
  userBtnCss,
  slidePanelStyle,
  panelContentStyle,
} from "./styles";
import { Hamberger } from "../Hamberger";
import NavButton from "../../assets/icons/NavButton.png";
import { logout } from "@/apis/userService";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigateTo = useNavigate();
  const [mypageVisible, setMyPageVisible] = useState(false);

  const userBtn = () => {
    console.log("유저페이지 클릭");
  };

  const Hambtn = () => {
    console.log("햄버거 클릭");
    setMyPageVisible(true); // 슬라이딩 패널을 보이게
  };

  const closeMyPage = () => {
    setMyPageVisible(false); // 슬라이딩 패널 숨기기
  };

  const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem("accessToken");
    navigateTo("/login");
  };
  return (
    <div css={container}>
      <button onClick={handleLogout}>로그아웃</button>
      <div css={BtnContainer}>
        <button css={userBtnCss} onClick={userBtn}>
          <img
            src="https://unpkg.com/pixelarticons@1.8.1/svg/user.svg"
            alt="~~~"
            width="30"
            height="30"
          />
        </button>

        <button css={HamBtnCss} onClick={Hambtn}>
          <img src={NavButton} alt="Cancel Button" width={40} />
        </button>
      </div>

      {/* 슬라이딩 패널 */}
      <div
        css={[slidePanelStyle, mypageVisible && { transform: "translateX(0)" }]}
      >
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>
    </div>
  );
};
