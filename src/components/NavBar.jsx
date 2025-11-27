import HomeButton from "./HomeButton";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

const NavBar = () => {

    return (
        <div className='flex justify-between items-center'>
            <HomeButton />
            <div className='flex space-x-4'>
                <LoginButton />
                <RegisterButton />
            </div>
        </div>
    );
};

export default NavBar;