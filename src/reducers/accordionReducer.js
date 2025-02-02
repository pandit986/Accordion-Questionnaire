import { initialQuestionsData } from "../component/helper";

export const initialState = {
    questionsData: initialQuestionsData || [],
    editableAccordion: 0,
    showButtons: false,
    openAccordion: 0,
};

export const accordionReducer = (state, action) => {
    switch (action.type) {
        case "SET_INITIAL_DATA":
            return { ...state, questionsData: action.payload };

        case "TOGGLE_ACCORDION":
            return { ...state, openAccordion: state.openAccordion === action.index ? -1 : action.index };

        case "UPDATE_ANSWER":
            return {
                ...state,
                questionsData: state.questionsData.map((section, i) =>
                    i === action.accordionIndex
                        ? {
                            ...section,
                            questions: section.questions.map((q, j) =>
                                j === action.questionIndex ? { ...q, answer: action.value } : q
                            ),
                        }
                        : section
                ),
                showButtons: true,
            };

        case "SAVE": {
            const allYesOrNA = state.questionsData[state.editableAccordion].questions.every(
                (q) => q.answer === "Yes" || q.answer === "NA"
            );

            return {
                ...state,
                editableAccordion:
                    allYesOrNA && state.editableAccordion < state.questionsData.length - 1
                        ? state.editableAccordion + 1
                        : state.editableAccordion,
                openAccordion: allYesOrNA ? state.editableAccordion + 1 : -1,
                showButtons: false,
            };
        }

        case "CANCEL":
            return {
                ...state,
                questionsData: state.questionsData.map((section, i) =>
                    i === state.editableAccordion
                        ? {
                            ...section,
                            questions: section.questions.map((q) => ({ ...q, answer: "No" })),
                        }
                        : section
                ),
                showButtons: false,
            };

        default:
            return state;
    }
};
