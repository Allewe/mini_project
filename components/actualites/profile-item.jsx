import {getLink} from "../../lib/utils"
import {useFollow} from "../../lib/hooks"
import {useEffect} from "react"

export const ProfileItem = ({author, type, action, mutate, user}) => {
    const [follow, toFollowUnfollow] = useFollow(author, user, mutate)

    useEffect(() => {}, [])
    const {person} = author
    const name = person.first_name + " " + person.last_name
    return (
        <>
            <span className={`profile ${type}`}>
                <img
                    src={getLink(person)}
                    alt={person.first_name + " " + person.last_name}
                />
                <span className="name">{name}</span>
                {type === "suggestions" ? (
                    <button
                        className="icon-suggestions"
                        onClick={toFollowUnfollow}
                        name="follow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-person-plus-fill"
                            viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path
                                fillRule="evenodd"
                                d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                            />
                        </svg>
                    </button>
                ) : (
                    <button
                        className="icon-follow"
                        onClick={action}
                        name="follow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-three-dots"
                            viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                    </button>
                )}
            </span>

            <style jsx>{`
                //others
                $radius-area: 20px;
                $padding-area: 15px;
                //sizes
                $profile-image: 50px;
                $large-size: 100%;

                //colors
                $color-primary: rgba(#000, 0.8);
                $color-secondary: rgba(#ffd700, 0.6);
                $color-third: #fff;
                $color-suggestions: rgba($color-third, 0.8);
                $color-follow: rgba(#000, 0.5);
                //mixins
                @mixin flex-position($align: center, $justify: center) {
                    display: flex;
                    justify-content: $justify;
                    align-items: $align;
                }
                //styles

                span.profile {
                    display: flex;
                    width: $large-size;
                    margin: 5px 0;

                    & > img {
                        margin: 5px;
                        width: $profile-image;
                        height: $profile-image;
                        border-radius: 50%;
                    }
                }
                span.follow,
                span.suggestions {
                    @include flex-position($justify: flex-start);
                    border-radius: 50px;
                    & > span.name {
                        font-size: 8px;
                        text-overflow: ellipsis;
                        flex: 1;
                        @include flex-position;
                    }
                }
                span.suggestions,
                span.follow {
                    background: $color-suggestions;
                }

                button.icon-suggestions,
                button.icon-follow {
                    cursor: pointer;
                    margin: 5px;
                    border: none;
                    width: 40px;
                    height: 40px;
                    @include flex-position;
                    outline: none;
                    transition: background 0.4s;
                    background: $color-secondary;
                    border-radius: 50%;
                    & > svg {
                        width: 20px;
                        height: 20px;
                        color: #000;
                    }
                    &:hover {
                    }
                }
            `}</style>
        </>
    )
}
