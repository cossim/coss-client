import React, { useEffect, useRef, useState } from 'react'
import { VoiceIcon, AddIcon } from '@/components/Icon/Icon'
import { clsx } from 'clsx'
import { Button } from 'framework7-react'
import PropType from 'prop-types'
import Emojis from '@/components/Emojis/Emojis.jsx'
// import Editor from '@/utils/editor'
import Editor from '@/components/Editor/Editor'
import { sendType } from '@/utils/constants'
import { Multiply } from 'framework7-icons/react'
import More from './More'

function MsgBar(props) {
	// 整个底部
	const msgbarRef = useRef(null)
	// 文本输入框
	// const textareaRef = useRef(null)
	// 发送按钮显示隐藏
	const [showSendBtn, setShowSendBtn] = useState(false)
	// 文本内容
	// const [content, setContent] = useState('')
	// 更多操作
	const [showMore, setShowMore] = useState(false)
	// 操作类型
	const [type, setType] = useState('emoji')
	// 首次进入
	const [isFrist, setIsFrist] = useState(true)
	// 编辑器引擎实例
	const [engine, setEngine] = useState(null)

	const onEmojiSelect = ({ type, emoji }) => {
		console.log(type, emoji)
		console.log(type === 'emoji')
		console.log(window.getSelection())
		// type === 'emoji' && editor.insertEmoji(emoji)
		// editor.focus()
	}

	const send = () => {
		let value = engine.model.toValue()
		// if (props.type === sendType.REPLY) {
		// 	// replay_id
		// 	// const content = props.defaultMsg?.msg_content + value
		// } else {
		props.send(value, props.type, props.defaultMsg)
		// }
		engine?.setValue('')
		engine?.focus()
	}

	const handlerShowMore = (moreType) => {
		if (type === moreType) setShowMore(!showMore)
		setType(moreType)
	}

	useEffect(() => {
		if (engine) {
			engine.on('change', () => {
				setShowSendBtn(!engine.isEmpty())
			})
		}
	}, [engine])

	useEffect(() => {
		if (!isFrist && !showMore) {
			requestAnimationFrame(() => setTimeout(() => engine.focus(), 200))
		}
		isFrist && setIsFrist(false)
	}, [showMore])

	return (
		<div
			className={clsx(
				'fixed transition-all bottom-0 duration-[350ms] ease-in-out  left-0 right-0 h-auto min-h-14 border-t z-[999] bg-white msg-chat',
				showMore ? 'translate-y-0' : 'translate-y-[300px]'
			)}
			ref={msgbarRef}
		>
			<div className="rounded-2xl w-full h-auto flex items-end gap-2 p-2">
				<VoiceIcon className="w-9 h-9" />
				{/* <div
					className="w-full min-h-[42px] max-h-[150px] rounded-xl border p-2 overflow-y-auto"
					ref={textareaRef}
				/> */}
				<div className="w-full">
					<Editor
						setEditor={setEngine}
						className="min-h-[42px] max-h-[150px] rounded-xl border p-2 overflow-y-auto"
						defaultValue={(props.type === sendType.EDIT && props.defaultMsg?.msg_content) || ''}
					/>
					{props.type === sendType.REPLY && (
						<div className="bg-[#f5f5f5] mt-2 px-2 py-1 rounded relative felx justify-between items-center">
							<Editor
								className="w-[calc(100%-40px)] overflow-hidden h-[24px] line-clamp-1"
								readonly={true}
								defaultValue={props.defaultMsg?.msg_content || ''}
							/>
							<Multiply
								className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
								onClick={() => props?.setType(sendType.SEND)}
							/>
						</div>
					)}
				</div>

				<AddIcon
					className={clsx('w-9 h-9', showSendBtn ? 'hidden' : 'flex')}
					onClick={() => handlerShowMore('emoji')}
				/>
				<AddIcon
					className={clsx('w-9 h-9', showSendBtn ? 'hidden' : 'flex')}
					onClick={() => handlerShowMore('more')}
				/>
				<Button
					raised
					fill
					className={clsx(
						'animate__animated animate__faster whitespace-nowrap w-[80px] mb-1',
						showSendBtn ? 'block animate__fadeInRight' : 'animate__fadeInLeft hidden'
					)}
					onClick={send}
				>
					发送
				</Button>
			</div>
			<div className={clsx('w-full h-[300px] overflow-y-auto bg-[#f5f5f5]')}>
				{type === 'emoji' ? (
					<Emojis onEmojiSelect={onEmojiSelect} />
				) : (
					<More onMoreSelect={props?.onMoreSelect} />
				)}
			</div>
		</div>
	)
}

MsgBar.propTypes = {
	send: PropType.func,
	defaultMsg: PropType.object,
	type: PropType.number,
	setType: PropType.func,
	onMoreSelect: PropType.func
}

export default MsgBar
