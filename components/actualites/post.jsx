import {gql} from "graphql-request"
import {useEffect, useRef, useState} from "react"
import {mutate as mutateWithKey} from "swr"
import {fetcherGraphQL, getLink} from "../../lib/utils"

export const Post = ({post, author, user, mutate}) => {
    const {person} = author
    const [scroll, setScroll] = useState(0)
    const [like, setLike] = useState(false)
    const [comment, setComment] = useState("")
    const [button, setButton] = useState(false)
    const [selectedSlide, setSelectedSlide] = useState(0)
    const scrollRef = useRef(null)
    useEffect(() => {
        const index = scroll / 240
        setSelectedSlide(index)
    }, [scroll, like])

    useEffect(() => {
        if (comment !== "") setButton(true)
        else setButton(false)
    }, [comment, post.comments.length])

    const onScroll = (event) => {
        const element = event.target
        setScroll(Math.floor(element.scrollLeft))
    }
    const onChange = (event) => {
        setComment(event.target.value)
    }
    const changeIndex = (event) => {
        console.log(event.target.attributes.label.value)
        const value = event.target.attributes.label.value * 240
        console.log(value)
        scrollRef.current.scrollLeft = value
    }
    const makeComment = () => {
        console.log("commentaire effectue")
        const comments = post.comments.map(({comment, reader}) => ({
            comment: comment,
            reader: reader.id,
        }))
        comments.push({comment: comment, reader: user.id})
        console.log(comments)
        const UPDATE_POST = gql`
            mutation (
                $comments: [editComponentCommentsCommentInput!]
                $post_id: ID!
            ) {
                updatePost(
                    input: {data: {comments: $comments}, where: {id: $post_id}}
                ) {
                    post {
                        id
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
        const variable = {
            comments: comments,
            post_id: post.id,
        }
        mutateWithKey(
            [UPDATE_POST, variable],
            fetcherGraphQL(UPDATE_POST, variable)
        )
        mutate()
        setComment("")
        console.log("commentaire effectue")
    }
    const toLike = () => setLike(!like)
    const host = process.env.NEXT_PUBLIC_HOST
    const name = person.first_name + " " + person.last_name
    return (
        <>
            <div className="post">
                <div className="post-image">
                    <div className="slider" ref={scrollRef} onScroll={onScroll}>
                        {post?.file.map((file, index) => (
                            <img
                                key={index}
                                id={file.id}
                                src={`${host}${file.url}`}
                                alt={file.name}
                            />
                        ))}
                    </div>
                    <span className="dots">
                        {post?.file.length <= 1
                            ? ""
                            : post?.file.map((file, index) => (
                                  <a
                                      className={`dot ${
                                          selectedSlide === index && "active"
                                      }`}
                                      key={file.id}
                                      href="#"
                                      label={index}
                                      onClick={changeIndex}
                                  />
                              ))}
                    </span>
                </div>
                <div className="post-body">
                    <div className="header">
                        <img src={getLink(person)} alt="" srcset="" />
                        <span className="name">{name}</span>
                    </div>
                    <p className="legend">{post?.legend}</p>
                    <div className="footer">
                        <div className="comments">
                            <span className="comment">
                                <span className="length">
                                    {post.comments.length}
                                </span>

                                <input
                                    placeholder="commentaire"
                                    type="text"
                                    onChange={onChange}
                                    value={comment}
                                />
                                {button && (
                                    <button
                                        className="send"
                                        onClick={makeComment}>
                                        Envoyer
                                    </button>
                                )}
                            </span>
                        </div>
                        <span className="action">
                            <svg
                                onClick={toLike}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className={`${
                                    like ? "to-like" : ""
                                } bi bi-heart-fill`}
                                viewBox="0 0 16 16">
                                <path
                                    fill-rule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-share-fill"
                                viewBox="0 0 16 16">
                                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
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
                    div.post {
                        display: flex;
                        background: $color-third;
                        box-shadow: 0px 4px 148px -12px rgba(#000, 0.25);
                        border-radius: 20px;
                        max-height: 330px;
                        max-width: 745px;
                        width: 100%;
                        height: 100%;
                        padding: 5px 0 10px;
                        margin: 5px 40px;
                        & > div.post-image {
                            display: flex;
                            flex-direction: column;
                        }
                        & > div.post-body {
                            display: flex;
                            padding-left: 10px;
                            flex: 1;
                            flex-direction: column;
                        }
                    }
                    div.footer {
                        display: flex;
                        margin: 15px 0 0;
                        justify-content: space-between;
                        & > div.comments {
                            display: flex;
                            background: $color-primary;
                            padding: 0 0 0 5px;
                            border-radius: 50px;
                        }
                    }
                    button.send {
                        border-radius: 50px;
                        margin: 0 14px;
                        display: flex;
                        background: $color-secondary;
                        @include flex-position;
                        padding: 10px;
                        font-size: 10px;
                        border: none;
                        height: 25px;
                        animation: changeWidth 0.4s !important;
                        --webkit-animation: changeWidth 0.4s !important;
                    }
                    span.comment {
                        @include flex-position;

                        & > span.length {
                            margin: 5px 0;
                            width: 25px;
                            height: 25px;
                            background: $color-secondary;
                            @include flex-position;
                            border-radius: 50%;
                            font-size: 8px;
                        }
                        & > input {
                            border-radius: 50px;
                            text-overflow: ellipsis;
                            border: none;
                            padding: 0 5px;
                            margin: 0 5px;
                            height: 25px;
                            &:focus {
                                outline: none;
                            }
                        }
                    }
                    span.action {
                        @include flex-position;
                        & > svg {
                            margin: 0 20px 0 0;
                            width: 30px;
                            height: 30px;
                        }
                        svg.to-like {
                            color: $color-secondary;
                        }
                    }
                    p.legend {
                        font-size: 13px;
                        height: 95px;

                        overflow: auto;
                        ::-webkit-scrollbar {
                            width: 2px;
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
                    div.header {
                        display: flex;
                        padding: 5px;
                        & > img {
                            width: 70px;
                            height: 70px;
                            border-radius: 50%;
                        }
                        & > span.name {
                            @include flex-position;
                            padding: 10px 10px 20px;
                        }
                    }
                    span.dots {
                        display: flex;
                        @include flex-position;
                        margin: 5px 0;
                        & > a {
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            margin: 0 5px;
                            background: $color-primary;
                        }
                        a.active {
                            background: $color-secondary;
                        }
                    }

                    div.slider {
                        display: flex;
                        overflow-x: scroll;
                        scroll-snap-type: x mandatory;
                        scroll-behavior: smooth;
                        max-width: 240px;
                        height: 285px;
                        ::-webkit-scrollbar {
                            width: 0px;
                        }
                        & > img {
                            width: 100%;
                            padding: 2px 5px 0;

                            min-width: 240px;
                            height: 100%;
                            border-radius: 20px;
                            scroll-snap-align: start;
                        }
                    }
                    @-webkit-keyframes changeWidth {
                        from {
                            transform: translateX(-100%);
                        }
                        to {
                            transform: translateX(0%);
                        }
                    }
                    @keyframes changeWidth {
                        from {
                            transform: translateX(-100%);
                        }
                        to {
                            transform: translateX(0%);
                        }
                    }
                `}
            </style>
        </>
    )
}
