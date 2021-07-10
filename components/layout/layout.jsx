import Head from "next/head"
import PropsTypes from "prop-types"

const Layout = ({title, description, children}) => {
    return (
        <>
            <Head>
                <meta name="description" content={description} />
                <title>{title}</title>
            </Head>
            <main className="main">{children}</main>

            <style jsx>
                {`
                    .main {
                        display: flex;
                        width: 100vw;
                        height: 100vh;
                        flex-direction: column;
                    }
                `}
            </style>
        </>
    )
}
Layout.propTypes = {
    title: PropsTypes.string.isRequired,
    description: PropsTypes.string.isRequired,
    children: PropsTypes.array.isRequired,
}

export default Layout
