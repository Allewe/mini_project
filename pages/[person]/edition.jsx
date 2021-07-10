import { staticPaths } from "../../lib/utils"



export default function Edition(){
    return(
        <>
            Edition
        </>
    )
}

export async function getStaticPaths(){   
    const slug = await staticPaths()
    return{
        paths : slug,
        fallback : false
    }
}

export async function getStaticProps(){
    return{
        props:{
            posts : []
        }
    }
}