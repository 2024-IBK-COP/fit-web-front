import Image from "next/image";

const LogoImg = () => {
    return (<div className="max-w-sm">
        <Image
            // loader={()=>{return "/img/IBK_CI_LOGO.png"}}
            layout="responsive"
            priority={true}
            // sizes="210px"
            width={100}
            height={100}
            className="mx-auto h-50 w-auto hidden dark:block"
            src="/img/ccme_horizon_dark.png"
            // src="/img/ccme_vertical.png"
            // src="/img/IBK_CI_LOGO_BACK.png"
            alt="ccme_logo_dark"
        />
        <Image
            // loader={()=>{return "/img/IBK_CI_LOGO.png"}}
            layout="responsive"
            priority={true}
            // sizes="210px"
            width={100}
            height={100}
            className="mx-auto h-50 w-auto block dark:hidden"
            src="/img/ccme_horizon.png"
            // src="/img/ccme_vertical.png"
            // src="/img/IBK_CI_LOGO_BACK.png"
            alt="ccme_logo"
        />
    </div>);
}

export default LogoImg;