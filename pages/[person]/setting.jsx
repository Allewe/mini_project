import { staticPaths } from "../../lib/utils"
import Layout from "../../components/layout/layout"


const Setting = () =>{
    return(
        <>
            <Layout>
                
            </Layout>
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

export default Setting