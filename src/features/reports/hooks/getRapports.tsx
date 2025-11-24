import { report } from "@/types/reports";

export async function getReports(type?:string,level?:number) {
    if (type && level){
        const result = await fetch("http://localhost:5173/api/v1/reports/types/"+type+"/level/"+level.toString(), {
        method: "get",
        })
        let repports:{"data":[report]} = await result.json()
        return repports;
    }
    else if (type){
        const result = await fetch("http://localhost:5173/api/v1/reports/types/"+type, {
        method: "get",
        })
        let repports:{"data":[report]} = await result.json()
        return repports;
    }
    else if (level){
        const result = await fetch("http://localhost:5173/api/v1/reports/levels/"+level, {
        method: "get",
        })
        let repports:{"data":[report]} = await result.json()
        return repports;
    }
    else{
        const result = await fetch("http://localhost:5173/api/v1/reports", {
        method: "get",
        })
        let repports:{"data":[report]} = await result.json()
        return repports;
    }  
}