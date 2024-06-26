import React from 'react'
import styled from "styled-components";
import { useState } from 'react';

const Container = styled.div`
`;

const QuestionsBlock = styled.div`
`;
const ResultBlock = styled.div`
    padding-top: 200px;
`
const QuizBlock = () => {

    const [numOfQuestion, setNumOfQuestion] = useState(0);
    const [answers, setAnswers] = useState(new Array(questions.length));
    const [choose, setChoose] = useState(null);
    const [isFinished, setFinished] = useState(false);
    const [result, setResult] = useState(null);

    const handlePrev = () => {
        if (numOfQuestion > 0) {
            setChoose(answers[numOfQuestion - 1]);
            setNumOfQuestion(numOfQuestion - 1);
        }
    }

    const handleNext = () => {

        if (numOfQuestion < questions.length && choose != null) {

            answers[numOfQuestion] = choose;
            setAnswers(answers);
            console.log(answers);
            setChoose(answers[numOfQuestion + 1]);
            setNumOfQuestion(numOfQuestion + 1);
            if (numOfQuestion === questions.length - 1) {
                setFinished(true);
                setResult(calculateMBTI(answers))
            }
        } else if (choose == null) {
            alert("Выберите ответ");
        }

    }


    return (
        <Container>
            {
                !isFinished ?
                    <QuestionsBlock id="quiz-container">
                        <div id="question">{questions[numOfQuestion]}</div>
                        <div>
                            <input type="radio" id="yes" name="answer" value="Yes"
                                onChange={() => { setChoose("Yes") }}
                                checked={choose === "Yes" ? true : false}
                            />
                            <label for="yes">Yes</label>
                            <input type="radio" id="no" name="answer" value="No"
                                onChange={() => { setChoose("No") }}
                                checked={choose === "No" ? true : false}

                            />
                            <label for="no">No</label>
                        </div>
                        {numOfQuestion === 0 ? "" : <button id="prev-btn" class="button-prev" onClick={handlePrev}>Previous</button>}

                        <button id="next-btn" class="button-next" onClick={handleNext}>{numOfQuestion === questions.length-1 ? "Show res" : "Next"}</button>
                        <div id="progress-bar"></div>
                    </QuestionsBlock>
                    : <ResultBlock id="result-container">
                        <div id="result">Your result is {result} </div>
                    </ResultBlock>
            }


        </Container>
    )
}

export default QuizBlock;

function calculateMBTI(answers) {
    let result = '';

    // Introversion/Extraversion
    let IE_count = 0;
    if (answers[0] == 'Yes') IE_count++;
    if (answers[6] == 'Yes') IE_count++;
    if (answers[12] == 'No') IE_count++;
    if (answers[14] == 'Yes') IE_count++;
    if (answers[18] == 'No') IE_count++;
    result += (IE_count >= 3) ? 'E' : 'I';

    // Sensing/Intuition
    let SN_count = 0;
    if (answers[4] == 'Yes') SN_count++;
    if (answers[9] == 'Yes') SN_count++;
    if (answers[13] == 'Yes') SN_count++;
    if (answers[17] == 'No') SN_count++;
    if (answers[19] == 'Yes') SN_count++;
    result += (SN_count >= 3) ? 'N' : 'S';

    // Thinking/Feeling
    let TF_count = 0;
    if (answers[2] == 'Yes') TF_count++;
    if (answers[3] == 'Yes') TF_count++;
    if (answers[8] == 'Yes') TF_count++;
    if (answers[10] == 'Yes') TF_count++;
    if (answers[15] == 'No') TF_count++;
    result += (TF_count >= 3) ? 'F' : 'T';

    // Judging/Perceiving
    let JP_count = 0;
    if (answers[1] == 'No') JP_count++;
    if (answers[5] == 'No') JP_count++;
    if (answers[7] == 'No') JP_count++;
    if (answers[11] == 'Yes') JP_count++;
    if (answers[16] == 'No') JP_count++;
    result += (JP_count >= 3) ? 'P' : 'J';

    return result;
}

const questions = [
    "You regularly make new friends.",
    "You prefer to do your chores before allowing yourself to relax.",
    "When making decisions, you focus more on how the affected people might feel than on what is most logical or efficient.",
    // "You are willing to bend the truth to make someone feel better.",
    // "You enjoy experimenting with new and untested approaches.",
    // "You like to use organizing tools like schedules and lists.",
    // "You enjoy participating in team-based activities.",
    // "Your living and working spaces are clean and organized.",
    // "You are more likely to rely on emotional intuition than logical reasoning when making a choice.",
    // "You become bored or lose interest when the discussion gets highly theoretical.",
    // "You usually feel more persuaded by what resonates emotionally with you than by factual arguments.",
    // "You often allow the day to unfold without any schedule at all.",
    // "You enjoy solitary hobbies or activities more than group ones.",
    // "You actively seek out new experiences and knowledge areas to explore.",
    // "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
    // "You favor efficiency in decisions, even if it means disregarding some emotional aspects.",
    // "You prioritize and plan tasks effectively, often completing them well before the deadline.",
    // "You are not too interested in discussions about various interpretations of creative works.",
    // "You find the idea of networking or promoting yourself to strangers very daunting.",
    // "Complex and novel ideas excite you more than simple and straightforward ones."
];