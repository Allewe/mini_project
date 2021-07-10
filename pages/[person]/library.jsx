import { gql } from "graphql-request"
import { staticPaths, getPerson } from "../../lib/utils"
import { LibraryContent } from "../../components/content/library-content"
const GET_READERS = gql`
    query ($slug: String!) {
        readers(where: { person: { slug: $slug } }) {
            id
            person {
                id
                slug
                first_name
                last_name
                email
                image {
                    url
                }
            }
            authors {
                id
            }
            books {
                id
                title
                description
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
                image {
                    url
                }
                audio_book {
                    chapter {
                        time
                        number
                        title
                    }
                    track {
                        url
                    }
                }
                written_book {
                    pages
                    file {
                        url
                    }
                }
            }
        }
    }
`

const Library = ({ user, title, description }) => {
    return (
        <>
            <LibraryContent
                queryUser={GET_READERS}
                person={user}
                title={title}
                description={description}
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

export async function getStaticProps({ params }) {
    const person = await getPerson(GET_READERS, params)

    return {
        props: {
            ...person,
        },
    }
}

export default Library
