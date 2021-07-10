


const Option = ({active, chooseOption}) =>{

   
    return(
        <>
            <div className="option">
                <span className={`choose read ${(active === 'read') && 'active' }`} id="read" onClick={() => chooseOption("read")}>
                    <span className="icon i-read" />
                </span>

                <span className={`choose listen ${(active === 'listen') && 'active' }`} id="listen" onClick={()=> chooseOption("listen")}>
                    <span className="icon i-listen"/>
                </span>
            </div>
            <style jsx>
                {
                    `
                        .option{
                            margin : 0 1px;
                            display : flex;
                        }
                        .choose{
                            margin : 0 5px;
                            padding : 5px 7px;
                            border-radius : 50%;
                            width: 40px;
                            height: 40px;
                            display : flex;
                            justify-content : center;
                            align-items : center;
                            transition : background 0.4s;
                            .icon{
                                margin-left : 2px;
                                margin-bottom : 2px;
                                width: 20px;
                                height: 20px;
                                transition : background 0.3s;
                            }
                            :hover{
                                background : rgba(#000, 0.8);
                                
                            }
                        }
                        .read{
                            .icon{
                                background : center no-repeat url("/icons/book.svg");
                            }

                        }
                        .listen{
                            
                            .icon{
                                
                                background : center no-repeat  url("/icons/headphones.svg");
                            }
                            
                        }

                        .active {
                                background: #ffd700 !important;
                            
                                .i-listen{
                                    background : center no-repeat  url("/icons/headphones-black.svg") !important ;
                                }
                                .i-read{
                                    background : center no-repeat url("/icons/book-black.svg") !important ;
                                }


                        }   
                           
                        
                    
                        
                        
                    `
                }
            </style>
        </>
    )
}


export default Option




