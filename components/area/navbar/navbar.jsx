import React, {useEffect, useState} from "react"
import {useRouter} from "next/router"
import PropTypes from "prop-types"
import Profile from "./profile/profile"
import NavItem from "./nav-item/nav-item"

export const itemsNavbar = [
    {
        id: 0,
        icon: "/icons/bookshelf.svg",
        name: "Bibliotheque",
        link: "/library",
    },
    {
        id: 1,
        icon: "/icons/graph-up.svg",
        name: "Statistique",
        link: "/statistic",
    },
    {
        id: 2,
        icon: "/icons/newspaper.svg",
        name: "Actualites",
        link: "/feed",
    },
    {
        id: 3,
        icon: "/icons/shop.svg",
        name: "Shop",
        link: "/shop",
    },
]

export const settingNavbar = [
    {id: 0, icon: "/icons/gear.svg", name: "Parametres", link: "/setting"},
    {
        id: 1,
        icon: "/icons/info-circle.svg",
        name: "Aide",
        link: "/help",
    },
]

/**
 *
 * @param user : un object avec les informations de la personne {slug, first_name}
 * @returns {React.Component} la barre de navigation
 */
const NavBar = ({user}) => {
    const {asPath} = useRouter()
    console.log(asPath)

    return (
        <>
            <div className="container">
                <div className="profile-container">
                    <Profile
                        user={user}
                        firstName={user.first_name}
                        lastName={user.last_name}
                    />
                </div>
                <nav>
                    <ul>
                        {itemsNavbar.map(({id, icon, name, link}) => (
                            <NavItem
                                key={id}
                                icon={icon}
                                name={name}
                                link={link}
                                active={
                                    asPath === `/${user.slug}${link}`
                                        ? true
                                        : false
                                }
                            />
                        ))}
                    </ul>
                    <ul>
                        {settingNavbar.map(({id, icon, link, name}) => (
                            <NavItem
                                key={id}
                                icon={icon}
                                name={name}
                                link={link}
                                active={
                                    asPath === `/${user.slug}${link}`
                                        ? true
                                        : false
                                }
                            />
                        ))}
                    </ul>
                </nav>
            </div>
            <style jsx>
                {`
                    ul {
                        display: flex;
                        margin: 0;
                        padding: 5px;
                        flex-direction: column;
                    }
                    ul:first-child {
                        flex: 2;
                        margin: 20px 0;
                    }

                    ul:last-child {
                        margin: 20px 0;
                        border-top: 1px solid var(--primary);
                    }
                    nav {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .container {
                        flex-direction: column;
                        background: rgba(#000, 0.8);
                        display: flex;
                        width: 100%;
                        height: 100%;
                    }
                    .profile-container {
                        max-height: 240px;
                    }
                `}
            </style>
        </>
    )
}

export default NavBar
