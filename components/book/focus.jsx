import {Book} from "../book/book"

export const Focus = ({
    toggleOpenClose,
    mutate,
    user,
    selectedBook,
    follow,
}) => {
    return (
        <>
            <div className="focus">
                <div className="content">
                    <span
                        className="bar-icon icon-focus"
                        onClick={toggleOpenClose}>
                        <img src="/icons/x-lg.svg" alt="search" />
                    </span>
                    <Book
                        book={selectedBook}
                        user={user}
                        mutate={mutate}
                        following={follow}
                    />
                </div>
            </div>
            <style jsx>
                {`
                    div.focus {
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100vh;
                        display: flex;
                        position: fixed;
                        z-index: 1000;
                        left: 0;
                        top: 0;
                        padding: 40px;
                        background: rgba(#000, 0.5);
                    }

                    div.content {
                        max-width: 570px;
                        justify-content: center;

                        width: 100%;
                        height: 100%;
                        max-height: 100%;
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        border-radius: 12px;
                        background: #fff;
                        span.icon-focus {
                            height: 35px;
                            width: 35px;

                            display: flex;
                            justify-content: center;
                            align-items: center;
                            position: absolute;
                            border-bottom-left-radius: 12px;
                            border-top-right-radius: 12px;
                            right: 0;
                            top: 0;
                            background: rgba(#000, 0.8);
                            transition: background 0.3s;
                            :hover {
                                background: rgba(#000, 1);
                            }
                        }
                    }
                `}
            </style>
        </>
    )
}
