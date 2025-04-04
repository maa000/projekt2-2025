export default function Search() {
    return (
        <section className="text-center p-6">
            <h3 className="text-xl font-semibold">Fedezz fel új recepteket!</h3>
            <input
                type="text"
                placeholder="Search for recipes..."
                className="mt-4 p-2 rounded text-black"
            />
        </section>
    );
}
