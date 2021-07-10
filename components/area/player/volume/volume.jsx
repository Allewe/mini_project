import {useState, useEffect, useRef} from "react"
import Svg from "../../../svg/svg"
const color = {
    defaultColor:
        "invert(79%) sepia(44%) saturate(988%) hue-rotate(358deg) brightness(101%) contrast(105%)",
}

const Volume = ({setVolume, actu}) => {
    const progress = useRef(null)

    const onVolume = (event) => {
        setVolume(parseInt(event.target.value))
        progress.current.style.setProperty(
            "--bar-width",
            `${event.target.value}%`
        )
    }
    const interval = {
        step: 1,
        start: 30,
        min: 0,
        max: 100,
    }
    const style = {
        height: 10,
        width: 100,
        size: "auto",
        radius: 10,
        color: {
            defaultColor: "",
        },
    }

    return (
        <>
            <label htmlFor="amount" className="amount">
                <Svg
                    link="/icons/volume-up.svg"
                    name="volume"
                    color={!actu ? color : style.color}
                    height={25}
                    width={25}
                />
                <input
                    type="range"
                    step={interval.step}
                    min={interval.min}
                    max={interval.max}
                    id="amount"
                    defaultValue={interval.start}
                    className="line"
                    onChange={onVolume}
                    ref={progress}
                />
            </label>

            <style jsx>
                {`
                    $color-secondary: rgba(#ffd700, 0.6);
                    .amount {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 15px 5px 0;
                    }
                    input.line {
                        --bar-width: ${interval.start + "%"};
                        appearance: none;
                        height: ${style.height}px;
                        width: ${style.size === "full"
                            ? "100%"
                            : style.width + "px"};
                        border-radius: ${style.radius}px;
                        position: relative;
                        cursor: pointer;
                        outline: none;
                        margin: 0;
                        transition: background 1s;
                        :hover {
                            ::-webkit-slider-thumb {
                                background: $color-secondary;
                            }
                        }
                    }

                    input.line::-webkit-slider-thumb {
                        appearance: none;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background: transparent;
                        transition: background 0.4s;
                        position: relative;
                    }
                    input.line::before {
                        content: "";
                        height: ${style.height}px;
                        background: $color-secondary;
                        width: var(--bar-width);
                        position: absolute;
                        top: 0;
                        left: 0;
                        cursor: pointer;
                        transition: width 1s;
                        border-radius: ${style.radius}px;
                    }
                `}
            </style>
        </>
    )
}

export default Volume
