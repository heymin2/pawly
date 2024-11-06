/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { PostIt } from "@/components/PostIt";
import { backButton, container, plusButton, ListContainer } from "./styles";
import PlusButton from "@/assets/icons/PlusButton.png";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";
import backButtonImg from "@/assets/images/back_button.png";
import PostItForm from "@/components/PostItForm";
import  useFetchSingleRollingpaper  from "@/hooks/useFetchSingleRollingpaper";
import { useParams } from "react-router-dom";
import useUserInfoStore from "@/stores/userInfoStore";
import { IPostIt } from "@/types/rollingPaperTypes";
// 특정 하나의 롤링 페이퍼만 볼 수 있는 페이지
export const RollingPaper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { rollingpaperid } = useParams();
  const navigate = useNavigate();
  const { singleRollingpaper } = useFetchSingleRollingpaper( rollingpaperid!, 0, 10);

  const { nickname } = useUserInfoStore();
  const defaultData = {
    // 미리보기라서 적당히 포스트잇 id 없음
    // 얘 둘은 가변으로 받아오기
    // memberId: Number(signUpState),?
    memberNickname: nickname,

    // 아래애들은 기본 셋팅 값들
    content: "",
    backgroundColor: 0,
    image: "",
    fontColor: 0,
    borderColor: 0,
    speechBubbleSize: 1,
  };

  return (
    <div css={container}>
      <button css={backButton} onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="" />
      </button>

      <div id="title">
        <h2>{singleRollingpaper?.rollingPaperTitle}</h2>
      </div>
      <div css={ListContainer}>
        {/* 무한스크롤 페이지네이션 고려하기 */}
        {singleRollingpaper &&
          singleRollingpaper.content.map((postit:IPostIt, index:number) => (
            <PostIt key={index} props={postit} isPreview={false} />
          ))}
      </div>
      <button
        css={plusButton}
        type="button"
        className="nes-btn"
        onClick={() => setIsOpen(true)}
      >
        <img src={PlusButton} alt="" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="포스트잇 생성"
      >
        {/* 포스트잇 생성 폼 */}
        <PostItForm
          props={defaultData}
          onClose={() => setIsOpen(false)}
          isCreate={true}
          rollingPaperId={rollingpaperid}
        />
      </Modal>
    </div>
  );
};
