import { NextResponse, NextRequest } from 'next/server';
import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';
import type { OpenaiTypes } from '@/types';

export async function POST(req: NextRequest) {
    
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });//.envファイルからAPIキーを取得（.envはリモートリポジトリにはない）

    const schema = z.object({//zodを使い出力の構造を指定する
        score: z.number(),
        feedback: z.string(),
    });

    const {prompt,model,system}= (await req.json()) as OpenaiTypes;//request bodyからプロンプト、モデル、システムプロンプトを取得

    const completion = await openai.beta.chat.completions.parse({ //openaiAPIの呼び出し
        model: model,
        messages: [
            { role: "system", content: system},
            { role: "user", content: prompt},
        ],
        response_format: zodResponseFormat(schema, "schema"),
    });

    const response = completion.choices[0].message.parsed;//必要な情報を取得
    console.log(response);

    return NextResponse.json(response); // 中間APIのレスポンスを返す
}
