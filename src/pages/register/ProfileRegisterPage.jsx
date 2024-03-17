import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DropdownMBTI from "../../components/register/DropdownMBTI";
import AnimalSelector from "../../components/register/AnimalSelector";
import BlankModal from "../../components/common/BlankModal";
import Button from "../../components/common/Button";
import { ATTRACTIVENESS, HOBBY } from "../../constants/profile";

const ProfileRegisterPage = () => {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedMBTI, setSelectedMBTI] = useState("");
  const [attractiveness, setAttractiveness] = useState([]);
  const [hobby, setHobby] = useState([]);

  const attractivenessModalRef = useRef();
  const hobbyModalRef = useRef();

  const openAttractivenessModal = () => {
    attractivenessModalRef.current.open();
  };

  const closeAttractivenessModal = () => {
    attractivenessModalRef.current.close();
  };

  const openHobbyModal = () => {
    hobbyModalRef.current.open();
  };

  const closeHobbyModal = () => {
    hobbyModalRef.current.close();
  };

  const handleClickAttractiveness = (e) => {
    setAttractiveness((prev) => {
      return prev.filter((value) => value !== e.target.innerText);
    });
  };

  const handleClickHobby = (e) => {
    setHobby((prev) => {
      return prev.filter((value) => value !== e.target.innerText);
    });
  };

  const handleAnimalClick = (e) => {
    setSelectedAnimal(e.target.value);
  };

  useEffect(() => {
    console.log(selectedMBTI);
    console.log(selectedAnimal);
  }, [selectedAnimal, selectedMBTI]);

  useEffect(() => {
    console.log(attractiveness);
    console.log(hobby);
  }, [attractiveness, hobby]);

  return (
    <div>
      <WrapContent>
        <h2>프로필을 등록해주세요</h2>
      </WrapContent>
      <AnimalSelector
        label="캐릭터 선택하기"
        clickHandler={handleAnimalClick}
      />

      <WrapContent>
        <div>
          <Label>MBTI 선택하기</Label>
          <DropdownMBTI setState={setSelectedMBTI} />
        </div>

        <div>
          <Label>해시태그 선택하기</Label>
          <div
            style={{ color: "#90949B", fontSize: "12px", fontWeight: "600" }}>
            최소 3개, 최대 3개까지 고를 수 있어요!
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>저는 이런 매력이 있어요!</div>
            <button onClick={openAttractivenessModal}>+ 추가하기</button>
          </div>
          <BadgeContainer>
            {attractiveness.map((value, index) => (
              <Badge key={index} onClick={handleClickAttractiveness}>
                {value}
              </Badge>
            ))}
          </BadgeContainer>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>저는 이런 취미가 있어요!</div>
            <button onClick={openHobbyModal}>+ 추가하기</button>
          </div>
          <BadgeContainer>
            {hobby.map((value, index) => (
              <Badge key={index} onClick={handleClickHobby}>
                {value}
              </Badge>
            ))}
          </BadgeContainer>

          <BlankModal ref={attractivenessModalRef}>
            <ModalTitle>
              <div>본인의 매력을 선택해주세요.</div>
              <img
                src="/assets/cancel-button.png"
                alt="닫기 버튼"
                onClick={closeAttractivenessModal}
              />
            </ModalTitle>
            <ListContainer>
              {ATTRACTIVENESS.map((value, index) => (
                <ListItem
                  key={index}
                  color={attractiveness.includes(value)}
                  onClick={() => {
                    if (attractiveness.includes(value)) return;
                    setAttractiveness([...attractiveness, value]);
                    closeAttractivenessModal();
                  }}>
                  {value}
                </ListItem>
              ))}
            </ListContainer>
          </BlankModal>

          <BlankModal ref={hobbyModalRef}>
            <ModalTitle>
              <div>본인의 취미을 선택해주세요.</div>
              <img
                src="/assets/cancel-button.png"
                alt="닫기 버튼"
                onClick={closeHobbyModal}
              />
            </ModalTitle>
            <ListContainer>
              {HOBBY.map((value, index) => (
                <ListItem
                  key={index}
                  color={hobby.includes(value)}
                  onClick={() => {
                    if (hobby.includes(value)) return;
                    setHobby([...hobby, value]);
                    closeHobbyModal();
                  }}>
                  {value}
                </ListItem>
              ))}
            </ListContainer>
          </BlankModal>
        </div>
        <Button size="large">시작하기</Button>
      </WrapContent>
    </div>
  );
};

const Badge = styled.div`
  background-color: #ff625d;
  padding: 0.5rem 1rem;
  color: #ffffff;
  border-radius: 12px;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const WrapContent = styled.div`
  display: grid;
  gap: 2rem;
  padding: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  background-color: #ff625d;
  justify-content: space-between;
  gap: 3rem;
  padding: 0.75rem 1.25rem;
  color: white;
`;

const ListContainer = styled.div`
  max-height: 256px;
  overflow: auto;
`;

const ListItem = styled.div`
  color: ${(props) => (props.color ? "#FF0000" : "black")};
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #e0e0e0;
`;

export default ProfileRegisterPage;
