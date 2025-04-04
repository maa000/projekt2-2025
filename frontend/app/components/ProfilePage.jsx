import ProfileCard from "./ProfileCard";
import UserRecipes from "./UserRecipes";
import SavedRecipes from "./SavedRecipes";

export default function ProfilePage() {
    return (
        <div className="bg-rose-400 min-h-screen p-10 flex flex-col lg:flex-row gap-10 justify-center items-start">
            <ProfileCard />
            <div className="flex flex-col gap-6">
                <UserRecipes />
                <SavedRecipes />
            </div>
        </div>
    );
}
