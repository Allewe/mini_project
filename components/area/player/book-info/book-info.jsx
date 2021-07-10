import { getLink } from '../../../../lib/utils'


const BookInfo = ({book, chapter}) => {
    return(
        <>
        <div className="info">
            <div>
                <img src={getLink(book)} alt={book.title} />
            </div>
            
            <div>
                <span className="title">{book.title}</span>
                <span className="author">{book.author.person.first_name + " " + book.author.person.last_name }</span>
                <div className="chapter">Chapitre : <span>{chapter}</span></div>
            </div>
        </div>
           
                
            
            <style jsx>
                {
                    `
                    .info{
                        display: flex;
                    }
                    .info div:first-child{
                        display : flex;
                        margin : 0 5px;
                        padding : 2px 0;
                        align-items: center;
                        justify-content :center;
                        
                        & > img{
                            width : 50px;
                            height : 55px;
                        }

                    }
                    .info div:last-child{
                        margin : 1px 2px; 
                        display : flex;
                        flex-direction : column;
                        align-items: flex-start;
                        justify-content :center;
                        margin : 0 0 5px;
                        
                        .title{
                            color: var(--primary);
                            font-size : 12px;
                        }
                        .author, .chapter{
                            font-size : 12px;
                            color : rgba(#fff, 0.8)
                        }

                        .chapter{
                            display: flex;
                            flex-direction : row;
                            & > span{
                                color : var(--primary);
                                margin-left : 5px;
                            }
                        }
                    }
                    
                    `
                }
            </style>
        </>
    )
}

BookInfo.defaultProps = {
    chapter : 1,
    book : {
        image : {
            url : ""
        }
    }
}

export default BookInfo