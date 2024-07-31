import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FileUploader.css'; // Custom styles

interface FileUploaderProps {
  onFileUpload: (file: File, difficulty: string, questionCount: number) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<string>('easy');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileUpload(selectedFile, difficulty, questionCount);
    } else {
      alert('Please select a file first!');
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <label className="form-label">Select a PDF or PowerPoint file</label>
        <input
          type="file"
          className="form-control"
          id="file-upload"
          accept=".pdf,.ppt,.pptx"
          onChange={handleFileChange}
        />
      </div>

      <div className="row align-items-center mb-3">
        <div className="col-12 col-md-auto mb-2 mb-md-0">
          <label className="form-label mb-0 me-3">Difficulty Level:</label>
          <div className="btn-group" role="group" aria-label="Difficulty selection">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <React.Fragment key={level}>
                <input
                  type="radio"
                  className="btn-check"
                  name="difficulty"
                  id={level.toLowerCase()}
                  value={level.toLowerCase()}
                  checked={difficulty === level.toLowerCase()}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                <label className="btn btn-outline-primary btn-sm" htmlFor={level.toLowerCase()}>
                  {level}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-auto">
          <div className="d-flex align-items-center">
            <label htmlFor="question-count" className="form-label mb-0 me-3">No of Questions:</label>
            <input
              type="number"
              className="form-control"
              id="question-count"
              min="5"
              max="15"
              value={questionCount}
              onChange={(e) => setQuestionCount(Math.max(5, Math.min(15, parseInt(e.target.value) || 5)))}
              style={{ width: '80px' }}
            />
          </div>
        </div>
      </div>

      <button
        className="btn btn-success btn-sm mt-2"
        onClick={handleSubmit}
        disabled={!selectedFile}
      >
        Create Quiz
      </button>
    </div>
  );
};

export default FileUploader;