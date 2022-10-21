import {
  SideBar,
  Navbar,
  Wrapper,
  ProfileButton,
  ProfilePicture,
  ChatButton,
  SecondaryContainer,
} from "./style";
import { DEFAULT_AVATAR, IMAGE_PROXY, useUserStore } from "../../library";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { Profile } from ".";
import { Link } from "react-router-dom";
export function Sidebar() {
  const currentUser = useUserStore((state) => state.currentUser);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <SideBar>
      <Navbar>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "calc(20 / 16 * 1rem",
            fontWeight: 500,
            color: "#24292f",
          }}
        >
          Sabito
        </Link>

        <Wrapper>
          <ChatButton aria-label="New conversation">
            <FiPlus style={{ fontSize: "1.1rem" }} />
          </ChatButton>
          <SecondaryContainer>
            <ProfileButton onClick={() => setIsProfileOpen(true)}>
              <ProfilePicture
                src={
                  currentUser?.photoURL
                    ? IMAGE_PROXY(currentUser.photoURL)
                    : DEFAULT_AVATAR
                }
                alt=""
              />
            </ProfileButton>
            <Profile
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
            />
          </SecondaryContainer>
        </Wrapper>
      </Navbar>
    </SideBar>
  );
}
