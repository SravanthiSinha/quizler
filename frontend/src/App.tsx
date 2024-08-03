import React, { useState } from 'react';
import './App.css';
import FileUploader from './FileUploader';
import QuizDisplay from './QuizDisplay';
import axios from 'axios';

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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (uploadedFile: File, selectedDifficulty: string, selectedQuestionCount: number) => {
    setFile(uploadedFile);
    setDifficulty(selectedDifficulty);
    setQuestionCount(selectedQuestionCount);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('difficulty', selectedDifficulty);
    formData.append('num_questions', selectedQuestionCount.toString());

    try {
      const response = await axios.post('http://localhost:5000/api/generate_questions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setQuestions(response.data);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error('Error generating questions:', err);
    } finally {
      setLoading(false);
    }
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

          {loading && (
            <div className="row justify-content-center mt-4">
              <div className="col-md-8">
                <div className="alert alert-info">Generating questions...</div>
              </div>
            </div>
          )}

          {error && (
            <div className="row justify-content-center mt-4">
              <div className="col-md-8">
                <div className="alert alert-danger">{error}</div>
              </div>
            </div>
          )}

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
