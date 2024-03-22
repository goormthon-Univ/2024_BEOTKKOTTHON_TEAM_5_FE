import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import { authInstance } from "../../api/instance";
import { useNavigate } from "react-router-dom";

const ChatInboxPage = () => {
  const [inboxList, setInboxList] = useState([]);
  const navigate = useNavigate();

  const fetchInboxList = async () => {
    const res = await authInstance.get("/waiting").then((res) => res.data);
    setInboxList(res);
  };

  const handleAcceptChat = async (
    myMemberId,
    opponentMemberId,
    chatWaitingId
  ) => {
    await authInstance
      .get(`/waiting/accept/${chatWaitingId}`)
      .then((res) => {
        const createdChatRoom = res.data;
        navigate(`/chat/${createdChatRoom}`, {
          state: {
            myId: myMemberId,
            opponentId: opponentMemberId,
            roomId: createdChatRoom,
          },
        });
      })
      .catch((error) => {
        switch (error.response.data.code) {
          case "TOO_MANY_MY_CHATROOM":
            alert(
              "이미 생성된 채팅방 3개입니다. 기존 채팅방을 지우고 다시 시도해주세요."
            );
            break;
          case "TOO_MANY_OPPONENT_CHATROOM":
            alert(
              "상대방이 이미 생성된 채팅방 3개입니다. 상대방과 연결에 실패했습니다."
            );
            break;
          default:
            alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
            break;
        }
      });

    fetchInboxList(); // 새로고침
  };

  useEffect(() => {
    fetchInboxList();
  }, []);

  return (
    <PagePadding>
      <Header />
      <Spacer>
        <Title>요청함</Title>
        {inboxList.length !== 0 ? (
          inboxList.map((inbox) => {
            return (
              <InboxContainer key={inbox.waitindRoomId}>
                <ImageContainer>
                  <img src="/assets/home/profile-bear.png" alt="캐릭터" />
                </ImageContainer>

                <div className="right-section">
                  <div className="upper-area">
                    <Profile>{inbox.myRoomName}</Profile>
                    <LeaveButton
                      onClick={() => {
                        const isAccepted =
                          window.confirm("대화를 수락하시겠습니까?");
                        if (isAccepted) {
                          handleAcceptChat(
                            inbox.loveReceiverId,
                            inbox.loveSenderId,
                            inbox.waitingRoomId
                          );
                        }
                      }}>
                      수락하기
                    </LeaveButton>
                  </div>
                  <Message>
                    '수락하기'를 누르면 대화를 시작할 수 있어요!
                  </Message>
                </div>
              </InboxContainer>
            );
          })
        ) : (
          <div>받은 요청이 없어요!</div>
        )}
      </Spacer>
    </PagePadding>
  );
};

export default ChatInboxPage;

const PagePadding = styled.div`
  padding: 2rem 1.5rem;
`;

const InboxContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  > .right-section {
    display: grid;
    flex: 1;
    gap: 0.5rem;

    > .upper-area {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Spacer = styled.div`
  display: grid;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 9999px;
  box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.66);

  > img {
    position: absolute;
    width: 70%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Profile = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Message = styled.div`
  color: #ff625d;
  font-size: 0.75rem;
`;

const LeaveButton = styled.button`
  background-color: #ffac0b;
  border: none;
  border-radius: 9999px;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 8px;
`;
