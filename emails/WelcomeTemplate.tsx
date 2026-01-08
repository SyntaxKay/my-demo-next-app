import {
  Html,
  Body,
  Link,
  Preview,
  Text,
  Container,
  Tailwind,
} from "@react-email/components";
import { CSSProperties } from "react";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome A board!!</Preview>
      <Tailwind>
        <Body style={body} className="font-serif text-center">
          <Container>
            <Text style={h1} className="text-orange-700">Hello {name}</Text>
            <Link href="https://www.google.com">Go to website</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const body: CSSProperties = {
  backgroundColor: "#f6f6f6",
};

const h1: CSSProperties = {
  fontSize: "49px",
};

export default WelcomeTemplate;
