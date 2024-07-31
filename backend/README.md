# Quizler App - BackEnd

- To build the Docker image run  the following
    
    `docker build -t quizler-backend .` 
    
- To run the docker container
    
    `docker run -p 5000:8000 quizler-backend`

- Expected Result

```markdown
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:8000
 * Running on http://172.17.0.2:8000
```

- After the application start, navigate to http://localhost:5000/ in your browser (since we exposed 5000)