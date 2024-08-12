import React, { useState } from 'react';
import './QuizDisplay.css';

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
    const [showAnswers, setShowAnswers] = useState(false);
    const [keepScore, setKeepScore] = useState(true);
    const [score, setScore] = useState(0);

    const handleOptionChange = (questionId: number, selectedOption: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
    };

    const submitQuiz = () => {
        if (showAnswers) return;

        let newScore = 0;
        questions.forEach(question => {
            if (selectedAnswers[question.qno] === question.answer) {
                newScore++;
            }
        });

        setScore(newScore);
        setShowAnswers(true);
    };

    const toggleKeepScore = () => setKeepScore(prev => !prev);
    
    const resetQuiz = () => {
        setSelectedAnswers({});
        setShowAnswers(false);
        setKeepScore(true);
        setScore(0);
    };

    return (
        <div className="quiz-display">
            <div className="controls-container">
                <div className="toggle-container" title={keepScore ? 'Answer will be shown only on selection' : ''}>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={keepScore}
                            onChange={toggleKeepScore}
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="toggle-label">{keepScore ? 'Keep score' : 'Skip score'}</span>
                </div>
            </div>
            <div className="card-container">
                {questions.map(({ qno, question, option1, option2, option3, option4, answer }) => (
                    <div key={qno} className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{qno}. {question}</h5>
                            <ul className="list-group">
                                {[option1, option2, option3, option4].map((option, index) => {
                                    const isSelected = selectedAnswers[qno] === option;
                                    const isCorrect = option === answer;
                                    let optionClass = "list-group-item";
                                    if (showAnswers) {
                                        if (isCorrect) {
                                            optionClass += " correct-answer";
                                        } else if (isSelected && !isCorrect) {
                                            optionClass += " incorrect-answer";
                                        }
                                    }

                                    return (
                                        <li key={index} className={optionClass}>
                                            <label className="d-flex align-items-center">
                                                <input
                                                    type="radio"
                                                    name={`question-${qno}`}
                                                    value={option}
                                                    checked={isSelected}
                                                    onChange={() => handleOptionChange(qno, option)}
                                                    disabled={showAnswers}
                                                    className="me-2"
                                                />
                                                <span>{option}</span>
                                                {showAnswers && isCorrect && (
                                                    <span className="ms-2 text-success">✓</span>
                                                )}
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            {keepScore && showAnswers && (
                <div className="score-display">
                    <strong>You Scored {score} / {questions.length} points</strong>
                </div>
            )}
            <div className="bottom-controls">
                {!showAnswers && (
                    <button className="btn btn-success" onClick={submitQuiz}>
                        Submit Quiz
                    </button>
                )}
                <button className="btn btn-secondary" onClick={resetQuiz}>
                    Reset Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizDisplay;