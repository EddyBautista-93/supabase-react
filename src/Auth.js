import { useState } from "react";
import { supabase } from "./supbaseClient";

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setLoading(true);
            // Passwordless method for logging in an existing user. A one-time password (OTP)
            // can either be in the form of an email link or a numerical code. 
            // You can decide whether to send an email link or code or both in your email 
            // template. If you're using passwordless phone sign-ins, your OTP will always 
            // be in the form of a code.
            const { error } = await supabase.auth.signInWithOtp({ email })
            if(error) throw error
            alert('Check your email for the login link!');
        } catch (error) {
            alert(error.error_description || error.message)
        } finally{
            setLoading(false);
        }
    }

    return(
        <div className="row flex-center flex">
            <div className="col-6 form-widget" aria-live="polite">
                <h1 className="header">Supabase + React</h1>
                <p className="description">
                    Sign in via magic link with your email below
                </p>
                {loading ? (
                    'Sending magic link...'
                ):(
                    <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      className="inputField"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="button block" aria-live="polite">
                      Send magic link
                    </button>
                  </form>
                )}
            </div>
        </div>
    )
}