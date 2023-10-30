"use client";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRouter, useSearchParams} from "next/navigation";
import {signIn} from "next-auth/react";

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });
            if (result?.error) {
                toast.error(result.error)
                setLoading(false);
                return;
            }
            toast.success("Logged in successfully")
            setLoading(false);
            setEmail("");
            setPassword("");
            setLoading(false);
            router.push(callbackUrl)
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    return (<main>
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center vh-100">
                <div className="col-lg-5 shadow bg-light p-5">
                    <h2 className="mb-b text-center">Log in</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                               className="form-control mb-4" placeholder="Enter your email"/>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                               className="form-control mb-4" placeholder="Enter your password"/>
                        <button type="submit" className="btn btn-primary btn-raised"
                                disabled={loading || !email || !password}>
                            {loading ? "Please Wait..." : "Submit"}
                        </button>
                    </form>
                    <button
                        className="btn btn-danger btn-raised mb-4"
                        onClick={() => signIn("google", { callbackUrl })}
                    >
                        Sign In with Google
                    </button>
                </div>
            </div>
        </div>
    </main>)
}
