import InputTextComp from "../components/InputTextComp";
import InputPasswordComp from "../components/InputPasswordComp";

function LoginPage() {

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="lg:p-12 border-2 space-y-8 rounded-xl lg:backdrop-blur-sm lg:w-[400px]">
                <div className="space-y-2">
                    <h1 className="text-4xl text-white text-center">Welcome Back</h1>
                    <h5 className="text-white text-sm text-center">Please login to access your account</h5>
                </div>

                <form className="space-y-4">
                    <InputTextComp id="email" type="email" name="Email" />
                    <InputPasswordComp id="password" name="Password" />

                    <div>
                        <input type="submit" value="Sign In" className="button text-white rounded w-full py-2 tracking-widest" />
                    </div>
                </form>

                <div className="text-white text-center">
                    Don&apos;t have an account ? <a href="sign-up" className="cursor-pointer text-white hover:underline">Sign Up</a>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;