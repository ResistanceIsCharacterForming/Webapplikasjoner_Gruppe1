import { report } from "@/types/reports";

export async function getReports(type?:string,level?:number) {
    if (type && level){
        const result = await fetch("http://localhost:5173/api/v1/reports/types/"+type+"/level/"+level.toString(), {
        method: "get",
        })
        let reports:{"data":[report]} = await result.json()
        return reports;
    }
    else if (type){
        const result = await fetch("http://localhost:5173/api/v1/reports/types/"+type, {
        method: "get",
        })
        let reports:{"data":[report]} = await result.json()
        return reports;
    }
    else if (level){
        const result = await fetch("http://localhost:5173/api/v1/reports/levels/"+level, {
        method: "get",
        })
        let reports:{"data":[report]} = await result.json()
        return reports;
    }
    else{
        const result = await fetch("http://localhost:5173/api/v1/reports", {
        method: "get",
        })
        let reports:{"data":[report]} = await result.json()
        return reports;
    }  
}