import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import Logo from './Logo';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import { IconType } from 'react-icons/lib/esm/iconBase';

interface Props {
	navItems: { label: string; icon: IconType; href: string }[];
}

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
	const [visible, setVisible] = useState<boolean | null>(null);
	useEffect(() => {
		const storedNavOpen = localStorage.getItem('navOpen');
		setVisible((storedNavOpen === 'false' ? false : true) || false);
	}, []);

	return (
		<>
			{visible !== null && (
				<nav
					className={`h-screen ${
						visible ? 'w-60' : 'w-12'
					} shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between overflow-hidden transition-width sticky top-0`}
				>
					<div>
						<Link
							className='flex items-center space-x-2 p-3 mb-6'
							href='/admin'
						>
							<Logo className='dark:fill-highlight-dark fill-highlight-light w-5 h-5 ' />
							{visible && (
								<span className='dark:text-highlight-dark text-highlight-light text-xl font-semibold leading-none'>
									Admin
								</span>
							)}
						</Link>

						<div className='space-y-4'>
							{navItems.map((item) => {
								return (
									<Link
										key={item.href}
										className='flex item-center dark:text-highlight-dark text-highlight-light text-xl p-3 hover:scale-[0.98] transition'
										href={item.href}
									>
										<item.icon size={24} />
										{visible && (
											<span className='ml-2 leading-none'>{item.label}</span>
										)}
									</Link>
								);
							})}
						</div>
					</div>
					<button className='dark:text-highlight-dark p-3 text-highlight-light hover:scale-[0.98] hover:text-red-500 transition self-end'>
						{visible ? (
							<RiMenuFoldFill
								onClick={() => {
									setVisible(false),
										localStorage.setItem('navOpen', JSON.stringify(false));
								}}
								size={25}
							/>
						) : (
							<RiMenuUnfoldFill
								onClick={() => {
									setVisible(true),
										localStorage.setItem('navOpen', JSON.stringify(true));
								}}
								size={25}
							/>
						)}
					</button>
				</nav>
			)}
		</>
	);
};

export default AdminNav;
