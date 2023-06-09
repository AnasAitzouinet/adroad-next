import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'


const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'My tasks', href: '#', icon: Bars4Icon, current: false },
    { name: 'Recent', href: '#', icon: ClockIcon, current: false },
]
const teams = [
    { name: 'Engineering', href: '#', bgColorClass: 'bg-indigo-500' },
    { name: 'Human Resources', href: '#', bgColorClass: 'bg-green-500' },
    { name: 'Customer Success', href: '#', bgColorClass: 'bg-yellow-500' },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export const SideBar = ({username , avatar}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const handleLogoutClick = async () => {
      try {
        setIsLoading(true);
  
        const response = await fetch('/api/auth/logout', { method: 'POST' });
  
        if (response.ok) {
          window.location.href = 'Authentication/login';
        } else {
          console.error(response.statusText);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    return (
        <div>

            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex flex-shrink-0 items-center px-4">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                    <nav className="px-2">
                                        <div className="space-y-1">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                                        'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                            'mr-3 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="px-3 text-sm font-medium text-gray-500" id="mobile-teams-headline">
                                                Teams
                                            </h3>
                                            <div className="mt-1 space-y-1" role="group" aria-labelledby="mobile-teams-headline">
                                                {teams.map((team) => (
                                                    <a
                                                        key={team.name}
                                                        href={team.href}
                                                        className="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    >
                                                        <span
                                                            className={classNames(team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full')}
                                                            aria-hidden="true"
                                                        />
                                                        <span className="truncate">{team.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
                <div className="flex flex-shrink-0 items-center px-6">
                    <Link href='/'>

                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500"
                        alt="Your Company"
                    />
                    </Link>
                </div>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
                    {/* User account dropdown */}
                    <Menu as="div" className="relative inline-block px-3 text-left">
                        <div>
                            <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                <span className="flex w-full items-center justify-between">
                                    <span className="flex min-w-0 items-center justify-between space-x-3">
                                        <img
                                            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                                            src={avatar}                                            alt=""
                                        />
                                        <span className="flex min-w-0 flex-1 flex-col">
                                            <span className="truncate text-sm font-medium text-gray-900">{username}</span>
                                            <span className="truncate text-sm text-gray-500">@{username}</span>
                                        </span>
                                    </span>
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="profile"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                View profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="Dashboard/settings"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Settings
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Get Mobile app
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Support
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link href='' onClick={handleLogoutClick}
                                              className={classNames(
                                                'block px-4 py-2 text-sm',
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                              )}
                                            >
                                              {isLoading ? 'Logging out...' : 'Logout'}
                                            
                                          </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    
                    {/* Navigation */}
                    <nav className="mt-6 px-3">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="mt-8">
                            {/* Secondary navigation */}
                            <h3 className="px-3 text-sm font-medium text-gray-500" id="desktop-teams-headline">
                                Compaings
                            </h3>
                            <div className="mt-1 space-y-1" role="group" aria-labelledby="desktop-teams-headline">
                                {teams.map((team) => (
                                    <a
                                        key={team.name}
                                        href={team.href}
                                        className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        <span
                                            className={classNames(team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full')}
                                            aria-hidden="true"
                                        />
                                        <span className="truncate">{team.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}
