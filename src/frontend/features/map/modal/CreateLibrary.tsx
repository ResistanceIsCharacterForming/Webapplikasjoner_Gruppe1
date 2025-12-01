export default function ModalContentNewLibrary() {
    return (
        <article className="flex flex-wrap py-2 px-2">
            <h2 className="font-prata text-xl">Legg til bokkrok</h2>
            <section className="basis-full">
                <img className="w-[70%] m-auto" src="src/features/libraries/pages/RP-P-1922-145-edit-1.png"/>
             </section>
             <section>
                <form>
                    <fieldset>
                        <legend>Ønsker å være:</legend>

                            <span>
                            <input type="radio" id="eier" name="status" value="E" />
                            <label className="ml-1" htmlFor="eier">Eier</label>
                            </span>
    
                            <span className="ml-1">
                            <input type="radio" id="anonym" name="status" value="A" />
                            <label className="ml-1" htmlFor="anonym">Anonym</label>
                            </span>
                    </fieldset>
                </form>
             </section>
        </article>
    )
}