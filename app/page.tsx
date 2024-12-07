'use client';

import { Button,Box, Stack, Typography, Container,TextField, Select, MenuItem, Grid } from "@mui/material";
import { useState, useEffect, use } from "react";
import analyzeComment from "@/utils/analyzeComment";
import { ResultTypes } from "@/types";
import questions from "@/app/problems";
import { auto } from "openai/_shims/registry.mjs";


export default function Home() {
  const [code, setCode] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [state, setState] = useState<number>(100);

  const Answering = 100;
  const OpenHint = 101;
  const FeedBack = 102;

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
      setState(FeedBack);
    } catch (e) {
      console.log(`採点中にエラーだよ ${e}`);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedIndex = event.target.value as number;
    setSelectedProblem(selectedIndex);
    setCode(questions[selectedIndex]); // 選ばれた問題に基づいてコードを更新
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
              <MenuItem value={0}>問題1</MenuItem>
              <MenuItem value={1}>問題2</MenuItem>
              <MenuItem value={2}>問題3</MenuItem>
            </Select>
          </Box>

          {state === OpenHint && (
            <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "80%" }}>
              <Typography>ヒント</Typography>
            </Box>
          )}
          {/* コード入力 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3">コメントの入力</Typography>
            <Button variant="contained" onClick={()=>setState(OpenHint)}>ヒント</Button>
          </Box>
          
          <TextField
            multiline
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ width: "100%", alignSelf: "center"}}
            disabled={state === FeedBack}
          />
          {/* 採点ボタン */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="contained" sx={{ width: 'fit-content', marginRight: "10px"}} onClick={handleClick}>
              採点
            </Button>
          </Box>
        </Stack>
      {/* stateがFeedBackの場合のみ見えるブロック */}
      {state === FeedBack && (
        <Box>
          <Typography variant="h5" sx={{ mt: 3 }}>採点結果</Typography>
          <Grid container spacing={2}>
            {/* コードの理解 */}
            <Grid item xs={6} sx={{ overflow: "hidden" }}>
              <Typography>コードの理解</Typography>
              <Typography>点数:{score} / 10</Typography>
            </Grid>

            {/* コメントの評価 */}
            <Grid item xs={6} sx={{ overflow: "hidden" }}>
              <Typography>コメントの評価</Typography>
              <Typography>点数:{score} / 10</Typography>
            </Grid>

            {/* コードの理解についてのフィードバック */}
            <Grid item xs={6}>
              <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "80%" }}>
                <Typography>コードの理解についてのフィードバック</Typography>
              </Box>
            </Grid>

            {/* コメントの評価についてのフィードバック */}
            <Grid item xs={6}>
              <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "80%" }}>
                <Typography>コメントの評価についてのフィードバック</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      </Container>
    </Box>
  );
}
