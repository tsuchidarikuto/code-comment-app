export type OpenaiTypes={
    model:string;
    prompt:string;
    system:string;  
    schemaName:string; 
}

export type ResultTypes={
    scores: {
        knowledge:number;//基礎知識
        appropriateness:number;//適切性
        clarity:number;//明確性
        consistency:number;//一貫性
        usefulness:number;//有用性
    };
    feedbacks: {
        codeFeedback:string;//コードの読解に関するフィードバック
        commentFeedback:string;//コメントの適切さに関するフィードバック
    };    
}