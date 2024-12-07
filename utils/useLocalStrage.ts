import { ResultTypes,historyTypes } from "@/types";
import {v4 as uuidv4} from "uuid";

export function saveToLocalStorage(Result: ResultTypes,title:string,code:string): boolean {
    //ローカルストレージにデータを保存し、成功したらtrueを返す
    try{
        if(title === "" || code === "") return false;//タイトルとコードが空の場合は保存しない

        const exiistingData:historyTypes[] = JSON.parse(localStorage.getItem("result") || "[]");//ローカルストレージから既存のデータをオブジェクトの配列で取得.JSONに変換
        
        const currentData:historyTypes = {
            id:uuidv4(),
            title:title,
            code:code,
            scores:Result.scores,
            feedbacks:Result.feedbacks
        };

        exiistingData.push(currentData);//新しいデータを追加

        localStorage.setItem("result", JSON.stringify(exiistingData));//ローカルストレージに保存
        return true;
    }catch(e){
        console.error(e);
        return false;
    }
}
  
export function loadFromLocalStorage(): historyTypes[] {
    //ローカルストレージからデータを取得し、JSON形式で返す
    try{
        const data = JSON.parse(localStorage.getItem("result") || "[]");
        return data;
    }catch(e){
        console.error(e);
        return [];
    }
}