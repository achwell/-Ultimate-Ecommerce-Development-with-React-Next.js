"use client";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${process.env.API}/register`,
                {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
            })
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error)
                setLoading(false);
                return;
            }
            toast.success(`User ${data.name} created`)
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);
            router.push("/login")
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    return (<main>
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-5 shadow bg-light p-5">
                    <h2 className="mb-b text-center">Register</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                               className="form-control mb-4" placeholder="Enter your name"/>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                               className="form-control mb-4" placeholder="Enter your email"/>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                               className="form-control mb-4" placeholder="Enter your password"/>
                        <button type="submit" className="btn btn-primary btn-raised"
                                disabled={loading || !name || !email || !password}>
                            {loading ? "Please Wait..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main>)
}
