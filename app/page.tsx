'use client';

import { Button,Box, Stack, Typography, Container,TextField, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import analyzeComment from "@/utils/analyzeComment";
import { ResultTypes } from "@/types";


export default function Home() {
  const [code, setCode] = useState("console.log('Hello, World2!');");//後から編集する、DBから取得？

  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleClick = async (): Promise<void> => {
    try{
    //コメント付きコードを解析
    //戻り値はJSON形式でスコアとフィードバック
      const analyzedResult: ResultTypes = await analyzeComment(code);
    
    setScore(analyzedResult.score);
    setFeedback(analyzedResult.feedback);
    

    
    }catch(e){
      console.log(`採点中にエラーだよ${e}`);
    }
  }


  return (
    //フロントはMUIで作成。
    <Box sx={{ width: '100%', mt: 10, margin: 2 }}>
    <Container>
    <Stack spacing={5}>
      <header>
        <Button variant="text" component="h1" sx={{ textAlign: 'left' }}>code-comment-add</Button> 
        <Button variant="text" component="h1" sx={{ textAlign: 'right' }}>履歴</Button>{/* 右寄せしたい */}
        </header>
        <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography variant="h4">問題選択</Typography>
        <Select
        displayEmpty
        sx={{ width: 300 }}>
        <MenuItem value="" disabled>問題を選択</MenuItem>
        <MenuItem>問題1</MenuItem>
        <MenuItem>問題2</MenuItem>
        <MenuItem>問題3</MenuItem>
        </Select>
        </Box>
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