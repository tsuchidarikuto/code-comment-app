'use client';

import { Button,Box, Stack, Typography, Container,TextField,CardActions } from "@mui/material";
import { useState,useEffect } from "react";
import analyzeComment from "@/utils/analyzeComment";
import { ResultTypes } from "@/types";
import { set } from "zod";

export default function Home() {
  const [code, setCode] = useState("console.log('Hello, World!');");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleClick = async (): Promise<void> => {
    try{
    const analyzedResult: ResultTypes = await analyzeComment(code);
    
    setScore(analyzedResult.score);
    setFeedback(analyzedResult.feedback);
    

    
    }catch(e){
      console.log(`on page.tsx${e}`);
    }
  }

  return (
    <Box sx={{ width: '100%', mt: 10, margin: 2 }}>
    <Container>
    <Stack spacing={5}>
        <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
          コードにコメントつけるアプリ
        </Typography>
        
          {
          <TextField  
            multiline 
            rows ={5}             
            value={code}            
            onChange={(e) => setCode(e.target.value)}
            sx = {{width:"100%",alignSelf:"center"}}
          /> } 
        
          <Box sx={{height:"100%"}}>
          <Typography>
            スコア: {score}点
          </Typography>
          <Typography>
            フィードバック: {feedback}
          </Typography>
          </Box>
        
      
     
          <Button variant="contained" sx = {{width:"fit-content",alignSelf:"left"}}onClick={handleClick}>採点</Button>
          
     </Stack>
     </Container>
    </Box>
  );
}
