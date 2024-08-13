# Quizler: AI-Powered Quiz Generator

Quizler is an innovative web application that leverages AI to automatically generate quizzes from uploaded documents. It combines a React frontend with a Flask backend, utilizing OpenAI's GPT model to create custom quizzes based on user-provided content.

## Features

- Upload PDF or PowerPoint files
- Select difficulty level (Easy, Medium, Hard)
- Choose the number of questions (5-15)
- AI-generated multiple-choice questions
- Dockerized application for easy deployment

## Tech Stack

- Frontend: React with TypeScript
- Backend: Flask (Python)
- AI: OpenAI GPT model
- Containerization: Docker and Docker Compose

## Prerequisites

- Docker and Docker Compose installed on your system
- OpenAI API key


## Setup and Installation

1. Clone the repository:

    ```
    git clone https://github.com/yourusername/quizler.git
    cd quizler
    ```

2. Create a `.env` file in the root directory and add your OpenAI API key:

    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

3. Build and run the Docker containers:

    ```
    docker-compose up --build
    ```

4. Access the application at `http://localhost:3000`

## Usage

1. Open the Quizler web interface in your browser.
2. Upload a PDF or PowerPoint file.
3. Select the desired difficulty level and number of questions.
4. Click "Create Quiz" to generate your custom quiz.
5. View and interact with the generated questions.

## Demo



https://github.com/user-attachments/assets/3cfdf944-c151-47b7-a456-39d2e6035ad5

