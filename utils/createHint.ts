'use client';


export default async function createHint(codeWithComment: string){
    try {        
        //モデル名
        const model = "gpt-4o-mini-2024-07-18";
        //システムプロンプト
        const system = `            
            あなたは熟練したプログラマーであり、教育者です。
            ユーザーが問題のコードについて、わからなくなっています。コードと含まれるコメントを参考にして、適切なコメントが書けるような適切なヒントを提供してください。
            ユーザーのコードには、ユーザーが理解している範囲のコメントが含まれている可能性があります。
            出力の際挨拶や前置きなしで、直接ヒントの提供してください
            `
        //入力されるコメント付きコード
        const prompt = codeWithComment;
        //スキーマ名
        const schemaName = "createHint";

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
        
        
        const hint = await response.json();
        
        console.log(hint);
        
        return hint;

    } catch (e) {
        console.log(e);
        return e;
    }
}