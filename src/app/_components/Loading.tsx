import Image from "next/image";

const Loading = () => {
    return (
        <div className="min-h-screen content-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    // loader={()=>{return "/img/IBK_CI_LOGO.png"}}
                    layout="responsive"
                    priority={true}
                    // sizes="210px"
                    width={100}
                    height={100}
                    className="mx-auto h-50 w-auto"
                    src="/img/ccme_horizon.png"
                    // src="/img/ccme_vertical.png"
                    // src="/img/IBK_CI_LOGO_BACK.png"
                    alt="Your Company"
                />
                {/* <img src="/img/ccme_horizon.png" alt="" /> */}
                <h2 className="type-iword dark:invert mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
            </div>
        </div>
    );
}

export default Loading;