import { getLink } from "../../../../lib/utils"



const Profile = ({firstName, lastName, user}) =>{
    return(
        <>
            <div className="container">
                <div className="dot">
                    <span>
                        <img  className="icon" src="/icons/three-dots.svg" alt="info-user"/>
                    </span>    
                </div>
                <div className="image">
                    <img className="img" alt={firstName} src={getLink(user)}   />
                </div>
                <div className="name">
                    <span>
                        {
                            firstName + " " + lastName
                        }
                    </span>
                </div>
            </div>
            <style jsx>
                {
                    `
                        
                        .container{ 
                            width : 100%;
                            max-height : 240px;
                            height: 210px;
                            position: relative;
                            border-bottom : 1px solid var(--primary);
                        }
                        .image{
                            display : flex;
                           
                            position : absolute;
                            
                            left : 0;
                            transform : translate(100%, -50%);
                            margin : 0;
                                                        
                            & > img{
                                width : 100px;
                                height : 100px;
                                border-radius : 50%;
                            }
                        }
                        .name{
                            display: flex;
                            width : 100%;
                            height : 60%;
                            justify-content : center;
                            align-items: center;
                            margin-top : 20px ;
                            & > span{
                                color : var(--primary);
                            }
                        }
                        .dot{
                            display : flex;
                            width : 100%;
                            height : 76px;
                            justify-content: flex-end;
                            align-items : end;
                            background-color : gold;
                            & > span{
                                display : flex;
                                height: 16px;
                                width : 40px;
                                justify-content: flex-end;
                                margin : 0 5px;
                            }
                            
                        }
                    `
                }
            </style>
        </>

    )
}


export default Profile