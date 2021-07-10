import BookInfo from "./book-info/book-info"
import {useEffect, useState, useRef} from "react"
import Volume from "./volume/volume"
import {getLink} from "../../../lib/utils"

const Player = ({book}) => {
    //hooks
    const [volume, setVolume] = useState(30)
    const [control, setControl] = useState(false)
    const [time, setTime] = useState({
        currentTime: 0,
        duration: 0,
    })
    const animation = useRef(null)
    const audio = useRef(null)
    const progress = useRef(null)
    useEffect(() => {
        const duration = Math.floor(audio.current.duration)
        setTime((el) => ({
            ...el,
            duration: duration,
        }))
        progress.current.max = duration
        audio.current.volume = volume / 100
    }, [
        audio?.current?.loadedmetadata,
        audio?.current?.readyState,
        book?.audio_book?.track.url,
        volume,
    ])

    //functions
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
            `${(progress.current.value / time.duration) * 100}%`
        )
        setTime((el) => ({
            ...el,
            currentTime: progress.current.value,
        }))
    }

    //events
    const moveBack = () => {
        progress.current.value = Number(progress.current.value) - 30
        changeTime()
    }
    const moveForward = () => {
        progress.current.value = Number(progress.current.value) + 30
        changeTime()
    }

    return (
        <>
            <footer className="foot">
                <div className="bar">
                    <input
                        type="range"
                        defaultValue="0"
                        className="progress-bar"
                        onChange={changeTime}
                        ref={progress}
                    />
                </div>
                <div className="container">
                    <div className="player-info">
                        <BookInfo book={book} />
                    </div>
                    <div className="controller-container">
                        <span className="back" onClick={moveBack}>
                            <img
                                src="/icons/forward-solid.svg"
                                alt="move back"
                            />
                        </span>
                        <span onClick={togglePlayPause} className="control">
                            <audio
                                id="audio"
                                src={getLink(book.audio_book, "audio")}
                                ref={audio}
                                preload="metadata"
                            />

                            {!control ? (
                                <img src="/icons/play-fill.svg" alt="play" />
                            ) : (
                                <img src="/icons/pause.svg" alt="pause" />
                            )}
                        </span>
                        <span className="next" onClick={moveForward}>
                            <img
                                src="/icons/forward-solid.svg"
                                alt="move forward"
                            />
                        </span>
                    </div>
                    <div>
                        <Volume setVolume={setVolume} volume={volume} />
                    </div>
                </div>
            </footer>

            <style jsx>
                {`
                    .controller-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        & > span {
                            width: 50px;
                            height: 50px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                        }
                        span img {
                            width: 25px;
                            height: 20px;
                        }
                        .control {
                            border: 2px solid var(--primary);
                            background-color: rgba(#fff, 0.9);
                            margin: 0 30px;
                        }
                        span:first-child {
                            transform: rotate(180deg);
                        }

                        .back,
                        .next {
                            &:hover {
                            }
                        }
                    }

                    .container {
                        display: flex;
                        height: 100%;
                        width: 100%;
                        padding: 2px;

                        div:first-child,
                        div:last-child {
                            display: flex;
                        }
                        div {
                            flex: 1;
                        }
                        div:last-child {
                            justify-content: flex-end;
                            align-items: center;
                            padding: 2px 0 15px;
                        }
                    }
                    .foot {
                        animation: changeWidth 0.5s !important;
                        --webkit-animation: changeWidth 0.5s !important;
                        display: flex;
                        flex-direction: column;
                        height: 80px;
                        width: 100%;
                        overflow: hidden;
                        background: rgba(#000, 0.8);
                    }
                    .bar {
                        display: flex;
                        width: 100%;
                        height: 10px;
                    }
                    .progress-bar {
                        --bar-bg: #fff;
                        --bar-width: 0;
                        appearance: none;
                        height: 5px;
                        width: 100%;
                        position: relative;
                        cursor: pointer;
                        background: var(--bar-bg);
                        border-top: 2px solid rgba(#000, 0.8);
                        outline: none;
                        margin: 0;
                        :hover,
                        :focus {
                            ::-webkit-slider-thumb {
                                background: var(--primary);
                            }
                        }
                    }
                    .progress-bar::-webkit-slider-thumb {
                        appearance: none;
                        width: 10px;
                        position: relative;
                        height: 10px;
                        border-radius: 50%;
                        cursor: pointer;
                        background: transparent;
                        box-sizing: border-box;
                        outline: none;
                    }
                    .progress-bar::-webkit-slider-runnable-track {
                        position: relative;
                        cursor: pointer;
                        width: 100%;
                        height: 10px;
                    }

                    .progress-bar::before {
                        content: "";
                        height: 3px;
                        background: #ffd700;
                        width: var(--bar-width);
                        position: absolute;
                        top: 0;
                        left: 0;
                        cursor: pointer;
                        transition: width 1s;
                    }
                    @-webkit-keyframes changeWidth {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0%);
                        }
                    }
                    @keyframes changeWidth {
                        from {
                            transform: translateY(100%);
                        }
                        to {
                            transform: translateY(0%);
                        }
                    }
                `}
            </style>
        </>
    )
}

export {Player}
