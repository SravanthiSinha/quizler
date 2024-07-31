import React, { useState } from 'react';

interface Question {
    qno: number;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
}

interface QuizDisplayProps {
    questions: Question[];
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ questions }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

    const handleOptionChange = (questionId: number, selectedOption: string) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: selectedOption,
        });
    };

    return (
        <div className="quiz-display">
            {questions.map((question) => (
                <div key={question.qno} className="card mb-3">
                    <div className="card-body">
                        <p className="card-text">{question.qno} : {question.question}</p>
                        <ul className="list-group">
                            {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
                                <li key={index} className="list-group-item">
                                    <label className="d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name={`question-${question.qno}`}
                                            value={option}
                                            checked={selectedAnswers[question.qno] === option}
                                            onChange={() => handleOptionChange(question.qno, option)}
                                            className="me-2"
                                        />
                                        <span onClick={() => handleOptionChange(question.qno, option)}>
                                            {option}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {selectedAnswers[question.qno] && (
                            <p className="mt-2">
                                <strong>Correct Answer:</strong> {question.answer}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuizDisplay;
