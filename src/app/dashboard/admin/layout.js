import AdminNav from "@/app/components/nav/AdminNav";

export default function AdminDashboard({children}) {
    return (
        <>
            <AdminNav/>
            {children}
        </>
    )
}
