const Navigation = ({onRouteChange, isSignedIn}) => {
    return (
        <nav className="flex justify-end">

            {isSignedIn ? 
                <p onClick={() => onRouteChange('signin')} className="text-lg font-medium text-black underline hover:no-underline p-3 cursor-pointer"> Sign Out </p>
                : <>
                <p onClick={() => onRouteChange('signin')} className="text-lg font-medium text-black underline hover:no-underline p-3 cursor-pointer"> Sign In </p>
                <p onClick={() => onRouteChange('Register')} className="text-lg font-medium text-black underline hover:no-underline p-3 cursor-pointer"> Register </p>
                </>
            }</nav>
    )
}

export default Navigation;