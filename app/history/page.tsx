'use client';

import { Box, Grid, Typography, Card, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { scores,feedbacks } from "../page";
import { historyTypes } from "@/types";
import { renderRadarChart } from "../Chart";
import { loadFromLocalStorage } from "@/utils/useLocalStrage";

export default function History() {
  const router = useRouter();
  const pre:historyTypes[] = loadFromLocalStorage();
  return (
    <Box sx={{ width: "100%"}}>
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
      {pre.map((his,i)=>(
          <Box sx={{ border: "1px solid #000", padding: 2, maxWidth: "100%", margin:"20px"}} key={i}>
            <Typography variant="h4">{his.title}</Typography>
            <Card sx={{ padding: 2, backgroundColor: "#f5f5f5", whiteSpace: "pre-wrap" }}>
            <Typography component="pre" sx={{ fontFamily: "monospace" }}>
              {his.code}
            </Typography>
          </Card> 
            <Box sx={{ display:"flex" }}>
                {/* ここに、レーダーチャートとフィードバックを入れたい */}
                <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
                  {/* レーダーチャート */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      {renderRadarChart(his.scores)}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%', // 必要に応じて調整
                    }}
                  >
                    <Typography variant="h5" gutterBottom>
                      フィードバック
                    </Typography>
                    <Card sx={{ padding: 2, marginBottom: 2 }}>
                      <Typography variant="h6">コードの読解に関するフィードバック</Typography>
                      <Typography>{his.feedbacks.codeFeedback}</Typography>
                    </Card>
                    <Card sx={{ padding: 2 }}>
                      <Typography variant="h6">コメントの適切さに関するフィードバック</Typography>
                      <Typography>{his.feedbacks.commentFeedback}</Typography>
                    </Card>
                  </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
