import {useEffect, useRef, useState} from "react"
import {mutate as mutateWithKey} from "swr"
import {gql} from "graphql-request"
import {useBook} from "../../../lib/hooks"
import {fetcherGraphQL} from "../../../lib/utils"
import {Focus} from "../../book/focus"

const GET_BOOKS = gql`
    {
        books {
            id
            title
            description
            price
            image {
                url
            }
            categories
            author {
                id
                person {
                    first_name
                    last_name
                    image {
                        url
                    }
                }
            }
        }
    }
`
const categories = [
    "all",
    "developpement",
    "humour",
    "scolaire",
    "sciences",
    "histoire",
    "theatre",
    "fiction",
]

const Books = ({filterBook, active, text, setData}) => {
    const [param] = useState(["title", "first_name", "last_name"])
    const {books, load, err} = useBook(GET_BOOKS, filterBook)

    const searchItem = (element) => {
        return element.filter((item) => {
            if (item.categories === active) {
                return param.some((newItem) => {
                    if (newItem === param[0]) {
                        return (
                            item[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(text) > -1
                        )
                    } else {
                        return (
                            item.author.person[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(text) > -1
                        )
                    }
                })
            } else if (active === "all") {
                return param.some((newItem) => {
                    if (newItem === param[0]) {
                        return (
                            item[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(text) > -1
                        )
                    } else {
                        return (
                            item.author.person[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(text) > -1
                        )
                    }
                })
            }
        })
    }
    if (load) return <div>...</div>
    if (err) return <div>{err}</div>
    return searchItem(books).map((book) => {
        return (
            <li
                key={book.id}
                className="search-item"
                onClick={() =>
                    setData((element) => ({
                        ...element,
                        books: book,
                        focus: true,
                    }))
                }>
                <span>{book.title}</span>
                <style jsx>
                    {`
                        .search-item span {
                            margin: 5px;
                            display: inherit;
                            color: #fff;
                            justify-content: center;
                        }
                        .search-item {
                            display: flex;
                            justify-content: center;
                            margin: 5px;
                            padding: 0;
                        }
                    `}
                </style>
            </li>
        )
    })
}

const Search = ({user, mutate, searchFollow}) => {
    const [filterBook, setFilterBook] = useState({books: []})
    const search = useRef(null)
    const [focus, setFocus] = useState(false) //false
    const [text, setText] = useState("")
    const [active, setActive] = useState("all")
    const [data, setData] = useState({
        books: {},
        focus: false,
    })
    useEffect(() => {
        if (!focus) {
            search.current.addEventListener("mouseover", () => {
                mutateWithKey(
                    GET_BOOKS,
                    fetcherGraphQL(GET_BOOKS).then((res) =>
                        setFilterBook((el) => ({...el, ...res}))
                    )
                )
            })
            return search.current.removeEventListener("mouseover", () => {})
        }
    }, [data.books, filterBook.books.length, focus])

    const textChange = (event) => setText(event.target.value.toLowerCase())
    const focusArea = () => {
        setFocus(!focus)
    }

    const isActive = (event) => {
        setActive(event.target.id)
    }
    const dataCloseFoocus = () => {
        setData((el) => ({
            ...el,
            focus: !data.focus,
        }))
    }

    return (
        <>
            <div className="bar" onClick={focusArea} ref={search}>
                <input
                    placeholder="ex: pere riche pere pauvre"
                    type="text"
                    name="search"
                    className="search"
                />
                <span className="bar-icon">
                    <img src="/icons/search-solid.svg" alt="search" />
                </span>
            </div>

            {focus && (
                <>
                    <div className="focus">
                        <div className="header">
                            <div className="bar-focus bar">
                                <input
                                    autoFocus
                                    placeholder="ex: pere riche pere pauvre"
                                    type="text"
                                    onChange={textChange}
                                    id="search"
                                    name="search"
                                    className="search"
                                />
                                <span className="bar-icon icon-focus">
                                    <img
                                        src="/icons/search-solid.svg"
                                        alt="search"
                                    />
                                </span>
                            </div>
                            <span className="close" onClick={focusArea}>
                                <img src="/icons/x-lg.svg" alt="fermer focus" />
                            </span>
                        </div>

                        <div className="body">
                            <ul className="filter">
                                {categories.map((categorie) => (
                                    <li
                                        id={categorie}
                                        onClick={isActive}
                                        key={categorie}
                                        className={`option ${
                                            active === categorie ? "active" : ""
                                        }`}>
                                        {categorie}
                                    </li>
                                ))}
                            </ul>
                            <div className="focus-container">
                                <ul>
                                    {!data.focus ? (
                                        <Books
                                            filterBook={filterBook}
                                            active={active}
                                            text={text}
                                            setData={setData}
                                        />
                                    ) : (
                                        <Focus
                                            toggleOpenClose={dataCloseFoocus}
                                            mutate={mutate}
                                            selectedBook={data.books}
                                            user={user}
                                            follow={searchFollow}
                                        />
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <style jsx>
                {`
                    .focus {
                        position: fixed;
                        display: flex;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        z-index: 100;
                        flex-direction: column;
                        background: rgba(#000, 0.8);

                        .body {
                            display: flex;
                            flex: 1;
                        }
                    }
                    .header {
                        background: #000;
                        display: flex;
                        width: 100%;
                        justify-content: center;
                        align-items: center;
                        position: relative;

                        .close {
                            width: 50px;
                            height: 50px;
                            display: flex;
                            position: absolute;
                            border-radius: 50%;
                            justify-content: center;
                            align-items: center;
                            right: 10px;

                            top: 5px;
                            transition: background 0.4s;
                            img {
                                width: 25px;
                                height: 25px;
                            }
                            :hover {
                                background: rgba(#fff, 0.8);
                            }
                        }
                    }
                    .bar-focus {
                        background: #fff !important;
                        margin-top: 10px !important;
                        margin-left: 20px !important;
                        height: 40px !important;
                        animation: changeWidth 0.5s !important;
                        --webkit-animation: changeWidth 0.5s !important;
                    }

                    .focus-container {
                        display: flex;
                        overflow: auto;
                        margin: 20px 0 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        flex-direction: column;

                        ul {
                            padding: 0;
                            margin: 0;
                        }
                    }

                    .filter {
                        display: flex;
                        flex-direction: column;
                        margin: 10px 0 0;
                        padding: 0;
                        justify-content: center;
                        align-items: center;
                        border-right: 1px solid #ffd700;

                        li {
                            justify-content: center;
                            align-items: center;
                            width: 290px;
                            display: flex;
                            color: #fff;
                            padding: 5px;
                            margin: 5px;
                            cursor: pointer;
                            transition: background 0.3s;
                            &:hover {
                                background: rgba(#ffd700, 0.5);
                            }
                        }

                        .active {
                            background: rgba(#ffd700, 0.5);
                        }
                    }

                    .bar {
                        display: flex;
                        border: 2px solid gold;
                        border-radius: 20px;
                        margin: 1px;
                        padding: 5px;
                        width: 350px;
                        background-color: #fff;
                        transition: transform 0.5s;

                        &:hover {
                            transform: scaleX(1.1);
                        }
                        & > input {
                            width: 100%;
                        }

                        input {
                            border: none;
                            height: 100%;
                            width: 100%;
                            font-size: 14px;
                        }
                    }
                    input:focus {
                        outline: none;
                    }
                    .bar-icon {
                        display: flex;
                        margin: 3px;
                    }

                    @-webkit-keyframes changeWidth {
                        from {
                            width: 0;
                        }
                        25% {
                            width: 70px;
                        }
                        50% {
                            width: 175px;
                        }
                        75% {
                            width: 260px;
                        }
                        to {
                            width: 350px;
                        }
                    }
                    @keyframes changeWidth {
                        from {
                            width: 0;
                        }
                        25% {
                            width: 70px;
                        }
                        50% {
                            width: 175px;
                        }
                        75% {
                            width: 260px;
                        }
                        to {
                            width: 350px;
                        }
                    }
                `}
            </style>
        </>
    )
}
export default Search
