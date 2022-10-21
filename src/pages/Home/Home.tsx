import { Sidebar } from "../../components";
import { Wrapper, HomeWrapper } from "./style";

export function Home() {
  return (
    <Wrapper>
      <Sidebar />
      <HomeWrapper>
        <img
          src="/public/cat.png"
          style={{ width: "100px", marginBottom: "20px" }}
        />
        <p className="text-center">Select a conversation to start chatting</p>
      </HomeWrapper>
    </Wrapper>
  );
}
