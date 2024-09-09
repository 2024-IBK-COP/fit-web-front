interface Props {
  nameVal: string;
  idVal: string;
  typeVal: string;
  labelVal?: string|"";
  setFunc: (value: string) => void;
}

export default function CustomInput(props: Props) {
  return (
    <div>
      <label
        htmlFor={props.idVal}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.labelVal}
      </label>
      <div className="mt-2">
        <input
          id={props.idVal}
          name={props.nameVal}
          type={props.typeVal}
          onChange={(e) => props.setFunc(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
