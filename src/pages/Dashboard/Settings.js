import { Fragment, useState, useRef } from 'react'
import { Dialog, Switch, Transition } from '@headlessui/react'
import {
    ArrowLeftOnRectangleIcon,
    Bars3BottomLeftIcon,
    BellIcon,
    BriefcaseIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    CogIcon,
    DocumentMagnifyingGlassIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { SideBar } from '../../../components/SideBar'


const tabs = [
    { name: 'General', href: '#', current: true },
    { name: 'Password', href: '#', current: false },
    { name: 'Notifications', href: '#', current: false },
    { name: 'Plan', href: '#', current: false },
    { name: 'Billing', href: '#', current: false },
    { name: 'Team Members', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Settings() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true)
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false)

    const [name, setName] = useState('Chelsea Hagon');
    const [email, setEmail] = useState("chelsea.hagon@example.com")
    const [isEditable, setIsEditable] = useState(false);

    function makeEditable() {
        setIsEditable(true);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleNameBlur() {
        setIsEditable(false);
    }
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleEmailBlur() {
        setIsEditable(false);
    }
    return (



        <div>
            <SideBar />
            {/* Content area */}
            <div className="md:pl-64">
                <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
                    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
                        <button
                            type="button"
                            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <div className="flex flex-1 justify-between px-4 md:px-0">
                            <div className="flex flex-1">
                                <form className="flex w-full md:ml-0" action="#" method="GET">
                                    <label htmlFor="mobile-search-field" className="sr-only">
                                        Search
                                    </label>
                                    <label htmlFor="desktop-search-field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                            <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                        </div>
                                        <input
                                            name="mobile-search-field"
                                            id="mobile-search-field"
                                            className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:hidden"
                                            placeholder="Search"
                                            type="search"
                                        />
                                        <input
                                            name="desktop-search-field"
                                            id="desktop-search-field"
                                            className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:block"
                                            placeholder="Search jobs, applicants, and more"
                                            type="search"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    className="rounded-full bg-white p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                >
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    <span className="sr-only">View notifications</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <main className="flex-1">
                        <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
                            <div className="pt-10 pb-16">
                                <div className="px-4 sm:px-6 md:px-0">
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
                                </div>
                                <div className="px-4 sm:px-6 md:px-0">
                                    <div className="py-6">
                                        {/* Tabs */}
                                        <div className="lg:hidden">
                                            <label htmlFor="selected-tab" className="sr-only">
                                                Select a tab
                                            </label>
                                            <select
                                                id="selected-tab"
                                                name="selected-tab"
                                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                                                defaultValue={tabs.find((tab) => tab.current).name}
                                            >
                                                {tabs.map((tab) => (
                                                    <option key={tab.name}>{tab.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="hidden lg:block">
                                            <div className="border-b border-gray-200">
                                                <nav className="-mb-px flex space-x-8">
                                                    {tabs.map((tab) => (
                                                        <a
                                                            key={tab.name}
                                                            href={tab.href}
                                                            className={classNames(
                                                                tab.current
                                                                    ? 'border-purple-500 text-purple-600'
                                                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                                            )}
                                                        >
                                                            {tab.name}
                                                        </a>
                                                    ))}
                                                </nav>
                                            </div>
                                        </div>

                                        {/* Description list with inline editing */}
                                        <div className="mt-10 divide-y divide-gray-200">
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                                                <p className="max-w-2xl text-sm text-gray-500">
                                                    This information will be displayed publicly so be careful what you share.
                                                </p>
                                            </div>
                                            <div className="mt-6">
                                                <dl className="divide-y divide-gray-200">
                                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                                        <dt className="text-sm font-medium text-gray-500">Photo</dt>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <span className="flex-grow">
                                                                <img
                                                                    className="h-8 w-8 rounded-full"
                                                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                    alt=""
                                                                />
                                                            </span>
                                                            <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                >
                                                                    Update
                                                                </button>
                                                                <span className="text-gray-300" aria-hidden="true">
                                                                    |
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </span>
                                                        </dd>
                                                    </div>
                                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500">FName</dt>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            {isEditable ? (
                                                                <input
                                                                    type="text"
                                                                    value={name}
                                                                    onChange={handleNameChange}
                                                                    onBlur={handleNameBlur}
                                                                    className="flex-grow"
                                                                />
                                                            ) : (
                                                                <span className="flex-grow" >
                                                                    {name}
                                                                </span>
                                                            )}
                                                            <span className="ml-4 flex-shrink-0">
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                    onClick={makeEditable}
                                                                >
                                                                    Update
                                                                </button>
                                                            </span>
                                                        </dd>
                                                    </div>
                                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            {isEditable ? (
                                                                <input
                                                                    type="text"
                                                                    value={name}
                                                                    onChange={handleNameChange}
                                                                    onBlur={handleNameBlur}
                                                                    className="flex-grow"
                                                                />
                                                            ) : (
                                                                <span className="flex-grow" >
                                                                    {name}
                                                                </span>
                                                            )}
                                                            <span className="ml-4 flex-shrink-0">
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                    onClick={makeEditable}
                                                                >
                                                                    Update
                                                                </button>
                                                            </span>
                                                        </dd>
                                                    </div>
                                                    
                                                    
                                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            {isEditable ? (
                                                                <input
                                                                    type="email"
                                                                    required
                                                                    value={email}
                                                                    onChange={handleEmailChange}
                                                                    onBlur={handleEmailBlur}
                                                                    className="flex-grow"
                                                                />
                                                            ) : (
                                                                <span className="flex-grow" >
                                                                    {email}
                                                                </span>
                                                            )}
                                                            <span className="ml-4 flex-shrink-0">
                                                                <button
                                                                    onClick={makeEditable}
                                                                    type="button" 
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                >
                                                                    Update
                                                                </button>
                                                            </span>
                                                        </dd>
                                                    </div>
                                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500">Job title</dt>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <span className="flex-grow">Human Resources Manager</span>
                                                            <span className="ml-4 flex-shrink-0">
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                >
                                                                    Update
                                                                </button>
                                                            </span>
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                            
                                        </div>

                                        <div className="mt-10 divide-y divide-gray-200">
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-medium leading-6 text-gray-900">Account</h3>
                                                <p className="max-w-2xl text-sm text-gray-500">
                                                    Manage how information is displayed on your account.
                                                </p>
                                            </div>
                                            <div className="mt-6">
                                                <dl className="divide-y divide-gray-200">
                                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500">Language</dt>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <span className="flex-grow">English</span>
                                                            <span className="ml-4 flex-shrink-0">
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                >
                                                                    Update
                                                                </button>
                                                            </span>
                                                        </dd>
                                                    </div>
                                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                                        <dt className="text-sm font-medium text-gray-500">Date format</dt>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <span className="flex-grow">DD-MM-YYYY</span>
                                                            <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                >
                                                                    Update
                                                                </button>
                                                                <span className="text-gray-300" aria-hidden="true">
                                                                    |
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </span>
                                                        </dd>
                                                    </div>
                                                    <Switch.Group as="div" className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                                                        <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                                                            Automatic timezone
                                                        </Switch.Label>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <Switch
                                                                checked={automaticTimezoneEnabled}
                                                                onChange={setAutomaticTimezoneEnabled}
                                                                className={classNames(
                                                                    automaticTimezoneEnabled ? 'bg-purple-600' : 'bg-gray-200',
                                                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto'
                                                                )}
                                                            >
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        automaticTimezoneEnabled ? 'translate-x-5' : 'translate-x-0',
                                                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                    )}
                                                                />
                                                            </Switch>
                                                        </dd>
                                                    </Switch.Group>
                                                    <Switch.Group
                                                        as="div"
                                                        className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
                                                    >
                                                        <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                                                            Auto-update applicant data
                                                        </Switch.Label>
                                                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <Switch
                                                                checked={autoUpdateApplicantDataEnabled}
                                                                onChange={setAutoUpdateApplicantDataEnabled}
                                                                className={classNames(
                                                                    autoUpdateApplicantDataEnabled ? 'bg-purple-600' : 'bg-gray-200',
                                                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto'
                                                                )}
                                                            >
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        autoUpdateApplicantDataEnabled ? 'translate-x-5' : 'translate-x-0',
                                                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                    )}
                                                                />
                                                            </Switch>
                                                        </dd>
                                                    </Switch.Group>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
