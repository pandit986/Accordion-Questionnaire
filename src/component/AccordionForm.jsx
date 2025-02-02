import { useReducer, useEffect } from "react";
import styled from "styled-components";
import { accordionReducer, initialState } from "../reducers/accordionReducer";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { initialQuestionsData } from "./helper";

const AccordionComponent = () => {
  const [
    { questionsData, openAccordion, editableAccordion, showButtons },
    dispatch,
  ] = useReducer(accordionReducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_INITIAL_DATA", payload: initialQuestionsData });
  }, []);

  return (
    <AccordionWrapper>
      {questionsData?.map((section, index) => (
        <AccordionContainer key={index}>
          <AccordionHeader
            onClick={() => dispatch({ type: "TOGGLE_ACCORDION", index })}
            aria-expanded={openAccordion === index}
            role="button"
          >
            {section.title}
            <IconContainer>
              {openAccordion === index ? <FaChevronUp /> : <FaChevronDown />}
            </IconContainer>
          </AccordionHeader>

          <AccordionContent isOpen={openAccordion === index}>
            {section.questions.map((q, qIndex) => (
              <QuestionWrapper key={qIndex}>
                <QuestionText>{q.question}</QuestionText>
                <OptionContainer>
                  {["Yes", "No", "NA"].map((option) => (
                    <RadioButtonLabel key={option}>
                      <input
                        type="radio"
                        name={`accordion-${index}-question-${qIndex}`}
                        value={option}
                        checked={q.answer === option}
                        onChange={() =>
                          editableAccordion === index &&
                          dispatch({
                            type: "UPDATE_ANSWER",
                            accordionIndex: index,
                            questionIndex: qIndex,
                            value: option,
                          })
                        }
                        disabled={editableAccordion !== index}
                      />
                      {option}
                    </RadioButtonLabel>
                  ))}
                </OptionContainer>
              </QuestionWrapper>
            ))}

            {showButtons && editableAccordion === index && (
              <ButtonContainer>
                <Button onClick={() => dispatch({ type: "SAVE" })}>Save</Button>
                <Button
                  variant="outline"
                  onClick={() => dispatch({ type: "CANCEL" })}
                >
                  Cancel
                </Button>
              </ButtonContainer>
            )}
          </AccordionContent>
        </AccordionContainer>
      ))}
    </AccordionWrapper>
  );
};

export default AccordionComponent;

const AccordionWrapper = styled.div`
  width: 100%;
  max-width: 650px;
  margin: auto;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const AccordionContainer = styled.div`
  border: 2px solid #004aad;
  border-radius: 10px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
`;

const AccordionHeader = styled.div`
  background: #004aad;
  color: white;
  padding: 16px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.div`
  font-size: 18px;
`;

const AccordionContent = styled.div`
  height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  overflow: hidden;
  padding: ${({ isOpen }) => (isOpen ? "16px" : "0")};
  background: white;
  transition: height 0.4s ease, opacity 0.4s ease, padding 0.4s ease;
`;

const QuestionWrapper = styled.div`
  padding: 4px 0;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const QuestionText = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

const OptionContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  color: #333;
  font-weight: 500;
  padding: 8px 8px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #004aad;
    color: white;
  }

  input[type="radio"] {
    margin-right: 8px;
    accent-color: #004aad;
    width: 18px;
    height: 18px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  ${({ variant }) =>
    variant === "outline"
      ? "background: none; border: 2px solid #004AAD; color: #004AAD;"
      : "background: #004AAD; color: white;"}
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.85;
  }
`;
