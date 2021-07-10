import {getLink} from "../../lib/utils"
import {usePlayer} from "../../lib/hooks"
import Volume from "../area/player/volume/volume"

export const Player = ({selectedBook}) => {
    const {
        control,
        volume,
        setVolume,
        audioRef,
        progressBar,
        onChange,
        playPause,
        moveBack,
        moveForward,
    } = usePlayer(30)

    return (
        <>
            <div className="player">
                <span className="vector vector-left" />
                <span className="vector vector-right" />
                <span className="player-image">
                    <img src={getLink(selectedBook)} alt={selectedBook.title} />
                </span>
                <span className="title">{selectedBook.title}</span>
                <span className="author-name">
                    {selectedBook?.author?.person.first_name +
                        " " +
                        selectedBook?.author?.person.last_name}
                </span>
                <span className="chapter">chapter</span>
                <div className="controller">
                    <span className="back" onClick={moveBack}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="forward"
                            className=" svg-inline--fa fa-forward fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"></path>
                        </svg>
                    </span>
                    <button onClick={playPause} className="control">
                        {!control ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="fill bi bi-play-fill"
                                viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="fill bi bi-pause"
                                viewBox="0 0 16 16">
                                <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        )}
                    </button>
                    <span className="next" onClick={moveForward}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="forward"
                            className=" svg-inline--fa fa-forward fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M500.5 231.4l-192-160C287.9 54.3 256 68.6 256 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2zm-256 0l-192-160C31.9 54.3 0 68.6 0 96v320c0 27.4 31.9 41.8 52.5 24.6l192-160c15.3-12.8 15.3-36.4 0-49.2z"></path>
                        </svg>
                    </span>
                </div>

                <audio
                    src={getLink(selectedBook.audio_book, "audio")}
                    preload="metadata"
                    ref={audioRef}
                />
                <input
                    type="range"
                    name="progressBar"
                    id="progressBar"
                    ref={progressBar}
                    onChange={onChange}
                    className="progress-bar"
                />
                <Volume volume={volume} setVolume={setVolume} />
            </div>
            <style jsx>
                {`
                    //others
                    $radius-area: 50px;
                    $padding-area: 15px;
                    $margin-area: 7px;
                    //sizes
                    $profile-image: 50px;
                    $large-size: 100%;

                    //colors
                    $color-primary: rgba(#000, 0.8);
                    $color-secondary: rgba(#ffd700, 0.6);
                    $color-third: #fff;
                    //mixins
                    @mixin flex-position($align: center, $justify: center) {
                        display: flex;
                        justify-content: $justify;
                        align-items: $align;
                    }
                    //styles
                    div.player {
                        @include flex-position($justify: flex-start);
                        flex: 1;
                        flex-direction: column;
                        background: $color-primary;
                        border-radius: $radius-area;
                        max-height: 290px;
                        height: 100%;
                        width: 100%;
                        color: $color-third;
                        position: relative;
                        & > span.vector {
                            position: absolute;
                            width: 20px;
                            height: 20px;
                            background: $color-secondary;
                            border-radius: 0px 20px 0px 0px;
                        }
                        span.vector-left {
                            left: 0;
                            top: 0;
                            transform: rotate(-90deg);
                        }
                        span.vector-right {
                            right: 0;
                            top: 0;
                        }
                        & > span.player-image {
                            @include flex-position;
                            width: 100px;
                            height: 100px;
                            margin: 10px 0 10px;
                            border-radius: 30px;
                            background: $color-secondary;

                            & > img {
                                height: 75px;
                                width: 50px;
                            }
                        }
                        & > span.title {
                            font-size: 13px;
                            color: $color-secondary;
                            margin-bottom: $margin-area;
                        }
                        & > span.author-name,
                        span.chapter {
                            font-size: 11px;
                            color: rgba($color-third, 0.8);
                            margin-bottom: $margin-area;
                        }

                        div.controller {
                            @include flex-position;
                            & > button.control {
                                color: $color-secondary;
                                outline: none;
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                @include flex-position;
                                border: 2px solid $color-secondary;
                                background-color: rgba($color-third, 0.9);
                                margin: 0 30px;
                            }
                            & > span.back {
                                transform: rotate(180deg);
                            }
                            & > span {
                                width: 40px;
                                height: 40px;
                                @include flex-position;
                                & > svg {
                                    width: 20px;
                                    height: 20px;
                                    color: $color-secondary;
                                }
                            }
                        }
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
                        margin-top: 10px;
                        :hover,
                        :focus {
                            ::-webkit-slider-thumb {
                                background: $color-secondary;
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
                        background: $color-secondary;
                        width: var(--bar-width);
                        position: absolute;
                        top: 0;
                        left: 0;
                        cursor: pointer;
                        transition: width 1s;
                    }
                `}
            </style>
        </>
    )
}
