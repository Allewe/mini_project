import NavItem from "../area/navbar/nav-item/nav-item"
import {useRouter} from "next/router"

export const NavBar = ({itemsNavbar, settingNavbar, person}) => {
    const {asPath} = useRouter()
    const styleItem = {
        font_size: 12,
        marginHorizontal: "10px",
        marginVertical: "5px",
    }
    return (
        <>
            <div className="navbar">
                {itemsNavbar.map(({id, icon, name, link}) => (
                    <NavItem
                        style={styleItem}
                        icon={icon}
                        link={link}
                        name={name}
                        key={id}
                        active={
                            asPath === `/${person.slug}${link}` ? true : false
                        }
                    />
                ))}
                {settingNavbar.map(({id, icon, name, link}) => (
                    <NavItem
                        style={styleItem}
                        icon={icon}
                        link={link}
                        name={name}
                        key={id}
                        active={
                            asPath === `/${person.slug}${link}` ? true : false
                        }
                    />
                ))}
            </div>

            <style jsx>
                {`
                    //others
                    $radius-area: 50px;

                    //sizes

                    $large-size: 100%;

                    //colors
                    $color-primary: rgba(#000, 0.8);

                    //mixins
                    @mixin flex-position($align: center, $justify: center) {
                        display: flex;
                        justify-content: $justify;
                        align-items: $align;
                    }
                    //styles
                    div.navbar {
                        border-radius: $radius-area;
                        margin: 10px 0;
                        flex-direction: column;
                        width: $large-size;
                        height: $large-size;
                        padding-left: 5px;
                        @include flex-position($align: flex-start);
                        max-height: 260px;
                        background: $color-primary;
                    }
                `}
            </style>
        </>
    )
}
