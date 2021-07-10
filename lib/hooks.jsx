import useSWR from "swr"
import {useEffect, useMemo, useState, useRef} from "react"
import {fetcherGraphQL} from "./utils"
import {useRouter} from "next/router"
import {gql} from "graphql-request"

export function useShop(book, user, mutate) {
    const [buying, setBuying] = useState(false)
    useEffect(() => {
        const index = user.books.findIndex(({id}) => book.id === id)

        if (index !== -1) {
            setBuying(true)
        } else {
            setBuying(false)
        }
        console.log(buying)
    }, [user.books.length])
    const proceedBuyingBook = async () => {
        const UPDATE_READER = gql`
            mutation ($reader_id: ID!, $book: [ID]) {
                updateReader(
                    input: {data: {books: $book}, where: {id: $reader_id}}
                ) {
                    reader {
                        id
                        authors {
                            person {
                                last_name
                                first_name
                            }
                        }
                    }
                }
            }
        `
        const books = user.books.map(({id}) => id)

        books.push(book.id)
        console.log(books)

        const variables = {
            reader_id: user.id,
            book: books,
        }
        await fetcherGraphQL(UPDATE_READER, variables)
        mutate()
        console.log("achat effectuee")
        setBuying(true)
    }

    return [buying, proceedBuyingBook]
}

export function useBook(key, initData = {}) {
    const {data, error} = useSWR(key, fetcherGraphQL, {initialData: initData})
    return {
        books: data.books,
        load: !error && !data,
        err: error,
    }
}

export function useFollow(author, user, mutate, init = false) {
    const [follow, setFollow] = useState(init)
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        const index = user?.authors.findIndex(({id}) => author.id === id)
        if (index !== -1) {
            setFollow(true)
        } else {
            return setFollow(false)
        }
    }, [update, author.id, user?.authors.length, user])

    const toFollowUnfollow = async (event) => {
        const data = user ? [...user.authors] : []
        const authors = data?.map(({id}) => {
            return id
        })
        const index = authors.findIndex((item) => item === author.id)
        if (event.target.name === "follow") {
            const UPDATE_READER = gql`
                mutation ($reader_id: ID!, $author_id: [ID]) {
                    updateReader(
                        input: {
                            data: {authors: $author_id}
                            where: {id: $reader_id}
                        }
                    ) {
                        reader {
                            id
                        }
                    }
                }
            `
            if (index < 0) {
                authors.push(author.id)
                const variables = {
                    author_id: authors,
                    reader_id: user.id,
                }

                await fetcherGraphQL(UPDATE_READER, variables)
                mutate()
                console.log("reusi")
                return setUpdate(!update)
            } else {
                console.log("reusi")
                return setUpdate(!update)
            }
        } else if (event.target.name === "unfollow") {
            const UPDATE_READER = gql`
                mutation ($reader_id: ID!, $authors: [ID]) {
                    updateReader(
                        input: {
                            data: {authors: $authors}
                            where: {id: $reader_id}
                        }
                    ) {
                        reader {
                            id
                        }
                    }
                }
            `

            if (index > -1) {
                authors.splice(index, 1)
                const variables = {
                    reader_id: user.id,
                    authors: authors,
                }
                await fetcherGraphQL(UPDATE_READER, variables)
                mutate()
                console.log("reusi")
                return setUpdate(!update)
            } else {
                console.log("reusi")
                return setUpdate(!update)
            }
        }
    }

    return [follow, toFollowUnfollow]
}

export function useUser(key, initData) {
    const {query} = useRouter()
    const vars = useMemo(() => ({slug: query.person}), [query.person])
    const {data, error, mutate} = useSWR([key, vars], fetcherGraphQL, {
        initialData: initData,
    })
    return {
        user: {...data.readers[0]},
        isLoading: !error && !data,
        isError: error,
        mutate,
    }
}

export function useSelectedBook(init) {
    const [selectedBook, setSelectedBook] = useState(init)
    const setBook = (book) => {
        setSelectedBook(book)
        window.localStorage.setItem(
            "selectedBook",
            JSON.stringify(selectedBook)
        )
    }
    const effect = () => {
        const storage = JSON.parse(window.localStorage.getItem("selectedBook"))
        if (storage) {
            setSelectedBook(storage)
        }
    }
    useEffect(() => {
        window.addEventListener("storage", effect)
        return window.removeEventListener("storage", effect)
    }, [selectedBook])

    return [selectedBook, setBook, effect]
}

export function useActive() {
    const [active, setActive] = useState("")
    const chooseOption = (choose) => {
        if (choose === active) {
            return setActive("")
        } else {
            setActive(choose)
        }
    }
    return [active, chooseOption]
}

export function usePlayer(defaultVolume) {
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(defaultVolume)
    const [duration, setDuration] = useState(0)
    const [control, setControl] = useState(false)
    const animation = useRef(null)
    const audio = useRef(null)
    const progress = useRef(null)
    useEffect(() => {
        const durationAudio = Math.floor(audio.current.duration)
        setDuration(durationAudio)
        progress.current.max = durationAudio
        audio.current.volume = volume / 100
    }, [audio?.current?.loadedmetadata, audio?.current?.readyState, volume])

    const togglePlayPause = () => {
        if (!control) {
            audio.current.play()
            animation.current = requestAnimationFrame(whilePlay)
        } else {
            audio.current.pause()
            cancelAnimationFrame(whilePlay)
        }
        setControl(!control)
    }
    const whilePlay = () => {
        progress.current.value = audio?.current?.currentTime
            ? audio.current.currentTime
            : 0
        changeCurrentTime()
        animation.current = requestAnimationFrame(whilePlay)
    }
    const changeTime = () => {
        audio.current.currentTime = progress.current.value
        changeCurrentTime()
    }
    const changeCurrentTime = () => {
        progress.current.style.setProperty(
            "--bar-width",
            `${(progress.current.value / duration) * 100}%`
        )
        setCurrentTime(progress.current.value)
    }
    const back = () => {
        progress.current.value = Number(progress.current.value) - 30
        changeTime()
    }
    const forward = () => {
        progress.current.value = Number(progress.current.value) + 30
        changeTime()
    }

    return {
        currentTime: currentTime,
        duration: duration,
        progressBar: progress,
        audioRef: audio,
        moveBack: back,
        moveForward: forward,
        onChange: changeTime,
        playPause: togglePlayPause,
        volume: volume,
        setVolume: setVolume,
        control: control,
    }
}

export function useAuthor(authorsData, authorsReader) {
    const [suggestion, setSuggestion] = useState([])
    useEffect(() => {
        const authors = makeSuggestion()
        setSuggestion(authors)
        console.log(authors)
        console.log(authorsData)
    }, [authorsData?.length, authorsReader?.length])
    const makeSuggestion = () => {
        const authorId = authorsReader?.map(({id}) => id)
        console.log(authorId)
        return authorsData?.filter((item) => !authorId.includes(item.id))
    }
    return {
        suggestion: suggestion,
        follow: authorsReader,
    }
}
