import { useUpdateSection } from '@/lib/mutations/mutations'

export function UpdateButton({
	blogId,
	sectionId,
	sectionTypeId,
}: {
	blogId: number
	sectionId: number
	sectionTypeId: number
}) {
	const { mutate: mutateUpdate, isPending } = useUpdateSection(blogId)

	return (
		<button
			className="mx-auto rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-2 transition-transform duration-300 hover:scale-110 hover:bg-black"
			disabled={isPending}
			formAction={(formData: FormData) =>{				
				mutateUpdate({
					formData,
					sectionId: sectionId,
					sectionTypeId: sectionTypeId,
					blogId: blogId,
				})}
			}
			type="submit"
		>
			Update Section
		</button>
	)
}
