'use client';


export default async function analyzeComment(codeWithComment: string){
    try {        
        //structured outputを使うためにgpt-4o系を使う
        const model = "gpt-4o-mini-2024-07-18";
        //システムプロンプト（改良の余地あり)
        const system = `
            あなたは熟練したプログラマーであり、教育者です。入力されるコードに対するユーザーのコメントを分析してください。
            コメントがついていないコードは0点として評価してください。
            ユーザーは直接コードにコメントを追加しています。

            以下の評価項目に基づいて、各項目を10点満点で評価し、詳細なフィードバックを提供してください：

            評価項目:
            1. 適切性: コメントの内容が適切かどうかを評価。コードの意図や複雑な処理の説明、非標準的な実装の理由など
            2. 明確性: コメントの表現が明確で理解しやすいかを評価します。簡潔で分かりやすい言葉遣い。専門用語の適切な使用。文法的に正しい文章
            3. 一貫性: コメントのスタイルや形式が一貫しているかを評価します。コメントの書き方に揺らぎがないか。同じ種類の情報を同じ形式で記述しているか。
            4. 有用性: コメントが実際に役立つ情報を提供しているかを評価します。将来のメンテナンスに役立つ情報。バグ修正や機能追加の際に参考になる情報。コードの動作や制約に関する重要な注意事項。

            フィードバック:
            - コードの読解に関するフィードバック
            - コメントの適切さに関するフィードバック

            最終的な出力は以下のJSON形式で提供してください：

            {
            "scores": {
                "appropriateness": <10点満点での評価>,
                "clarity": <10点満点での評価>,
                "consistency": <10点満点での評価>,
                "usefulness": <10点満点での評価>
            },
            "feedbacks": {
                "codeFeedback": "<コードの読解に関するフィードバック>",
                "commentFeedback": "<コメントの適切さに関するフィードバック>"
            }
        }
        `;
        //入力されるコメント付きコード
        const prompt = codeWithComment;

        //スキーマ名
        const schemaName = "analyzeComment";

        //app/api/openai/route.tsの中間APIの呼び出し
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                system:system,
                prompt: prompt,
                schemaName: schemaName,
                
            }),
        });        
        
        //{score:number,feedback:string}の形式で返ってくる
        const result = await response.json();
        
        console.log(result);
        
        return result;

    } catch (e) {
        console.log(e);
        return `on analyzecomment ${e}`;
    }
}