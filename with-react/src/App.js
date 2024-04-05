import "./Styles.css";
import QuizBlock from "./components/QuizBlock";
import StartBlock from "./components/StartBlock";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
`;

function App() {

  const [isStarted, setStarted] = useState(false);

  return (
    <Container>
      {
        !isStarted ?
          <StartBlock handleStart={setStarted}/> :
          <QuizBlock />
      }

    </Container>
  );
}

export default App;
