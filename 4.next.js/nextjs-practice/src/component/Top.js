import { Header } from "semantic-ui-react";
import Gnb from "./Gnb";

export default function Top() {
  return (
    <div>
      <div style={{ display: "flex", paddingTop: 20 }}>
        <div style={{ flex: "100px 0 0" }}>
          <img
            src="/images/profile.jpg"
            alt="logo"
            style={{ display: "block", width: 80, borderRadius: "50%" }}
          />
        </div>
        <Header as="h1">SilverSLA</Header>
      </div>
      <Gnb />
    </div>
  );
}
