import InputTextComp from "../components/InputTextComp";
import InputPasswordComp from "../components/InputPasswordComp";

function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="lg:p-12 border-2 space-y-8 rounded-xl lg:backdrop-blur-sm">
                <div className="space-y-2">
                    <h1 className="text-4xl text-white text-center">Create Account</h1>
                    <h5 className="text-white text-sm text-center">Enter your details to register</h5>
                </div>

                <form className="space-y-4">
                    <div className="flex space-x-4">
                        <InputTextComp id="firstname" type="text" name="First Name" />
                        <InputTextComp id="lastname" type="text" name="Last Name" />
                    </div>
                    <InputTextComp id="email" type="email" name="Email" />
                    <InputPasswordComp id="password" name="Password" />
                    <InputPasswordComp id="repeatPassword" name="Confirm Password" />
                    <div>
                        <input type="submit" value="Sign Up" className="button text-white rounded w-full py-2 tracking-widest" />
                    </div>
                </form>

                <div className="text-white text-center">
                    Have an account ? <a href="sign-in" className="cursor-pointer text-white hover:underline">Sign In</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;