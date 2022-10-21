import {
  SideBar,
  Navbar,
  Wrapper,
  ProfileButton,
  ProfilePicture,
  ChatButton,
  PrimaryContainer,
  SecondaryContainer,
  ShowProfileButton,
  SignOutButton,
} from "./style";
import {
  DEFAULT_AVATAR,
  firebaseAuth,
  IMAGE_PROXY,
  useUserStore,
} from "../../library";
import { FiLogOut, FiPlus, FiUser } from "react-icons/fi";
import { useState } from "react";
import { Modal, Profile } from ".";
import { Link } from "react-router-dom";
import { Menu } from "@mui/material";
import { signOut } from "firebase/auth";
export function Sidebar() {
  const currentUser = useUserStore((state) => state.currentUser);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <PrimaryContainer>
            <ChatButton aria-label="New conversation">
              <FiPlus style={{ fontSize: "1.1rem" }} />
            </ChatButton>
            <Modal />
          </PrimaryContainer>
          <SecondaryContainer>
            <ProfileButton
              aria-controls={open ? "unauthenticated nav menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <ProfilePicture
                src={
                  currentUser?.photoURL
                    ? IMAGE_PROXY(currentUser.photoURL)
                    : DEFAULT_AVATAR
                }
                alt=""
              />
            </ProfileButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <ShowProfileButton onClick={() => setIsProfileOpen(true)}>
                <FiUser style={{ marginRight: "5px", fontSize: "1.3rem" }} />{" "}
                Profile
              </ShowProfileButton>

              <SignOutButton onClick={() => signOut(firebaseAuth)}>
                <FiLogOut style={{ marginRight: "5px", fontSize: "1.2rem" }} />{" "}
                Sign out
              </SignOutButton>
            </Menu>
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
