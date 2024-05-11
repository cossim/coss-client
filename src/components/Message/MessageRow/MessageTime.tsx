import { MESSAGE_SEND, formatTime, formatTimeFull } from '@/shared'
import useMessageStore from '@/stores/message'
import clsx from 'clsx'
import { Exclamationmark, Flag, Gobackward } from 'framework7-icons/react'
import { useEffect, useState } from 'react'

interface MessageTimeProps {
	item: any
	is_self: boolean
}

/**
 * 点击时间转换时间格式
 */
const MessageTime: React.FC<MessageTimeProps> = ({ item, is_self }) => {
	const create_at = item?.created_at ?? item?.send_at ?? item?.send_time
	const [messageTime, setMessageTime] = useState<string>(formatTime(create_at))
	const handlerClickTime = () => {
		const time: string = formatTime(create_at)
		const timeFull: string = formatTimeFull(create_at)
		if (messageTime.length < timeFull.length) {
			setMessageTime(timeFull)
		} else {
			setMessageTime(time)
		}
	}

	const messageStore = useMessageStore()

	// 如果该消息的发送时间超过10秒，还是在发送中，就显示重新发送
	useEffect(() => {
		if (item?.msg_send_state === MESSAGE_SEND.SENDING) {
			const now = new Date().getTime()
			if (now - create_at > 10000) {
				messageStore.updateMessage({ ...item, msg_send_state: MESSAGE_SEND.SEND_FAILED })
			}
		}
	}, [item?.msg_send_state])

	return (
		<div
			className={clsx(
				'flex text-[0.75rem] items-center mt-1 select-none',
				is_self ? 'justify-end' : 'justify-start'
			)}
		>
			<span onClick={handlerClickTime} style={{ color: '#94a3b8' }} className="text-[0.75rem] mr-1">
				{messageTime}
			</span>
			{is_self && (
				<>
					{item?.msg_send_state === MESSAGE_SEND.SENDING && <Gobackward className="animate-spin" />}
					{item?.msg_send_state === MESSAGE_SEND.SEND_FAILED && <Exclamationmark className="text-red-500" />}
				</>
			)}
			{item?.is_label === true && <Flag className="text-primary ml-[2px]" />}
		</div>
	)
}

export default MessageTime
