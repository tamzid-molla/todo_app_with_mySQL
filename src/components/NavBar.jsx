import { getServerSession } from "next-auth";
import HomeButton from "./HomeButton";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import LogoutButton from "./LogoutButton";

const NavBar = async() => {
    const session = await getServerSession();
    return (
        <div className='flex justify-between items-center'>
            <HomeButton />
            <div className='flex space-x-4'>
                {session ? (
                <LogoutButton />
                ) : (
                        <>
                            <LoginButton />
                            <RegisterButton />
                </>
                )}
                
                
            </div>
        </div>
    );
};

export default NavBar;