import Image from 'next/image'
import Container from '../containers/container'
export default function AboutComponent() {
	return (
		<Container>
			<Image
				alt={'selfie'}
				className="mr-2 h-24 w-24 rounded-full object-cover object-center"
				height={200}
				src="/selfie.png"
				width={200}
			/>
			<p className="text-md">
				So I'm Patrick and this is my blog. I'm a recent college grad
				with a passion for Web Dev. My framework of choice is{' '}
				<span className="font-medium underline"> NextJS </span>, in fact
				this site is made with Cached Components from{' '}
				<span className="font-medium underline"> NextJS 16</span>. I
				just wanted a place where I could share a few ideas and things
				I've found interesting.
			</p>
		</Container>
	)
}
