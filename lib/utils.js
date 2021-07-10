import {request, gql} from "graphql-request"

/**
 * permet d'effectuer une requete graphql
 * @param {GraphQlRequest} query requete a transmettre
 * @param {object} variables associes a la requete
 * @returns les champs de la demande
 */

export const fetcherGraphQL = async (query, vars = {}) =>
    request(process.env.NEXT_PUBLIC_HOST_GRAPHQL, query, vars)

//Requete pour la recuperation des personnes pour precharger les pages
const GET_PEOPLE = gql`
    query ($limit: Int!) {
        people(limit: $limit) {
            slug
        }
    }
`
//pour negliger la limite strapi
const variables = {
    limit: -1,
}

/**
 * Creation des urls
 * @returns les urls pour la methode getStaticPaths
 */
export async function staticPaths() {
    const data = await fetcherGraphQL(GET_PEOPLE, variables)
    const people = data.people
    return people.map(({slug}) => {
        return {
            params: {
                person: slug,
            },
        }
    })
}

/**
 * @param {GraphQlRequest} query
 * @param {String} person
 */
export const getPerson = async (query, {person}) => {
    const variable = {
        slug: person,
    }
    const config = await siteConfig()
    const data = await fetcherGraphQL(query, variable)
    return {
        user: data,
        title: config.title,
        description: config.description,
    }
}

/**
 * Configuration du site
 * @returns un objet contenant les informations de l'application web
 */
export const siteConfig = async () => {
    const data = await import("../config.json")
    return {
        title: data.title,
        description: data.description,
    }
}

/**
 *
 * @param {Object} data objet a traiter
 * @param {String} type de contenu
 * @returns
 */
export function getLink(data, type = "image") {
    let url
    if (type === "audio" && data) {
        const {track} = data
        url = track?.url
    } else if (type === "pdf" && data) {
        const {file} = data
        url = file?.url
    } else if (type === "image" && data) {
        const {image} = data
        url = image?.url
    }
    return `${process.env.NEXT_PUBLIC_HOST}${url}`
}
