import {gql} from "graphql-request"
import {staticPaths, getPerson, fetcherGraphQL} from "../../lib/utils"
import {ShopContent} from "../../components/content/shop-content"
const GET_BOOKS = gql`
    query {
        books {
            id
            title
            description
            price
            image {
                url
            }
            author {
                id
                person {
                    first_name
                    last_name
                    image {
                        url
                    }
                }
            }
        }
    }
`
const GET_READERS = gql`
    query ($slug: String!) {
        readers(where: {person: {slug: $slug}}) {
            id
            person {
                first_name
                last_name
                slug
                image {
                    url
                }
            }
            books {
                id
                author {
                    id
                }
            }
            authors {
                id
            }
        }
    }
`

const Shop = ({title, description, user, books}) => {
    return (
        <>
            <ShopContent
                title={title}
                person={user}
                description={description}
                data={books}
                queryReader={GET_READERS}
                queryBook={GET_BOOKS}
            />
        </>
    )
}

export async function getStaticPaths() {
    const slug = await staticPaths()

    return {
        paths: slug,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const user = await getPerson(GET_READERS, params)
    const data = await fetcherGraphQL(GET_BOOKS)
    return {
        props: {
            ...user,
            books: data,
        },
    }
}

export default Shop
