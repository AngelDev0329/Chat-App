import { Dialog } from "@mui/material";
import { FiX } from "react-icons/fi";
import {
  Title,
  CloseButton,
  Container,
  Wrapper,
  Text,
  Thick,
  Image,
  Info,
} from "./style";
import { DEFAULT_AVATAR, IMAGE_PROXY, useUserStore } from "../../../library";
type ProfileProps = {
  isProfileOpen: boolean;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Profile({ isProfileOpen, setIsProfileOpen }: ProfileProps) {
  const currentUser = useUserStore((state) => state.currentUser);

  const handleClose = () => {
    setIsProfileOpen(false);
  };
  return (
    <Dialog onClose={handleClose} open={isProfileOpen}>
      <Title tabIndex={0}>Your Profile</Title>
      <Container>
        <Image
          src={
            currentUser?.photoURL
              ? IMAGE_PROXY(currentUser.photoURL)
              : DEFAULT_AVATAR
          }
          alt=""
        />

        <Wrapper>
          <Text tabIndex={0}>
            <Thick>ID:</Thick>
            {currentUser?.uid}
          </Text>
          <Text tabIndex={0}>
            <Thick>Email:</Thick> {currentUser?.email}
          </Text>
          <Text tabIndex={0}>
            <Thick>Phone Number:</Thick>{" "}
            {currentUser?.phoneNumber ? currentUser?.phoneNumber : "None"}
          </Text>
        </Wrapper>
      </Container>
      <CloseButton onClick={handleClose}>
        <FiX />
      </CloseButton>

      <Info tabIndex={0}>
        Change your google avatar or username to update it here
      </Info>
    </Dialog>
  );
}
