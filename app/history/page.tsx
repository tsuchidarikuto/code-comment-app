'use client';

import { Box, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { auto } from "openai/_shims/registry.mjs";

interface history{
  answer:string,
  CommentPoint:number,
  CommentFeedBack:string,
  ComprehensionPoint:number,
  ComprehensionFeedBack:string,
}
export default function History() {
  const router = useRouter();
  const pre:history[] = [
  //   {
  //     answer: `function sumArray(numbers) {
  //     let sum = 0;
  //     for (let number of numbers) {
  //         sum += number;
  //     }
  //     return sum;
  // }
  
  // const numbers = [1, 2, 3, 4, 5];
  // console.log('Sum:', sumArray(numbers));`,
  //     CommentPoint: 8,
  //     CommentFeedBack: "コメントが適切に記載されていますが、詳細さが不足しています。",
  //     ComprehensionPoint: 9,
  //     ComprehensionFeedBack: "コードの動作をほぼ完全に理解しています。",
  //   },
  //   {
  //     answer: "let x = 10; console.log(x * 2);",
  //     CommentPoint: 7,
  //     CommentFeedBack: "コメントがあるが、より具体的な説明が望ましいです。",
  //     ComprehensionPoint: 8,
  //     ComprehensionFeedBack: "基本的な動作は理解していますが、変数のスコープについての説明が不足しています。",
  //   },
  ];
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
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
      <Typography variant="h4" gutterBottom>
        履歴
      </Typography>
      {pre.map(his=>(
        <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "80%", margin:"20px"}}>
          <Card sx={{ padding: 2, backgroundColor: "#f5f5f5", whiteSpace: "pre-wrap" }}>
            <Typography component="pre" sx={{ fontFamily: "monospace" }}>
              {his.answer}
            </Typography>
          </Card>        
          <Typography variant="h5" sx={{ mt: 3 }}>採点結果</Typography>
          <Grid container spacing={2}>
            {/* コードの理解 */}
            <Grid item xs={6} sx={{ overflow: "hidden" }}>
              <Typography>コードの理解</Typography>
              <Typography>点数:{his.ComprehensionPoint} / 10</Typography>
            </Grid>

            {/* コメントの評価 */}
            <Grid item xs={6} sx={{ overflow: "hidden" }}>
              <Typography>コメントの評価</Typography>
              <Typography>点数:{his.CommentPoint} / 10</Typography>
            </Grid>

            {/* コードの理解についてのフィードバック */}
            <Grid item xs={6}>
              <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "80%" }}>
                <Typography>{his.ComprehensionFeedBack}</Typography>
              </Box>
            </Grid>

            {/* コメントの評価についてのフィードバック */}
            <Grid item xs={6}>
              <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "80%" }}>
                <Typography>{his.ComprehensionFeedBack}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
