import Image from "next/image";

const LogoImg_sm = () => {
    return (<div className="max-w-32">
        <Image
            // loader={()=>{return "/img/IBK_CI_LOGO.png"}}
            layout="responsive"
            priority={true}
            // sizes="210px"
            width={50}
            height={50}
            className="mx-auto h-1 w-auto hidden dark:block"
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
            width={50}
            height={50}
            className="mx-auto h-1 w-auto block dark:hidden"
            src="/img/ccme_horizon.png"
            // src="/img/ccme_vertical.png"
            // src="/img/IBK_CI_LOGO_BACK.png"
            alt="ccme_logo"
        />
    </div>);
}

export default LogoImg_sm;