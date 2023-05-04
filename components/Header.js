import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import {
    ArrowUturnLeftIcon,
    Bars3Icon,
    ChatBubbleBottomCenterTextIcon,
    ChatBubbleLeftEllipsisIcon,
    ChatBubbleLeftRightIcon,
    DocumentChartBarIcon,
    HeartIcon,
    InboxIcon,
    PencilSquareIcon,
    QuestionMarkCircleIcon,
    SparklesIcon,
    TrashIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Link from 'next/link'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Brands and Agencies', href: '#' },
    { name: 'Drivers', href: '#' },
    { name: 'Contact us', href: 'Contacts' },
  ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export const Header = () => {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <nav className="flex items-center justify-between pt-6" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="Authentication/login" className="text-sm font-semibold leading-6 text-white">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 px-6 py-6 lg:hidden">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/25">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link
                                    href="Authentiocation/login"
                                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white hover:bg-gray-400/10"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    )
}
