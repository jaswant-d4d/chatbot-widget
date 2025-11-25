import GuestLayout from "@/layouts/GuestLayout";

export default function Widget() {

    return (
        <div className="p-4 bg-transparent">
            <div className="rounded-2xl shadow-2xl bg-white h-full overflow-visible">
                <GuestLayout />
            </div>
        </div>
    );
}
