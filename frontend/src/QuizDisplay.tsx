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
    const [keepScore, setKeepScore] = useState(true);
    const [score, setScore] = useState(0);

    const handleOptionClick = (questionId: number, selectedOption: string) => {
        if (showAnswers) return;

        const question = questions.find(q => q.qno === questionId);
        if (!question) return;

        const isCorrect = selectedOption === question.answer;
        const wasCorrect = selectedAnswers[questionId] === question.answer;

        setSelectedAnswers(prev => ({ ...prev, [questionId]: selectedOption }));

        setScore(prevScore => {
            if (isCorrect && !wasCorrect) return prevScore + 1;
            if (!isCorrect && wasCorrect) return prevScore - 1;
            return prevScore;
        });
    };

    const toggleKeepScore = () => setKeepScore(prev => !prev);
    const showAllAnswers = () => setShowAnswers(true);
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
                                    const optionClass = isSelected ? (isCorrect ? 'bg-success text-white' : 'bg-danger text-white') : '';

                                    return (
                                        <li key={index} className={`list-group-item ${optionClass}`} onClick={() => handleOptionClick(qno, option)} style={{ cursor: 'pointer' }}>
                                            <span className="option-text">{option}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            {showAnswers && (
                                <p className="mt-3 text-muted">
                                    <strong>Correct Answer:</strong> {answer}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {keepScore && (
                <div className="score-display">
                    <strong>You Scored {score} / {questions.length} points</strong>
                </div>
            )}
            <div className="bottom-controls">
                <button className="btn btn-secondary" onClick={resetQuiz}>
                    Reset Quiz
                </button>
                <button className="btn btn-primary" onClick={showAllAnswers}>
                    Show Answers
                </button>
            </div>
        </div>
    );
};

export default QuizDisplay;