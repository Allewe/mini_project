import Header from "./header/header"
import NavBar from "./navbar/navbar"
import {Player} from "./player/player"
import {Reader} from "./reader/reader"

const Area = ({
    children,
    mutate,
    user,
    active,
    chooseOption,
    selectedBook,
    follow,
}) => {
    return (
        <>
            <div className="grid-container">
                <header className="head">
                    <Header
                        user={user}
                        mutate={mutate}
                        active={active}
                        chooseOption={chooseOption}
                        searchFollow={follow}
                    />
                </header>
                <div className="nav">
                    <NavBar user={user.person} />
                </div>
                <div className="main">
                    <div className="content">{children}</div>
                    {active === "listen" && active !== "" ? (
                        <Player book={selectedBook} />
                    ) : active === "read" && active !== "" ? (
                        <Reader books={selectedBook} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <style jsx>
                {`
                    .head {
                        grid-area: head;
                    }
                    .nav {
                        grid-area: nav;
                    }
                    .content {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                    }

                    .main {
                        grid-area: main;
                        background: #fff;
                        display: flex;
                        flex-direction: column;
                    }

                    .grid-container {
                        display: grid;
                        grid-template-rows: 60px 1fr 60px;
                        grid-template-columns: 300px 1fr;
                        grid-template-areas:
                            "head head head"
                            "nav main main"
                            "nav main main";
                        width: 100vw;
                        height: 100vh;
                    }
                `}
            </style>
        </>
    )
}

export default Area
