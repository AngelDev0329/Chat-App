import {
  SideBar,
  Navbar,
  Logo,
  Wrapper,
  ProfileButton,
  ProfilePicture,
  ChatButton,
} from "./style";
import { DEFAULT_AVATAR, IMAGE_PROXY, useUserStore } from "../../library";
import { FiPlus } from "react-icons/fi";
export function Sidebar() {
  const currentUser = useUserStore((state) => state.currentUser);

  return (
    <SideBar>
      <Navbar>
        <Logo>Sabito</Logo>

        <Wrapper>
          <ChatButton aria-label="New conversation">
            <FiPlus style={{ fontSize: "1.1rem" }} />
          </ChatButton>
          <ProfileButton>
            <ProfilePicture
              className="h-8 w-8 cursor-pointer rounded-full object-cover"
              src={
                currentUser?.photoURL
                  ? IMAGE_PROXY(currentUser.photoURL)
                  : DEFAULT_AVATAR
              }
              alt=""
            />
          </ProfileButton>
        </Wrapper>
      </Navbar>
    </SideBar>
  );
}
