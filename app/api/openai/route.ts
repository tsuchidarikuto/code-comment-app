import { NextResponse, NextRequest } from 'next/server';
import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';
import type { OpenaiTypes } from '@/types';

export async function POST(req: NextRequest) {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


        const { prompt, model, system,schemaName } = (await req.json()) as OpenaiTypes;//プロンプト、モデル、システムプロンプト、スキーマ名を受け取る

        let schema;

        //スキーマ名によってスキーマを変更        
        if(schemaName === "analyzeComment"){ //コメント分析
            schema = z.object({
                score: z.number(),
                feedback: z.string(),
            });
        } else if(schemaName === "undefined"){//未定義
            schema = undefined;
        }

        console.log(`schemaName:${schemaName}`);
        console.log(schema);



        const completion = await openai.beta.chat.completions.parse({
            model: model,
            messages: [
                { role: "system", content: system },
                { role: "user", content: prompt },
            ],
            response_format: schema ? zodResponseFormat(schema, "schema"):undefined,
        });
        //スキーマが存在する場合はオブジェクトを、存在しない場合はテキストを返す 
        const response = schema ? completion.choices[0].message.parsed : completion.choices[0].message.content;
        console.log(response);

        return NextResponse.json(response);
    } catch (e) {
        console.error('Error during OpenAI API call:', e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
