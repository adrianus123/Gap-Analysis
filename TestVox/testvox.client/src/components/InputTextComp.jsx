function InputTextComp({ id, type, name }) {
    return (
        <div className="flex flex-col items-start">
            <label htmlFor={id} className="text-md text-white">{name}</label>
            <input id={id} name={id} type={type} className="px-2 border-2 border-white text-white rounded w-full leading-8 bg-transparent focus:outline-none" required/>
        </div>
    );
}

export default InputTextComp;