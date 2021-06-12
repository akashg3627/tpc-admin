const branches =["BTech-CSE","BTech-EE","BTech-ME","BTech-CE","BTech-MEMS","MTech-ME", "MSc-EE"]
export const branchOptions = branches.map((b)=>{
    return{
        value: b,
        label: b
    }
})
const years =["2018", "2019" ,"2020","2021"];
export const yearOptions = years.map((y)=>{
    return{
        value: y,
        label: y
    }
})

const status=["upcoming", "open", "closed"];
export const statusOptions = status.map((s)=>{
    return{
        value: s,
        label: s
    }
})

export const baseURL='https://iiti-tpc-backend.herokuapp.com/';