import {useUser, useBook, useActive} from "../../lib/hooks"
import {useState, useEffect} from "react"
import Layout from "../layout/layout"
import Area from "../area/area"
import {getLink} from "../../lib/utils"
import {Icon} from "../book/icon"
import {Focus} from "../book/focus"

export const ShopContent = ({
    title,
    description,
    person,
    data,
    queryReader,
    queryBook,
}) => {
    const {user, isLoading, isError, mutate} = useUser(queryReader, person)
    const {books, load, err} = useBook(queryBook, data)
    const [select, setSelect] = useState({})
    const [focus, setFocus] = useState(false)
    const [active, chooseOption] = useActive()
    const [selectedBook, setSelectedBook] = useState({})

    useEffect(() => {
        setSelect(JSON.parse(localStorage.getItem("selectedBook")))
    }, [])

    const toggleOpenClose = () => setFocus(!focus)
    const chooseBook = (book) => setSelectedBook(book)

    if (isLoading || load) {
        return <div>...</div>
    }
    if (err || isError)
        return (
            <div>
                {err} <br /> isError
            </div>
        )

    return (
        <>
            <Layout title={title} description={description}>
                <Area
                    user={user}
                    active={active}
                    chooseOption={chooseOption}
                    selectedBook={select}
                    mutate={mutate}>
                    <div className="book-card-container">
                        <ul className="card-container">
                            {books.map((book) => (
                                <li
                                    className="card"
                                    key={book.id}
                                    onClick={() => {
                                        toggleOpenClose()
                                        chooseBook(book)
                                    }}>
                                    <div className="block">
                                        <span className="image">
                                            <img src={getLink(book)} />
                                            <span className="vector" />
                                        </span>
                                        <Icon />
                                        <span className="title">
                                            {book.title}
                                        </span>
                                        <span className="author">
                                            {book.author.person.first_name +
                                                " " +
                                                book.author.person.last_name}
                                        </span>
                                        <span className="icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="bi bi-three-dots"
                                                viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                            </svg>
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {focus && (
                            <>
                                <Focus
                                    toggleOpenClose={toggleOpenClose}
                                    mutate={mutate}
                                    selectedBook={selectedBook}
                                    user={user}
                                />
                            </>
                        )}
                    </div>
                </Area>
            </Layout>

            <style jsx>
                {`
                    .book-card-container {
                        overflow: hidden;
                        display: flex;
                        margin: 0;
                        padding: 5px;
                    }
                    .image {
                        position: relative;
                        display: flex;
                        margin: 20px 0;

                        & > .vector {
                            z-index: 1;
                            position: absolute;
                            background: #000;
                            bottom: 0;
                            left: 50%;
                            width: 20px;
                            height: 25px;
                            transform: translate(-50%, 100%);
                            &:before,
                            &:after {
                                content: "";
                                display: inline-block;
                                width: 0;
                                height: 0;
                                transform: translate(-1px, 8.2px);
                                border-style: solid;
                                border-width: 0 11px 15px 11px;
                                border-color: transparent transparent #fff
                                    transparent;
                            }
                            &:after {
                                transform: translate(-1px, -13.3px);
                                border-color: transparent transparent
                                    rgba(#ffd700, 0.2) transparent;
                                transition: border-color 0.3s;
                            }
                        }
                        & > img {
                            width: 125px;
                            height: 170px;
                            z-index: 2;
                        }
                    }
                    li {
                        list-style: none;
                        display: flex;
                        border-radius: 45px;
                        margin: 10px;
                    }

                    .card-container {
                        display: flex;

                        width: 100%;
                        overflow-y: auto;
                        padding: 0 10px;
                        margin: 0;
                        flex-wrap: wrap;
                        flex-direction: row;

                        justify-content: space-between;
                    }
                    .card {
                        background: rgba(#ffd700, 0.2);
                        width: 270px;
                        transition: background 0.3s;
                        :hover {
                            background: rgba(#ffd700, 0.5);
                            .vector:after {
                                border-color: transparent transparent
                                    rgba(#ffd700, 0.5) transparent;
                            }
                        }
                        .block {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;

                            width: 100%;
                        }
                        span.icon {
                            width: 35px;
                            height: 30px;
                        }
                        span.title {
                            margin: 5px 5px;
                            padding: 2px 2px;
                            font-size: 16px;
                            font-weight: 400;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        span.author {
                            font-size: 14px;
                            font-weight: 400;
                        }
                    }
                `}
            </style>
        </>
    )
}
