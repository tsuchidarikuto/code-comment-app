'use client';

import { Button,Box, Stack, Typography, Container,TextField, Select, MenuItem } from "@mui/material";
import { useState, useEffect, use } from "react";
import analyzeComment from "@/utils/analyzeComment";
import { ResultTypes } from "@/types";
import questions from "@/app/problems";


export default function Home() {
  const [code, setCode] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  const [state, setState] = useState<number>(100);

  const Answering = 100;
  const FeedBack = 101;

  useEffect(() => {
    setCode(questions[0]);
  }
  , []);
  
  const handleClick = async (): Promise<void> => {
    try {
      // コメント付きコードを解析
          //戻り値はJSON形式でスコアとフィードバック
      const analyzedResult: ResultTypes = await analyzeComment(code);
      setScore(analyzedResult.score);
      setFeedback(analyzedResult.feedback);
    } catch (e) {
      console.log(`採点中にエラーだよ ${e}`);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProblem(event.target.value as string);
    setCode(questions[event.target.value as number])
    // 問題を受け取り、setCodeを使用
  };

  return (
    <Box sx={{ width: '100%', mt: 10, margin: 2 }}>
      <Container>
        <Stack spacing={5}>
          {/* ヘッダー */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="text" component="h1" sx={{ textAlign: 'left' }}>code-comment-add</Button>
            <Button variant="text" component="h1" sx={{ textAlign: 'right' }}>履歴</Button>
          </Box>

          {/* 問題選択 */}
          <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="h4">問題選択</Typography>
            <Select
              value={selectedProblem}
              onChange={handleSelectChange}
              displayEmpty
              sx={{ width: 300 }}
            >
              <MenuItem value="" disabled>問題を選択</MenuItem>
              <MenuItem value="1">問題1</MenuItem>
              <MenuItem value="2">問題2</MenuItem>
              <MenuItem value="3">問題3</MenuItem>
            </Select>
          </Box>

          {/* コード入力 */}
          <TextField
            multiline
            rows={5}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ width: "100%", alignSelf: "center" }}
          />

          {/* スコアとフィードバック */}
          <Box sx={{ height: "100%" }}>
            <Typography>
              スコア: {score}点
            </Typography>
            <Typography>
              フィードバック: {feedback}
            </Typography>
          </Box>

          {/* 採点ボタン */}
          <Button variant="contained" sx={{ width: "fit-content", alignSelf: "left" }} onClick={handleClick}>
            採点
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
