import React, { useState } from 'react';
import './App.css';
import FileUploader from './FileUploader';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    // Additional logic can be added here, like sending the file to a server
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

          {file && (
            <div className="row justify-content-center mt-4">
              <div className="col-md-8">
                <div className="alert alert-success">
                  File uploaded: {file.name}
                </div>
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