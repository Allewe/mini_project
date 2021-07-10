import { gql } from 'graphql-request'
import {useRouter}from 'next/router'
import { useEffect, useState } from 'react'
//import {compareSync} from 'bcryptjs'
import { fetcherGraphQL } from '../lib/utils'



const GET_USER = gql`
query($email : String!){
  people(where : {email : $email}){
    id
    email
   	password
  	slug
  }
}
`



export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({
    err : false,
    msg : ""
  })

  useEffect(()=>{
    console.log(password)
  }, [password])

  const onEmail = event => {
    setEmail(event.target.value)
    setError({err : false, msg : ""})
  }
  const onPassword = event => {
    setPassword(event.target.value)
    setError({err : false, msg : ""})
  }
  const onSend = async event => {
    event.preventDefault()

    const variables = {
      email : email,
    }
    const data = await fetcherGraphQL(GET_USER, variables).catch(err => console.log(err))
    let people = data ? data.people : []
    const user = {
      id : "",
      dbPassword : "",
      slug : "",  
    } 
    
    console.log(people)
    
    if(people.length > 0 ){
      user.id = people[0].id
      user.dbPassword = people[0].password
      user.slug = people[0].slug
      console.log(user)
    }else{
      return setError({err : true, msg : "email incorrect"})
    }
  
    
    //if(compareSync(password, user.dbPassword)){}
    if(password === user.dbPassword){
        router.push(`/${user.slug}/library`)  
    }else{
      setError({err : true, msg : "mot de passe incorrect"})
    }
    
  }
  return(
    <>
      <div className="container">
        <form className="form">
          <label htmlFor="email" className="label">
            Email
            <input className="input" type="email" name="email" id="email" onChange={onEmail} />
          </label>
          <label htmlFor="password" className="label">
            Password
            <input className="input" type="password" name="password" id="password" minLength="6" onChange={onPassword} />
          </label>
          <button className="btn" type="submit" onClick={onSend}>Envoyer</button>
        </form>
        {error.err && <span className = "error">{error.msg}</span>}
      </div>
      <style jsx>
        {
          `.container{
            width : 100vw;
            height : 100vh;
            flex-direction: column;
          }
          .label{
            
          }
            .container, .form, .label{
              display : flex;
              
              justify-content : center;
              align-items : center;
            }
            .form{
              background: #FFD700;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 220px 4px 0px rgba(0, 0, 0, 0.8);
              border-radius: 144px;
              border : 1px solid black;
              height : 370px;
              width : 500px;
            }
            .form, .label{
              flex-direction : column;
            }
            .input{
              margin : 5px 8px;
              width : 290px;
              height : 40px;
              border-radius : 20px;
              :focus{
                outline : none;
              }
            }
            .btn{
              margin : 8px 0;
              background : none;
              border: 1px solid black;
              border-radius : 20px;
              width : 100px;
              height : 30px;
              background : #fff;
              transition : transform 0.3s opacity 0.4s ease-in;
              :hover{
                transform : scale(1.1);
                opacity : 0.9;
              } 
              
            }
            .error, .msg{
              margin-top: 15px;
              font-size : 10px;
              color : red;
              transition : color 0.7s;
            }
            .msg{
              color : inherit;
             
            }
          `
        }
      </style>
    </>
  )
}

