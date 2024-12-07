'use client';

import { Button,Box, Stack, Typography, Container,TextField, Select, MenuItem, Grid, Card } from "@mui/material";
import { useState, useEffect } from "react";
import analyzeComment from "@/utils/analyzeComment";
import createHint from "@/utils/createHint";
import { ResultTypes } from "@/types";
import { getProblemByTitle ,getTitles} from "@/app/problems";
import { useRouter } from "next/navigation";
import { renderRadarChart } from "./Chart";

export interface scores{
    knowledge:number;//基礎知識
    appropriateness:number;//適切性
    clarity:number;//明確性
    consistency:number;//一貫性
    usefulness:number;//有用性
}

export interface feedbacks{
    codeFeedback:string;//コードの読解に関するフィードバック
    commentFeedback:string;//コメントの適切さに関するフィードバック
}

export default function Home() {
  const [code, setCode] = useState("");
  const [score, setScore] = useState<scores>();
  const [feedback, setFeedback] = useState<feedbacks>();
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [state, setState] = useState<number>(100);
  const [hint, sethint] = useState<string>("");

  const Answering = 100;
  const OpenHint = 101;
  const FeedBack = 102;


  const questionNameList:string[] = getTitles();

  // useEffect(() => {
  //   setCode(questions[0]);
  // }
  // , []);
  
  const handleClick = async (): Promise<void> => {
    try{
    //コメント付きコードを解析
    //戻り値はJSON形式でスコアとフィードバック
    
    
    // setScore({
    //   knowledge: 8,
    //   appropriateness: 7,
    //   clarity: 9,
    //   consistency: 6,
    //   usefulness: 8,
    // });
    // setFeedback({
    //   codeFeedback: "コードは非常に良く理解されていますが、最適化の余地があります。",
    //   commentFeedback: "コメントは役立ちますが、もう少し具体的な説明が欲しいです。",
    // },)
    setState(FeedBack)
    analyzeComment(code).then(analyzedResult=>{
          setScore(analyzedResult.scores);
          setFeedback(analyzedResult.feedbacks);
          setState(FeedBack);
    });
    }catch(e){
      console.log(`採点中にエラーだよ${e}`);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedIndex = event.target.value as string;
    setSelectedProblem(selectedIndex);
    setCode(getProblemByTitle(selectedIndex)); // 選ばれた問題に基づいてコードを更新
  };

  const fetchHint = async (): Promise<void> => {
      try {
        setState(OpenHint);
        createHint(code)
          .then(h=>{
            sethint(h as string)
          })
      } catch (e) {
        console.log(`ヒント作成中にエラーだよ${e}`);
      }
  }
  const router = useRouter();
  
  return (
    <Box sx={{ width: '100%', mt: 10, margin: 2 }}>
      <Container>
        <Stack spacing={5}>
          {/* ヘッダー */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              variant="text" 
              component="h1" 
              sx={{ textAlign: 'left' }}
              onClick={() => router.push('/')}
              >
              code-comment-add
            </Button>
            <Button
              variant="text"
              component="h1"
              sx={{ textAlign: 'right' }}
              onClick={() => router.push('/history')} // 履歴ページに遷移
            >
              履歴
            </Button>
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
              {/* <MenuItem value={0}>問題1</MenuItem>
              <MenuItem value={1}>問題2</MenuItem>
              <MenuItem value={2}>問題3</MenuItem> */}
              {questionNameList.map((questionName,i)=>(<MenuItem value={questionName} key={i}>{questionName}</MenuItem>))}
            </Select>
          </Box>

          {state === OpenHint && (
            <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "80%" }}>
              <Typography>{hint}</Typography>
            </Box>
          )}
          {/* コード入力 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3">コメントの入力</Typography>
            <Button variant="contained" onClick={()=>fetchHint()}>ヒント</Button>
          </Box>
          
          <TextField
            multiline
            rows={code.split('\n').length || 1}/* codeの行数にしたい */
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ width: "100%", alignSelf: "center", backgroundColor: "#f5f5f5"}}
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
        <Box sx={{ display:"flex" }}>
          {/* ここに、レーダーチャートとフィードバックを入れたい */}
          <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
            {/* レーダーチャート */}
            <Grid item xs={12} md={6}>
              <Box>
                {renderRadarChart(score)}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h5" gutterBottom>
              フィードバック
            </Typography>
            <Card sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">コードの読解に関するフィードバック</Typography>
              <Typography>{feedback.codeFeedback}</Typography>
            </Card>
            <Card sx={{ padding: 2 }}>
              <Typography variant="h6">コメントの適切さに関するフィードバック</Typography>
              <Typography>{feedback.commentFeedback}</Typography>
            </Card>
          </Box>
        </Grid>
          </Grid>
        </Box>
      )}
      </Container>
    </Box>
  );
}
