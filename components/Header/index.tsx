import Link from 'next/link';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import Image from 'next/image';
import UserBalance from './UserBalance';
import Notification from './Notification';

const Header = (props: {
	sidebarOpen: string | boolean | undefined;
	setSidebarOpen: (arg0: boolean) => void;
}) => {
	return (
		<header className='sticky top-0 z-[999] flex w-full bg-black drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
			<div className='flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11'>
				<div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
					{/* <!-- Hamburger Toggle BTN --> */}
					<button
						aria-controls='sidebar'
						onClick={(e) => {
							e.stopPropagation();
							props.setSidebarOpen(!props.sidebarOpen);
						}}
						className='z-99999 block rounded-sm  bg-[#24303F] p-1.5 shadow-sm  lg:hidden'
					>
						<span className='relative block h-6 w-6 cursor-pointer '>
							<span className='block absolute right-0 h-full w-full '>
								<span
									className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-[0] duration-200 ease-in-out bg-white ${
										!props.sidebarOpen && '!w-full delay-300'
									}`}
								></span>
								<span
									className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-150 duration-200 ease-in-out bg-white ${
										!props.sidebarOpen && 'delay-400 !w-full'
									}`}
								></span>
								<span
									className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm  delay-200 duration-200 ease-in-out bg-white ${
										!props.sidebarOpen && '!w-full delay-500'
									}`}
								></span>
							</span>
							<span className='absolute right-0 h-full w-full rotate-45'>
								<span
									className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm delay-300 duration-200 ease-in-out bg-white ${
										!props.sidebarOpen && '!h-0 !delay-[0]'
									}`}
								></span>
								<span
									className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm  duration-200 ease-in-out bg-white ${
										!props.sidebarOpen && '!h-0 !delay-200'
									}`}
								></span>
							</span>
						</span>
					</button>
					{/* <!-- Hamburger Toggle BTN --> */}

					<Link className='block flex-shrink-0 lg:hidden' href='/'>
						<h3 className='text-2xl font-bold text-white border-dashed sm:text-base md:text-3xl lg:flex md:flex sm:flex brand__style w-50'>
							h5Fivex
						</h3>
					</Link>
				</div>

				<div className='hidden sm:block'>
					<h3 className='text-2xl font-bold text-white border-dashed sm:text-base md:text-3xl lg:flex md:flex sm:flex brand__style w-50'>
						h5Fivex
					</h3>
				</div>

				<div className='flex items-center gap-3 2xsm:gap-7'>
					<ul className='flex items-center gap-2 2xsm:gap-4'>
						<Notification />
						{/* <!-- Notification Menu Area --> */}

						{/* <!-- Chat Notification Area --> */}
						{/* <DropdownMessage /> */}
						{/* <!-- Chat Notification Area --> */}
					</ul>

					{/* <!-- User Area --> */}
					<DropdownUser />
					{/* <!-- User Area --> */}
				</div>
			</div>
		</header>
	);
};

export default Header;
