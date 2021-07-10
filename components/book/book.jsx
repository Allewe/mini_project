import {useFollow, useShop} from "../../lib/hooks"
import {getLink} from "../../lib/utils"
import {Icon} from "./icon"
export const Book = ({book, devise = "MAD", mutate, user, following}) => {
    const {description, author, title, price} = book
    const [follow, toFollowUnFollow] = useFollow(
        book.author,
        user,
        mutate,
        following
    )
    const name = author.person.first_name + " " + author.person.last_name

    const [buying, proceedBuying] = useShop(book, user, mutate)

    return (
        <>
            <div className="book-container">
                <div className="book">
                    <div className="content">
                        <div className="book-image">
                            <img src={getLink(book)} alt={title} />
                        </div>
                        <div className="info">
                            <span className="author-image">
                                <img src={getLink(author.person)} alt={name} />
                                {follow ? (
                                    <button
                                        className="bar"
                                        name="unfollow"
                                        onClick={toFollowUnFollow}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="bi bi-person-dash-fill"
                                            viewBox="0 0 16 16">
                                            <path
                                                fillRule="evenodd"
                                                d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                                            />
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        className="bar"
                                        name="follow"
                                        onClick={toFollowUnFollow}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="bi bi-person-plus-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </span>
                            <span className="author-name">{name}</span>
                            <span className="title">{book.title}</span>
                        </div>
                    </div>
                    <div className="footer">
                        <Icon size={35} />
                    </div>
                </div>
                <p className="description">{description}</p>
            </div>
            <button
                name="price"
                className="price"
                onClick={
                    !buying ? proceedBuying : () => console.log("deja acheter")
                }>
                {price + " " + devise}
            </button>

            <style jsx>
                {`
                    .price {
                        border: none;
                        outline: none;
                        height: 60px;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #ffd700;
                        border-radius: 0px 0px 12px 12px;
                        font-family: Ranga;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 25px;
                        color: #ffffff;
                    }

                    .book-container {
                        padding: 37px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        width: 100%;
                        height: 100%;
                    }
                    .book-image {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        width: 180px;
                        height: 200px;
                        margin-top: 5px;

                        border-radius: 50px;
                        background: #ffd700;
                        & > img {
                            width: 115px;
                            height: 135px;
                        }
                    }
                    .book {
                        padding: 25px;
                        display: flex;
                        max-width: 495px;
                        max-height: 270px;
                        width: 100%;
                        height: 100%;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: rgba(#000, 0.8);
                        border-radius: 50px;

                        & > div {
                            display: flex;
                        }
                        & > .content {
                            width: 100%;
                            height: 100%;
                            justify-content: space-between;
                        }
                    }
                    .info {
                        display: flex;
                        flex-direction: column;
                        margin: 2px;
                        padding: 3px;
                        & > span {
                            margin: 5px;
                        }
                        .title {
                            font-weight: bold;
                            font-size: 16px;
                            color: #ffd700;
                        }
                        .author-name {
                            font-size: 12px;
                            color: #fff;
                        }
                    }
                    .footer {
                        display: flex;
                    }

                    p.desciption {
                        font-weight: 300;
                        font-size: 14px;
                        padding: 0;
                        margin: 0;
                    }

                    span.author-image {
                        display: flex;
                        position: relative;

                        align-items: center;
                        .bar {
                            border: none;
                            outline: none;
                            display: flex;
                            width: 130px;
                            height: 50px;
                            justify-content: center;
                            align-items: center;
                            background: rgba(255, 215, 0, 0.2);
                            border-radius: 50px 20px 50px 0px;
                            transform: translate(-20%, -10%);
                            transition: background 0.4s ease-in-out;
                            &:hover,
                            &:focus {
                                background: rgba(255, 215, 0, 0.5);
                            }
                            & > svg {
                                margin: 0;
                                fill: #fff;
                                width: 30px;
                                height: 30px;
                            }
                        }
                        & > img {
                            z-index: 3;
                            width: 100px;
                            height: 100px;
                            border-radius: 50px;
                        }
                    }
                `}
            </style>
        </>
    )
}
