import { useEffect, useRef, useState } from "react"
import { getLink } from '../../../lib/utils'
import PDFJs from "../../../lib/pdf"
import BookInfo from "../player/book-info/book-info"

const Bar = ({click}) =>{
    
    return(
        <>
            <div className="bar" onClick={click} />

            <style jsx>
                {
                    `
                    .bar{
                        
                        position : fixed;
                        bottom : 10px;
                        right : 20px;
                        width : 40px; 
                        height : 40px;
                        border-radius : 50%;
                        background : no-repeat center url('/icons/x-lg.svg') #000;
                        transition : transform 0.3s;
                        :hover{
                            transform : scale(1.1);
                        }
                    }
                    `
                } 
            </style>
        </>
    )
}



const PDFViewer = ({src, close, backend, large}) =>{
    const viewer = useRef(null)
    const link = getLink(src, 'pdf')
    const back = new backend()
    
    useEffect(() =>{
        if(large){
            const element = viewer.current
            back.init(link, element)
        }
        
    }, [large])
  

   

    


    
    
    
    return(
        <>
            <div className="pdf-container">
                <Bar click={close} />
                <div className="viewer" ref={viewer} />

            </div>
            
            <style jsx>
                {
                    `
                        .pdf-container{
                            position : fixed;
                            z-index : 1000;
                            top : 0;
                            left: 0;
                            width : 100vw;
                            height: 100vh;
                            background : rgba(#fff, 0.9);
                        }
                        .viewer{
                            width : 100%;
                            height: 100%;
                        }
                    
                    
                    
                    
                    `
                }
            </style>
        </>
    )
}




const Reader = ({books}) =>{
    const [large, setLarge] = useState(false)

    const closeViewer = () => setLarge(!large)
    return(

        <>
            <footer className="reader" onClick={closeViewer} >
                <BookInfo book={books} />
                {
                    large && <PDFViewer close={closeViewer} src={ books.written_book} backend={PDFJs} large={large} /> 
                    
                }
            </footer>

            <style jsx>
                {
                    `
                        .reader{
                            animation : changeWidth 0.5s !important;
                            --webkit-animation: changeWidth 0.5s !important;
                            height : 80px;
                            width : 100%;
                            padding : 10px;
                            background : rgba(#000, 0.8);
                        }
                        @-webkit-keyframes changeWidth{
                            from{ transform : translateY(100%)};
                            to { transform : translateY(0%); }

                        }
                        @keyframes changeWidth{
                            from{ transform : translateY(100%)};
                            to { transform : translateY(0%); }

                        } 
                    
                    
                    `
                }
            </style>
        </>
    )
}


export {Reader}