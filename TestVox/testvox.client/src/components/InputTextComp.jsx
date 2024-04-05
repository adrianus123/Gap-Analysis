function InputTextComp({ id, type, name }) {
    return (
        <div className="flex flex-col items-start">
            <label for={id} className="text-md text-white after:content-['*']">{name}</label>
            <input id={id} name={id} type={type} className="px-2 border-2 text-white rounded w-full leading-8 bg-transparent focus:outline-none" required/>
        </div>
    );
}

export default InputTextComp;