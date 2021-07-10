import {useFollow} from "../../lib/hooks"
export const Authors = ({name, type = "suggestions", children}) => {
    return (
        <>
            <div className={`${type}`}>
                <span className="title">{name}</span>
                <div className="content">{children}</div>
            </div>

            <style jsx>
                {`
                    $radius-area: 50px;

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
                    div.suggestions,
                    div.follow {
                        & > span.title {
                            font-size: 15px;
                            margin-bottom: 10px;
                            @include flex-position;
                        }
                        overflow: auto;
                        ::-webkit-scrollbar {
                            width: 5px;
                        }
                        ::-webkit-scrollbar-track {
                            border-radius: 10px;
                            background: rgba(#000, 0.8);
                        }
                        ::-webkit-scrollbar-thumb {
                            background: #ffd700;
                            height: 5px;
                            border-radius: 10px;
                        }
                        display: flex;
                        width: $large-size;
                        flex-direction: inherit;

                        & > div.content {
                            padding: 0 20px;
                            @include flex-position($justify: flex-start);
                            background: $color-primary;
                            width: $large-size;
                            max-height: 260px;
                            height: $large-size;
                            border-radius: $radius-area;
                            flex-direction: column;
                            overflow-y: auto;
                        }
                    }
                    div.follow {
                        & > span.title {
                            margin-top: 10px;
                        }
                        & > div.content {
                            max-height: 300px;
                            height: $large-size;
                        }
                    }
                `}
            </style>
        </>
    )
}
