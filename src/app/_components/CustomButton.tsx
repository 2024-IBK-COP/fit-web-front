
interface Props {
    nameVal : string | "button",    
    func? : () => void;
    color?: string;
}

export default function CustomButton(props:Props){
    
    const color : {[key:string] : string} = {
        gray:"flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500",
        blue:"flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500",
        red:"flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500",
        yellow:"flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500"
    }

    return (
        <button onClick={props.func} type="submit" className={`${color[props.color ?? "gray"]}`}>{props.nameVal}</button>
    );
}