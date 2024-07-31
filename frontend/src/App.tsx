import React, { useState, useEffect } from 'react';
import './App.css';
import FileUploader from './FileUploader';
import QuizDisplay from './QuizDisplay';
import sampleQuestions from './sampleQuestions.json';

interface Question {
  qno: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setQuestions(sampleQuestions);
  }, []);

  const handleFileUpload = (uploadedFile: File, selectedDifficulty: string, selectedQuestionCount: number) => {
    setFile(uploadedFile);
    setDifficulty(selectedDifficulty);
    setQuestionCount(selectedQuestionCount);
    // Simulate fetching questions based on the uploaded file and selected options
    // In a real application, you would make an API call here
    const fetchedQuestions = sampleQuestions
      .slice(0, selectedQuestionCount)
      .map(q => ({ ...q, difficulty: selectedDifficulty }));

    // Explicitly cast the fetchedQuestions to Question[]
    setQuestions(fetchedQuestions as Question[]);
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <header className="py-3 bg-light">
        <div className="container">
          <h1 className="text-center">Quizler</h1>
        </div>
      </header>

      <main className="flex-grow-1">
        <div className="container my-2">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <FileUploader onFileUpload={handleFileUpload} />
                </div>
              </div>
            </div>
          </div>

          {file && questions.length > 0 && (
            <div className="row justify-content-center mt-4">
              <div className="col-md-8">
                <div className="alert alert-success">
                  Quiz Created!! <br />
                  File Used: {file.name},
                  Difficulty: {difficulty},
                  Number of Questions: {questionCount}
                </div>
                <QuizDisplay questions={questions} />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-3 bg-light">
        <div className="container">
          <p className="text-center mb-0">© 2024 Quizler</p>
        </div>
      </footer>
    </div>
  );
};

export default App;