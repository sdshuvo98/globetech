import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/images/globetech-logo.png';
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../authentication/firebase.init';
import { signOut } from 'firebase/auth';


function Navbar() {
    const [user] = useAuthState(auth);

    const navigation = [
        { name: 'Home', to: '/' },
        { name: 'Services', to: '/services' },
    ]

    return (
        <Disclosure as="nav">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-20">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                                <div className="flex-shrink-0 flex items-center">
                                    <Link to='/'>
                                        <img className='h-7' src={Logo} alt="" />
                                    </Link>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.to}
                                                style={({ isActive }) =>
                                                    isActive ? { color: '#D7F561' } : { color: '#8FE5FF' }
                                                }
                                                className='hover:underline px-3 py-2 rounded-md text-sm font-medium'
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                        {
                                            user ?
                                                <button
                                                    onClick={() => signOut(auth)}
                                                    style={{ color: '#8FE5FF' }}
                                                    className='hover:underline px-3 py-2 rounded-md text-sm font-medium'
                                                >
                                                    Logout
                                                </button>
                                                :
                                                <NavLink
                                                    to='/login'
                                                    style={{ color: '#8FE5FF' }}
                                                    className='hover:underline px-3 py-2 rounded-md text-sm font-medium'
                                                >
                                                    Login
                                                </NavLink>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    style={({ isActive }) =>
                                        isActive ? { color: '#D7F561' } : { color: '#8FE5FF' }
                                    }
                                    className='block hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                            {
                                user ?
                                    <button
                                        onClick={() => signOut(auth)}
                                        style={{ color: '#8FE5FF' }}
                                        className='hover:underline px-3 py-2 rounded-md text-sm font-medium'
                                    >
                                        Logout
                                    </button>
                                    :
                                    <NavLink
                                        to='/login'
                                        style={{ color: '#8FE5FF' }}
                                        className='hover:underline px-3 py-2 rounded-md text-sm font-medium'
                                    >
                                        Login
                                    </NavLink>
                            }
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>

    )
}

export default Navbar