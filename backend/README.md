# Quizler App - BackEnd

- To build the Docker image run  the following
    
    `docker build -t quizler-backend .` 
    
- To run the docker container
    
    `docker run -p 5000:8000 -e OPENAI_API_KEY= -v $(pwd):/app quizler-backend`

- Expected Result

    ```markdown
    * Running on all addresses (0.0.0.0)
    * Running on http://127.0.0.1:8000
    * Running on http://172.17.0.2:8000
    ```

- After the application start, navigate to http://localhost:5000/ in your browser (since we exposed 5000)

    ## Supported routes

    - defalut - '/'
    - generate_questions
        `curl -X POST http://localhost:5000/api/generate_questions      -H "Content-Type: multipart/form-data"      -F "file=@backend/sample_files/test.pdf"      -F "num_questions=13"      -F "difficulty=medium"`