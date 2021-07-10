import {getPerson, staticPaths} from "../../lib/utils"
import {gql} from "graphql-request"
import {Actualites} from "../../components/actualites/actualites"
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

            authors {
                id
                person {
                    first_name
                    last_name
                    image {
                        url
                    }
                }
                posts {
                    id
                    legend
                    like
                    file {
                        id
                        url
                        name
                    }
                    comments {
                        id
                        comment
                        reader {
                            id
                        }
                    }
                }
            }
        }
    }
`
const Feed = ({title, description, user}) => {
    return (
        <>
            <Actualites
                title={title}
                description={description}
                reader={user}
                queryReader={GET_READERS}
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
    const data = await getPerson(GET_READERS, params)
    return {
        props: {
            ...data,
        },
    }
}

export default Feed
