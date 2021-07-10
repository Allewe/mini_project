import Link from "next/link"
import {useRouter} from "next/router"
import Svg from "../../../svg/svg"
const NavItem = ({icon, name, link, id, active, style, actu}) => {
    const color = {
        defaultColor:
            "invert(100%) sepia(100%) saturate(2%) hue-rotate(141deg) brightness(102%) contrast(101%)",
        activeColor:
            "invert(79%) sepia(44%) saturate(988%) hue-rotate(358deg) brightness(101%) contrast(105%)",
    }
    const {query} = useRouter()
    return (
        <li key={id} className="item">
            <Link href={`/${query.person}${link}`}>
                <a className={`item-link ${active ? "active" : ""}`}>
                    <span>
                        <Svg
                            active={active}
                            link={icon}
                            color={!actu ? color : style.color}
                            name={name}
                            width={20}
                            height={20}
                        />
                    </span>
                    <span className="text">{name}</span>
                </a>
            </Link>
            <style jsx>
                {`
                    li {
                        list-style: none;
                        margin: ${style
                            ? style.marginVertical +
                              " " +
                              style.marginHorizontal
                            : "10px 20px"};

                        & > span {
                            display: flex;
                            align-items: center;
                        }
                        .text {
                            margin-left: 8px;
                            padding-bottom: 2px;
                            font-size: ${style ? style.font_size : 17}px;
                            line-height: 15px;
                            color: #fff;
                        }
                        .item-link {
                            display: flex;
                            align-items: center;
                        }
                        .icon {
                            display: flex;
                            padding: 2px;
                            width: 20px;
                            height: 20px;
                            align-items: center;
                        }
                        .active {
                            .text {
                                color: var(--primary);
                            }
                        }
                    }
                `}
            </style>
        </li>
    )
}

export default NavItem
