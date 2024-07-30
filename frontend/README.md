# Quizler App - FrontEnd

- To build the Docker image run  the following
    
    `docker build -t quizler .` 
    
- To run the docker container
    
    `docker run -p 3000:3000 -v $(pwd):/app quizler`

- Expected Result

```markdown
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.17.0.2:3000
```

- After the application start, navigate to http://localhost:3000 in your browser