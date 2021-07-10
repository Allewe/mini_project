import Layout from "../layout/layout"
import {useAuthor, useUser, useFollow} from "../../lib/hooks"
import {itemsNavbar, settingNavbar} from "../area/navbar/navbar"
import Option from "../area/header/option"
import {getLink, fetcherGraphQL} from "../../lib/utils"
import {useEffect, useState} from "react"
import {NavBar} from "./navbar"
import {Player} from "./player"
import {Authors} from "./authors"
import useSWR from "swr"
import {gql} from "graphql-request"
import {ProfileItem} from "./profile-item"
import {Post} from "./post"
const GET_AUTHORS = gql`
    query {
        authors {
            id
            person {
                first_name
                last_name
                image {
                    url
                }
            }
            posts {
                id
                legend
                like
                file {
                    id
                    url
                    name
                }
                comments {
                    id
                    comment
                    reader {
                        id
                    }
                }
            }
        }
    }
`
export const Actualites = ({title, description, reader, queryReader}) => {
    const {user, isError, isLoading, mutate} = useUser(queryReader, reader)
    const {person, authors} = user
    const [selectedBook, setSelectedBook] = useState({})
    const {data, error} = useSWR(GET_AUTHORS, fetcherGraphQL)
    const {suggestion, follow} = useAuthor(data?.authors, authors)

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem("selectedBook"))
        setSelectedBook(storage)
        console.log(suggestion, follow)
    }, [])

    const readerName = person.first_name + " " + person.last_name
    if (isLoading || !data) return <div>...</div>
    if (isError || error) return <div>{isError}</div>

    return (
        <>
            <Layout title={title} description={description}>
                <header className="header">
                    <nav>
                        <ul className="welcome">
                            <svg
                                width="35"
                                height="28"
                                viewBox="0 0 35 28"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.25 5.14286H33.75C34.4404 5.14286 35 4.63121 35 4V1.14286C35 0.511643 34.4404 0 33.75 0H1.25C0.559609 0 0 0.511643 0 1.14286V4C0 4.63121 0.559609 5.14286 1.25 5.14286ZM1.25 16.5714H33.75C34.4404 16.5714 35 16.0598 35 15.4286V12.5714C35 11.9402 34.4404 11.4286 33.75 11.4286H1.25C0.559609 11.4286 0 11.9402 0 12.5714V15.4286C0 16.0598 0.559609 16.5714 1.25 16.5714ZM1.25 28H33.75C34.4404 28 35 27.4884 35 26.8571V24C35 23.3688 34.4404 22.8571 33.75 22.8571H1.25C0.559609 22.8571 0 23.3688 0 24V26.8571C0 27.4884 0.559609 28 1.25 28Z" />
                            </svg>
                            <span>Bonjour, {person.first_name}</span>
                        </ul>
                        <ul className="search">
                            <input type="text" id="search" className="" />
                        </ul>
                        <ul className="option">
                            <Option />
                        </ul>
                    </nav>
                </header>
                <div className="container">
                    <div className="left">
                        <div className="profile">
                            <img src={getLink(person)} alt={readerName} />
                            <span className="name">{readerName}</span>
                        </div>
                        <NavBar
                            itemsNavbar={itemsNavbar}
                            settingNavbar={settingNavbar}
                            person={person}
                        />
                        <Player selectedBook={selectedBook} />
                    </div>
                    <div className="center">
                        {follow?.map((author) => {
                            if (author.posts.length > 0) {
                                return (
                                    <Post
                                        post={author?.posts[0]}
                                        author={author}
                                        user={user}
                                        mutate={mutate}
                                    />
                                )
                            }
                        })}
                    </div>

                    <div className="right">
                        <Authors name="Suggestions" authors={suggestion}>
                            {suggestion?.map((author) => (
                                <ProfileItem
                                    key={author.id}
                                    type={"suggestions"}
                                    author={author}
                                    user={user}
                                    mutate={mutate}
                                />
                            ))}
                        </Authors>
                        <Authors type="follow" name="Abonnés">
                            {follow?.map((author) => (
                                <ProfileItem
                                    key={author.id}
                                    type={"follow"}
                                    action={() => console.log("definir")}
                                    author={author}
                                    user={user}
                                    mutate={mutate}
                                />
                            ))}
                        </Authors>
                    </div>
                </div>
            </Layout>

            <style jsx>
                {`
                    //others
                    $radius-area: 50px;
                    $padding-area: 15px;
                    //sizes
                    $profile-image: 50px;
                    $large-size: 100%;

                    //colors
                    $color-primary: rgba(#000, 0.8);
                    $color-secondary: rgba(#ffd700, 0.6);
                    $color-third: #fff;
                    //mixins
                    @mixin flex-position($align: center, $justify: center) {
                        display: flex;
                        justify-content: $justify;
                        align-items: $align;
                    }
                    //styles
                    .container {
                        width: $large-size;
                        height: $large-size;
                        padding: $padding-area;
                        display: flex;
                    }
                    div.left {
                        display: flex;
                        flex-direction: column;
                        max-width: 236px;
                        max-height: $large-size;
                        width: $large-size;
                        height: $large-size;
                    }
                    div.profile {
                        width: $large-size;
                        display: flex;
                        padding: 5px;
                        border-radius: $radius-area;
                        max-height: 60px;
                        height: $large-size;
                        @include flex-position($justify: flex-start);
                        background: $color-secondary;
                        & > img {
                            width: $profile-image;
                            height: $profile-image;
                            border-radius: 50%;
                        }
                        & > span.name {
                            flex: 1;
                            padding: 5px 5px 10px;
                            @include flex-position;
                        }
                    }

                    div.right {
                        display: flex;
                        max-width: 236px;
                        flex-direction: column;
                        max-height: $large-size;
                        width: $large-size;
                        height: $large-size;
                    }
                    div.center {
                        @include flex-position($justify: flex-start);
                        flex-direction: column;
                        flex: 1;
                        overflow-y: auto;
                        ::-webkit-scrollbar {
                            width: 5px;
                        }
                        ::-webkit-scrollbar-track {
                            box-shadow: inset 0 0 5px grey;
                            border-radius: 5px;
                        }
                        ::-webkit-scrollbar-thumb {
                            background: $color-secondary;
                            border-radius: 5px;
                        }
                    }

                    .header {
                        width: $large-size;
                        height: 86px;
                        padding: 0;
                        margin: 0;
                        display: flex;
                        background: $color-primary;
                        & > nav {
                            width: $large-size;
                            display: flex;
                            position: relative;
                        }
                        ul {
                            flex: 1;
                            margin: 0;
                            padding: $padding-area;
                        }
                        ul.option {
                            @include flex-position($justify: flex-end);
                        }
                        ul.welcome {
                            @include flex-position($justify: flex-start);
                            & > span {
                                color: $color-third;
                                margin: 10px;
                                font-size: 12px;
                            }
                            & > svg {
                                width: 25px;
                                height: 25px;
                                color: $color-secondary;
                            }
                        }
                        ul.search {
                            position: absolute;
                            left: 50%;
                            top: 0;
                            transform: translate(-50%, 0);
                            border-radius: 50px 50px 0px 0px;
                            @include flex-position;
                            background: $color-secondary;
                            max-width: 445px;
                            width: $large-size;
                            height: $large-size;
                            padding: $padding-area;
                            & > input {
                                padding: 0 5px;
                                font-size: 16px;
                                max-width: 360px;
                                max-height: 50px;
                                height: $large-size;
                                width: $large-size;
                                outline: none;

                                border-radius: 50px;
                                border: none;
                            }
                        }
                    }
                `}
            </style>
        </>
    )
}
