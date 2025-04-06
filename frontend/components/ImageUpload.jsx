export default function ImageUpload({ onImageSelect }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageSelect(file);
        }
    };

    return (
        <div className="mt-6 text-center">
            <label className="block mb-2 font-semibold">Kép Csatolása</label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-white text-black p-2 rounded w-full"
            />
        </div>
    );
}
