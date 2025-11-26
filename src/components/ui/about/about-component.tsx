import Image from 'next/image'
import Container from '../containers/container'
export default function AboutComponent() {
	return (
		<Container>
			<div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
				<div className="relative shrink-0">
					<Image
						alt={'selfie'}
						className="relative h-32 w-32 rounded-full border-2 border-background object-cover object-center shadow-xl"
						height={200}
						src="/selfie.png"
						width={200}
					/>
				</div>
				<div className="flex flex-col gap-3 text-center md:text-left">
					<h2 className="font-bold text-2xl tracking-tight">
						About Me
					</h2>
					<p className="text-muted-foreground leading-relaxed">
						So I'm Patrick and this is my blog. I'm a recent college
						grad with a passion for Web Dev. My framework of choice
						is{' '}
						<span className="font-medium text-primary underline decoration-primary/30 underline-offset-4">
							NextJS
						</span>
						, in fact this site is made with Cached Components from{' '}
						<span className="font-medium text-primary underline decoration-primary/30 underline-offset-4">
							NextJS 16
						</span>
						. I just wanted a place where I could share a few ideas
						and things I've found interesting.
					</p>
				</div>
			</div>
		</Container>
	)
}
