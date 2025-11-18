export default function InputFieldAuth({params}: any) {

    const { labelTitle, inputType, onChangeCallBack } = params

    return (
        <>
            <label className="font-manrope text-blackChocolate" htmlFor={inputType}>{labelTitle}:</label>
            <input
            className = "w-full border-blackChocolate border-1 p-1 focus:outline-none focus:shadow focus:border-darkVanilla rounded-md"
            placeholder= "Skriv her ..."
            required
            type={inputType}
            id={inputType}
            name={inputType}
            /*value={value}*/
            onChange={(e) => onChangeCallBack(e.target.value, inputType)}
            />
        </>
    )
}