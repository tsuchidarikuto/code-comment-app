'use client';
import { ResultTypes } from "@/types";

export default async function analyzeComment(codeWithComment: string){
    try {        
        //structured outputを使うためにgpt-4o系を使う
        const model = "gpt-4o-mini-2024-07-18";
        //システムプロンプト（改良の余地あり)
        const system = `
            あなたは熟練したプログラマーで教師です。入力されるコードに対するユーザーのコメントを分析してください。
            コメントがついていないコードは0点として評価してください。
            ユーザーは直接コードにコメントを追加しています。

            以下の点を考慮して評価してください：
            1. コードの理解度
            2. コメントの適切さと正確さ
            3. プログラミングの概念の理解
            4. コードの改善点や最適化の提案（もしあれば）

            ユーザーのコード理解度を10点満点で評価し、詳細なフィードバックを提供してください。
            以下のJSON形式で回答を提供してください
            {
                score: <10点満点での評価>,
                feedback: "<ユーザーの理解度に関する詳細なフィードバック>"
            }
            `
        //入力されるコメント付きコード
        const prompt = codeWithComment;
        //app/api/openai/route.tsの中間APIの呼び出し
        const response = await fetch('api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                system:system,
                prompt: prompt,
                
            }),
        });        
        
        //{score:number,feedback:string}の形式で返ってくる
        const data = await response.json();
        
        return data;

    } catch (e) {
        console.log(e);
        return `on analyzecomment ${e}`;
    }
}