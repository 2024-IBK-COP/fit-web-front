import LogoImg from "./LogoImg";

const MainLogo = () => {
    return (<div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoImg></LogoImg>
        <h2 className="type-iword dark:invert mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
    </div>);
}

export default MainLogo;