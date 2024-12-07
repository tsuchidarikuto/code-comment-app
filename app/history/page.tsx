'use client';

import { Box, Grid, Typography, Card, CardContent, Button } from "@mui/material";

export default function History() {
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
        <Box sx={{ width: '100%', mt: 10, margin: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="text" component="h1" sx={{ textAlign: 'left' }}>code-comment-add</Button>
                <Button variant="text" component="h1" sx={{ textAlign: 'right' }}>履歴</Button>
            </Box>
        </Box>
      <Typography variant="h4" gutterBottom>
        履歴
      </Typography>
      <Grid container spacing={2}>
        {/* {data.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))} */}
        <Grid item xs={12} sm={6}>
            <Box>
                <Typography>理解度</Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h6">問題</Typography>
                        <Typography>結果</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h6">問題</Typography>
                        <Typography>結果</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box>
                <Typography>コメント力</Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h6">問題</Typography>
                        <Typography>結果</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h6">問題</Typography>
                        <Typography>結果</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h6">問題</Typography>
                        <Typography>結果</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
