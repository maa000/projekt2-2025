export default function TeamMemberCard({ name, email, image }) {
    return (
        <div className="bg-gray-900 text-white rounded-2xl p-4 text-center w-48">
            <img
                src={image}
                alt={name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
            />
            <p className="font-semibold">{name}</p>
            <p className="italic text-sm text-gray-300">{email}</p>
        </div>
    );
}
