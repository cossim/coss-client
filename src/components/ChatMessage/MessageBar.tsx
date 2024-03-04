import clsx from 'clsx'
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { $t, MESSAGE_TYPE, MessageMore, TOOLTIP_TYPE, hasImageHtml, scroll } from '@/shared'
import { useMessageStore } from '@/stores/message'
import { Button, Link } from 'framework7-react'
import {
	ArrowRightCircleFill,
	ArrowUpRight,
	FaceSmiling,
	MicCircleFill,
	PlusCircle,
	Trash,
	Xmark,
	XmarkCircle
} from 'framework7-icons/react'
import { KeyboardIcon } from '@/components/Icon/Icon'
import ToolEditor, { ReadEditor, type ToolEditorMethods } from '@/Editor'
import Emojis from '@/components/Emojis/Emojis'
// import ToolBarMore from '@/components/Message/ToolBarMore'
import Quill from 'quill'
// import { Delta } from 'quill/core'
// import { EmitterSource } from 'quill/core/emitter'
import { useResizeObserver } from '@reactuses/core'
import { debounce } from 'lodash-es'

interface MessageBarProps {
	contentEl: RefObject<HTMLDivElement>
	isScrollEnd: (setp?: number) => boolean
	selectItem?: any
}

const MessageBar: React.FC<MessageBarProps> = ({ contentEl, isScrollEnd, selectItem }) => {
	const msgStore = useMessageStore()
	const toolbarRef = useRef<HTMLDivElement | null>(null)
	const editorRef = useRef<ToolEditorMethods>(null)

	const [keyboardHeight, setKeyboardHeight] = useState<number>(0)
	useResizeObserver(contentEl, () => pageSizeChange)
	const pageSizeChange = debounce(() => {
		isScrollEnd(300) && scroll(contentEl.current!, false)
	}, 500)

	const [msgType, setMsgType] = useState(MESSAGE_TYPE.TEXT)
	const [moreType, setMoreType] = useState(MessageMore.TEXT)

	const moreTypeChange = useCallback((type: MessageMore) => {
		if (type !== MessageMore.TEXT) {
			setKeyboardHeight(300)
		} else {
			setKeyboardHeight(0)
		}
		setMoreType(type)
	}, [])

	const [selectType, setSelectType] = useState<TOOLTIP_TYPE>(TOOLTIP_TYPE.NONE)
	// 是否处于多选状态
	const isSelect = useMemo(() => selectType === TOOLTIP_TYPE.SELECT, [selectType])
	// 是否处于回复状态
	const isReply = useMemo(() => selectType === TOOLTIP_TYPE.REPLY, [selectType])
	// 是否处于编辑状态
	const isEdit = useMemo(() => selectType === TOOLTIP_TYPE.EDIT, [selectType])

	const [showBtn, setShowBtn] = useState<boolean>(false)

	const sendMessage = () => {
		const quill = editorRef.current!.quill
		let type = msgType

		const content = quill.getSemanticHTML()
		if (hasImageHtml(content)) type = MESSAGE_TYPE.IMAGE

		// 发送或编辑消息
		selectType === TOOLTIP_TYPE.EDIT
			? msgStore.editMessage(selectItem, content)
			: msgStore.sendMessage(type, content, { replay_id: isReply ? selectItem?.msg_id : 0 })

		setSelectType(TOOLTIP_TYPE.NONE)

		// 发送成功的操作
		quill.deleteText(0, quill.getLength() - 1)
		if (!moreType) quill.focus()
	}

	const onSelectEmojis = () => {}

	// useEffect(() => {
	// 	if (!editorRef.current?.quill) return

	// 	const quill = editorRef.current.quill

	// 	console.log(quill)

	// 	quill.on(Quill.events.EDITOR_CHANGE, (type: string) => {
	// 		console.log('type', type)

	// 		if (type !== Quill.events.SELECTION_CHANGE) {
	// 			setShowBtn(quill.getLength() > 1)
	// 		}
	// 	})

	// 	quill.root.addEventListener('focus', () => {
	// 		setKeyboardHeight(0)
	// 	})
	// }, [editorRef])

	useEffect(() => {
		requestAnimationFrame(() => {
			const timer = setTimeout(() => {
				if (!editorRef.current || !editorRef.current.quill) return

				const quill = editorRef.current.quill

				quill.on(Quill.events.EDITOR_CHANGE, (type: string) => {
					if (type !== Quill.events.SELECTION_CHANGE) {
						setShowBtn(quill.getLength() > 1)
					}
				})

				quill.root.addEventListener('focus', () => {
					setKeyboardHeight(0)
				})

				clearTimeout(timer)
			}, 0)
		})

		return () => {
			editorRef.current?.quill?.off(Quill.events.EDITOR_CHANGE)
		}
	}, [])

	return (
		<div className={clsx('message-toolbar bg-bgPrimary bottom-0 w-full h-auto z-[99]')} ref={toolbarRef}>
			<div className="flex flex-col justify-center items-center">
				<div className="w-full rounded-2xl flex items-end relative h-full py-2 transition-all duration-300 ease-in">
					<div className={clsx('w-full', isSelect ? 'flex' : 'hidden')}>
						<div className="w-full flex bg-bgPrimary">
							<Link
								className="flex flex-col flex-1 items-center justify-center"
								// onClick={() => setShowSelect(true)}
							>
								<ArrowUpRight className="text-xl mb-1" />
								<span className="text-[0.75rem]">{$t('转发')}</span>
							</Link>
							<Link
								className="flex flex-col flex-1 items-center justify-center"
								// onClick={selectEvent.delete}
							>
								<Trash className="text-xl mb-1" />
								<span className="text-[0.75rem]">{$t('删除')}</span>
							</Link>
						</div>
					</div>

					<div className={clsx('w-full', !isSelect ? 'flex' : 'hidden')}>
						<div className={clsx('flex-1 px-2 flex', msgType === MESSAGE_TYPE.AUDIO ? 'flex' : 'hidden')}>
							<Link onClick={() => setMsgType(MESSAGE_TYPE.TEXT)}>
								<Xmark className="text-3xl text-gray-500 animate__animated animate__zoomIn" />
							</Link>
							<Button fill className="w-full h-9 mx-2 animate__animated animate__zoomIn" round>
								{$t('长按说话')}
							</Button>
							<Link onClick={() => moreTypeChange(MessageMore.TEXT)}>
								<PlusCircle className="text-4xl text-gray-500 mr-2" />
							</Link>
						</div>

						<div
							className={clsx(
								'w-full flex items-end',
								msgType !== MESSAGE_TYPE.AUDIO ? 'flex' : 'hidden'
							)}
						>
							<div className={clsx('flex-1 rounded pl-2')}>
								<div className="py-2 bg-bgSecondary rounded w-full flex items-center">
									<ToolEditor
										ref={editorRef}
										readonly={false}
										placeholder={$t('请输入内容')}
										// id={receiver_id}
										is_group={false}
									/>
								</div>
								{(isReply || isEdit) && (
									<div className="mt-1 bg-bgTertiary relative flex justify-between">
										<ReadEditor content={selectItem?.content} className="reply-read-editor" />
										<Link
											className="pr-2"
											onClick={() => {
												setSelectType(TOOLTIP_TYPE.NONE)
												editorRef.current?.quill.deleteText(
													0,
													editorRef.current?.quill.getLength()
												)
											}}
										>
											<XmarkCircle className="text-textTertiary" />
										</Link>
									</div>
								)}
							</div>
							<div className="flex items-center px-2">
								{moreType === MessageMore.EMOJI ? (
									<Link onClick={() => moreTypeChange(MessageMore.TEXT)}>
										<KeyboardIcon className="text-4xl text-gray-500 mr-2" />
									</Link>
								) : (
									<Link onClick={() => moreTypeChange(MessageMore.EMOJI)}>
										<FaceSmiling className="text-4xl text-gray-500 mr-2" />
									</Link>
								)}

								{moreType === MessageMore.OTHER ? (
									<Link onClick={() => moreTypeChange(MessageMore.TEXT)}>
										<KeyboardIcon className="text-4xl text-gray-500 mr-2" />
									</Link>
								) : (
									<Link onClick={() => moreTypeChange(MessageMore.OTHER)}>
										<PlusCircle className="text-4xl text-gray-500 mr-2" />
									</Link>
								)}

								{showBtn ? (
									<Link onClick={sendMessage}>
										<ArrowRightCircleFill className="text-4xl text-primary animate__animated animate__zoomIn" />
									</Link>
								) : (
									<Link
										onClick={() => {
											setMsgType(MESSAGE_TYPE.AUDIO)
										}}
									>
										<MicCircleFill className="text-4xl text-primary animate__animated animate__zoomIn" />
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
				<div
					className={clsx('w-full overflow-hidden transition-all duration-300 ease-linear')}
					style={{ height: keyboardHeight + 'px' }}
				>
					<Emojis
						onSelectEmojis={onSelectEmojis}
						className={moreType === MessageMore.EMOJI ? '' : 'hidden'}
					/>
					<div
						className={clsx(
							'w-full h-full overflow-y-auto',
							moreType === MessageMore.OTHER ? '' : 'hidden'
						)}
					>
						{/* {!is_system && <ToolBarMore is_group={is_group} id={receiver_id} f7router={f7router} />} */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MessageBar
