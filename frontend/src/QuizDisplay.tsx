import React, { useState } from 'react';
import './QuizDisplay.css'; // Import the CSS file

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
    const [score, setScore] = useState(0);

    const handleOptionClick = (questionId: number, selectedOption: string) => {
        const isCorrect = selectedOption === questions.find(q => q.qno === questionId)?.answer;

        // Update selected answers
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption,
        }));

        // Update score only if the answer is correct and not already counted
        if (isCorrect && !selectedAnswers[questionId]) {
            setScore(prevScore => prevScore + 1);
        } else if (!isCorrect && selectedAnswers[questionId] === questions.find(q => q.qno === questionId)?.answer) {
            setScore(prevScore => prevScore - 1);
        }
    };

    const handleToggleChange = () => {
        setShowAnswers(!showAnswers);
    };

    const handleResetQuiz = () => {
        setSelectedAnswers({});
        setShowAnswers(false);
        setScore(0);
    };

    return (
        <div className="quiz-display">
            <div className="controls-container">
                <div className="toggle-container" title={showAnswers ? 'Answer will be shown only on selection' : ''}>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={showAnswers}
                            onChange={handleToggleChange}
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="toggle-label">{showAnswers ? 'Show Answers' : 'Hide Answers'}</span>
                </div>
            </div>
            <div className="card-container">
                {questions.map((question) => (
                    <div key={question.qno} className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{question.qno}. {question.question}</h5>
                            <ul className="list-group">
                                {[question.option1, question.option2, question.option3, question.option4].map((option, index) => {
                                    const isSelected = selectedAnswers[question.qno] === option;
                                    const isCorrect = option === question.answer;
                                    const optionClass = isSelected ? (isCorrect ? 'bg-success text-white' : 'bg-danger text-white') : '';

                                    return (
                                        <li key={index} className={`list-group-item ${optionClass}`} onClick={() => handleOptionClick(question.qno, option)} style={{ cursor: 'pointer' }}>
                                            <span className="option-text">{option}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            {showAnswers && selectedAnswers[question.qno] && selectedAnswers[question.qno] !== question.answer && (
                                <p className="mt-3 text-muted">
                                    <strong>Correct Answer:</strong> {question.answer}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="score-display">
                <strong>You Scored {score} / {questions.length} points</strong>
            </div>
            <button className="reset-btn reset-btn-secondary" onClick={handleResetQuiz}>
                Reset Quiz
            </button>
        </div>
    );
};

export default QuizDisplay;