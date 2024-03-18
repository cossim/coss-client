import { usePreviewStore } from '@/stores/preview'
import { PrivateChats } from '@/types/db/user-db'
import { useMemo } from 'react'

interface MessageAudioProps {
	msg: PrivateChats
}

const MessageVideo: React.FC<MessageAudioProps> = ({ msg }) => {
	const content = useMemo(() => {
		try {
			return JSON.parse(msg.content)
		} catch (error) {
			return null
		}
	}, [msg.content])

	const url = useMemo(() => content?.url ?? '', [content?.url])

	const previewStore = usePreviewStore()

	return (
		<>
			<div
				className="max-h-32 overflow-hidden flex justify-center items-center"
				onClick={() => previewStore.preview({ url, type: 'video' })}
			>
				<video className="h-full" muted autoPlay loop src={url} />
			</div>
		</>
	)
}

export default MessageVideo