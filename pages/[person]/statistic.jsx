import { staticPaths } from "../../lib/utils"

const Statistic = () =>{
    
    return(
        <>
            Allewe
        </>
    )
}


export async function getStaticProps(){
    return{
        props:{
            author : []
        }
    }
}



export async function getStaticPaths(){
    const slug  = staticPaths(data)
    return{
        paths : slug,
        fallback : false
    }
}

 


export default Statistic