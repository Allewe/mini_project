import Search from "./search"
import Option from "./option"

const Header = ({user, mutate, active, chooseOption, searchFollow}) => {
    const {first_name} = user.person

    return (
        <>
            <nav className="navbar">
                <ul className="menu-container">
                    <li className="menu">
                        <img
                            src="/icons/bars-solid.svg"
                            alt="menu"
                            height={35}
                            width={35}
                        />
                        <span className="text">Bonjour, {first_name}</span>
                    </li>
                </ul>
                <span className="return">
                    <img src="/icons/arrow-left.svg" alt="return" />
                </span>

                <ul className="search-container">
                    <li className="search">
                        <Search
                            user={user}
                            mutate={mutate}
                            searchFollow={searchFollow}
                        />
                    </li>
                </ul>
                <ul className="option-container">
                    <li className="option">
                        <Option chooseOption={chooseOption} active={active} />
                    </li>
                </ul>
            </nav>
            <style jsx>
                {`
                    .return {
                        display: flex;
                        margin-right: 50px;
                        margin-left: 10px;
                        justify-content: center;
                        align-items: center;
                        img {
                            width: 35px;
                            height: 30px;
                            transition: transform 0.3s;
                            :hover {
                                transform: scale(1.2);
                            }
                        }
                    }

                    nav {
                        background: rgba(#000, 0.8);
                    }
                    ul {
                        margin: 2px;
                        padding: 10px;
                        display: flex;
                        flex: 1;
                    }
                    ul:first-child {
                        margin: 10px 0;
                        padding-right: 0;
                        max-width: 300px;
                        width: 300px;
                        align-items: center;
                        flex: 1;
                    }
                    .menu {
                        justify-content: center;
                        align-items: center;
                        .text {
                            margin: 0 12px;
                            color: #fff;
                            font-size: 11px;
                            line-height: 35px;
                        }
                    }
                    .option-container {
                        justify-content: flex-end;
                        align-items: center;
                        .option {
                            margin: 2px;
                            padding: 0 2px;
                        }
                    }
                    .search-container {
                        justify-content: flex-end;
                        align-items: center;
                    }
                    .navbar {
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        height: 60px;
                        margin: 0;
                        padding: 0;
                    }
                    li {
                        list-style: none;
                        display: flex;
                    }
                    .icon {
                        height: 25px;
                        width: 25px;
                        //filter: invert(79%) sepia(44%) saturate(988%) hue-rotate(358deg) brightness(101%) contrast(105%);
                    }
                `}
            </style>
        </>
    )
}

export default Header
