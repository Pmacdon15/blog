import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import Providers from '@/components/Providers'
import PageContainer from '@/components/ui/containters/page-container'
import Header from '@/components/ui/header/Header'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: "Pat's Blogs",
	description:
		'A place to showcase technical issues I have found interesting.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Providers>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<PageContainer>
						<Header />

						{children}
						<Analytics />
					</PageContainer>
				</body>
			</html>
		</Providers>
	)
}
