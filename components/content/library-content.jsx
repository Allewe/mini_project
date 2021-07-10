import {useActive, useFollow, useSelectedBook, useUser} from "../../lib/hooks"
import {getLink} from "../../lib/utils"
import Layout from "../layout/layout"
import Area from "../area/area"
import Option from "../area/header/option"
import {useEffect} from "react"

export const LibraryContent = ({queryUser, person, title, description}) => {
    const [active, chooseOption] = useActive()
    const {user, isLoading, isError, mutate} = useUser(queryUser, person)
    const [selectedBook, setSelectedBook] = useSelectedBook(
        user.books.length > 0
            ? user.books[0]
            : {
                  author: {
                      person: {
                          first_name: "",
                          last_name: "",
                          image: {
                              url: "",
                          },
                      },
                  },
                  image: {
                      url: "",
                  },
              }
    )
    const [follow, toFollowUnfollow] = useFollow(
        selectedBook?.author,
        user,
        mutate
    )

    useEffect(() => {
        console.log(user)
    }, [follow])

    const chooseBook = (book) => {
        if (book.id === selectedBook.id) {
            return setSelectedBook(selectedBook)
        } else {
            return setSelectedBook(book)
        }
    }

    if (isLoading) {
        return <div>...</div>
    }
    if (isError)
        return (
            <div>
                isError <br />
                {err}
            </div>
        )

    return (
        <>
            <Layout title={title} description={description}>
                <Area
                    user={user}
                    mutate={mutate}
                    active={active}
                    chooseOption={chooseOption}
                    selectedBook={selectedBook}
                    follow={follow}>
                    <div className="library">
                        <div className="selected-book">
                            <div className="book-image">
                                <span>
                                    <span className="image">
                                        <img
                                            src={getLink(selectedBook)}
                                            alt={selectedBook.title}
                                        />
                                    </span>

                                    <Option
                                        active={active}
                                        chooseOption={chooseOption}
                                    />
                                </span>
                            </div>
                            <div className="book-info">
                                <div className="book-author">
                                    <span className="author-image">
                                        <img
                                            src={getLink(
                                                selectedBook.author.person
                                            )}
                                            alt={
                                                selectedBook.author.person
                                                    .firstname +
                                                " " +
                                                selectedBook.author.person
                                                    .last_name
                                            }
                                        />
                                    </span>

                                    <div className="choose">
                                        <span>
                                            <span className="book-title">
                                                {selectedBook.title}
                                            </span>
                                            <span className="author-name">
                                                {selectedBook.author.person
                                                    .first_name +
                                                    " " +
                                                    selectedBook.author.person
                                                        .last_name}
                                            </span>

                                            {follow ? (
                                                <button
                                                    onClick={toFollowUnfollow}
                                                    name="unfollow">
                                                    se desabonner
                                                </button>
                                            ) : (
                                                <button
                                                    name="follow"
                                                    onClick={toFollowUnfollow}>
                                                    s'abonner
                                                </button>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="book-description">
                                    <p>{selectedBook.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="slider-book">
                            <div className="books">
                                {user.books.map((book) =>
                                    selectedBook.id === book.id ? (
                                        ""
                                    ) : (
                                        <span
                                            className="book"
                                            onClick={() => chooseBook(book)}
                                            key={book.id}>
                                            <img
                                                src={getLink(book)}
                                                alt={book.title}
                                            />
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </Area>
            </Layout>

            <style jsx>
                {`
                    .books {
                        display: flex;
                        overflow-x: auto;
                        background: rgba(#000, 0.8);
                        width: 100%;
                        height: 100%;
                        padding: 5px;
                        align-items: center;
                        flex-direction: row;
                        .book {
                            padding: 10px;
                            background: #ffd700;
                            display: flex;
                            border-radius: 30px;
                            justify-content: center;
                            align-items: center;
                            flex-basis: 15%;
                            height: 200px;
                            width: 200px;
                            margin: 2px 15px;
                            & > img {
                                width: 90px;
                                height: 150px;
                            }
                        }
                    }
                    .book-description {
                        display: flex;

                        & > p {
                            height: 150px;
                            overflow: auto;
                            text-overflow: ellipsis;
                            font-size: 14px;

                            ::-webkit-scrollbar {
                                width: 5px;
                            }
                            ::-webkit-scrollbar-track {
                                border-radius: 10px;
                                background: rgba(#000, 0.8);
                            }
                            ::-webkit-scrollbar-thumb {
                                background: #ffd700;
                                height: 5px;
                                border-radius: 10px;
                            }
                        }
                    }
                    .library {
                        display: inherit;
                        width: 100%;
                        height: 100%;
                        flex-direction: inherit;
                        .selected-book,
                        .slider-book {
                            display: flex;
                            flex-basis: 50%;
                            flex: 1;
                        }
                    }
                    .selected-book {
                        & > div {
                            display: flex;
                            flex-basis: 50%;
                        }
                        .book-image {
                            justify-content: center;
                            align-items: center;

                            .image {
                                background: #ffd700;
                                width: 200px;
                                height: 220px;
                                border-radius: 30px;
                                margin-bottom: 20px;
                                & > img {
                                    width: 110px;
                                    height: 170px;
                                }
                            }
                            span {
                                border-radius: 70px;
                                width: 305px;
                                display: flex;
                                flex-direction: column;
                                background: rgba(#000, 0.8);
                                height: 330px;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                        .book-info {
                            flex: 1;
                            padding: 5px;
                            margin: 5px 15px;
                            flex-direction: column;
                            .book-author {
                                flex: 1;
                                display: flex;
                            }
                            .book-author {
                                justify-content: center;
                                align-items: center;
                            }
                            .author-image {
                                height: 130px;
                                width: 130px;
                                display: flex;
                                & > img {
                                    border-radius: 50%;
                                }
                            }
                        }
                    }
                    .choose {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        width: 100%;
                        & > span {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            background: rgba(#000, 0.8);
                            border-radius: 30px;
                            height: 150px;
                            width: 300px;

                            button {
                                border: none;
                                background: rgba(#ffd700, 0.8);
                                display: flex;
                                height: 45px;
                                width: 140px;
                                justify-content: center;
                                align-items: center;
                                border-radius: 30px;
                                margin-top: 10px;
                                font-weight: bold;
                            }
                            & > span:nth-child(2) {
                                margin: 4px 0;
                            }
                            .book-title {
                                color: #ffd700;
                                font-size: 16px;
                            }
                            .author-name {
                                color: rgba(#fff, 0.9);
                                font-size: 15px;
                            }
                            & > span {
                                margin: 0;
                                padding: 5px;
                            }
                        }
                    }
                `}
            </style>
        </>
    )
}
