import { useEffect, useState } from 'react'
import { Page, f7 } from 'framework7-react'
import { PhoneFill } from 'framework7-icons/react'
import '@livekit/components-styles'
import {
	ControlBar,
	DisconnectButton,
	GridLayout,
	LiveKitRoom,
	ParticipantTile,
	RoomAudioRenderer,
	useTracks
} from '@livekit/components-react'
import { Track } from 'livekit-client'
import './Call.scss'
import { useCallStore } from '@/stores/call'
import { CallStatus, getStatusDescription } from '@/shared'
import { MessageEventEnum } from './enums'
import localNotification, { LocalNotificationType } from '@/utils/notification'

const Call: React.FC<RouterProps> = (props) => {
	const { enablesVideo, callInfo, status, reject, accept, hangup } = useCallStore()

	const roomReady = status === CallStatus.CALLING && callInfo?.wsInfo

	const [worker, setWorker] = useState<Worker | null>(null)
	// 等待时间
	const [waittingTimer, setWaitTimer] = useState(10 * 60 * 60) // 时 分 秒
	// const [waittingTimer, setWaitTimer] = useState(60) // 时 分 秒
	useEffect(() => {
		;(async () => {
			if (status === CallStatus.WAITING) {
				if (!worker) {
					const worker = new Worker(new URL('./worker/timer.ts', import.meta.url))
					worker.postMessage({
						event: MessageEventEnum.TIMER_START,
						data: { duration: waittingTimer * 1000 }
					})
					worker.onmessage = (message) => {
						// console.log('收到Worker回复', message.data)
						const { event, data } = message.data
						switch (event) {
							case MessageEventEnum.TIMEOUT:
								localNotification(LocalNotificationType.CALL, '未接来电', '您有未接来电待处理！')
								reject()
								f7.dialog.close()
								break
							case MessageEventEnum.TIMER_CHANGE:
								setWaitTimer(data.remainder)
								break
						}
					}
					setWorker(worker)
				}
			}
			if (status === CallStatus.CALLING && !callInfo?.wsInfo) {
				f7.dialog.alert('通话信息异常，请重新发起通话！', () => {
					hangup()
					f7.dialog.close()
				})
			}
			if (status === CallStatus.IDLE) {
				console.log('空闲')
				props.f7router.back()
			}
		})()
		return () => {
			if (worker) {
				worker.terminate()
				setWorker(null)
			}
		}
	}, [status, callInfo?.wsInfo])

	const [errCount, setErrCount] = useState(0)
	const onConnected = () => {
		console.log('通话连接成功')
		getStatusDescription(status)
		setErrCount(0)
	}
	const roomDisconnect = () => {
		console.log('通话断开')
		getStatusDescription(status)
		errCount >= 3 && hangup()
	}

	const roomError = (err: any) => {
		setErrCount(errCount + 1)
		console.log('通话出现异常：', getStatusDescription(status), err)
		status === CallStatus.WAITING && reject()
	}

	// 挂断
	const onRefuse = async () => {
		await reject()
		worker?.postMessage({
			event: MessageEventEnum.TIMER_STOP,
			data: null
		})
		worker?.terminate()
	}
	// 接通
	const onConnect = async () => {
		await accept()
		worker?.postMessage({
			event: MessageEventEnum.TIMER_STOP,
			data: null
		})
	}

	return (
		<Page className="bg-bgPrimary bg-zinc-900 z-[999] flex flex-col justify-center items-center" noNavbar noToolbar>
			{roomReady && (
				<LiveKitRoom
					data-lk-theme="default"
					token={callInfo.wsInfo.token}
					serverUrl={callInfo.wsInfo.url}
					audio={true}
					video={enablesVideo}
					screen={false}
					onConnected={onConnected}
					onDisconnected={roomDisconnect}
					onError={roomError}
				>
					<MyVideoConference />
					<RoomAudioRenderer />
					<MyControlBar errCount={errCount} hangup={hangup} />
				</LiveKitRoom>
			)}
			<div className="absolute bottom-10 w-full flex flex-col justify-evenly items-center">
				{status !== CallStatus.CALLING && (
					<div className="text-white fixed top-1/2">
						{status === CallStatus.WAITING && <div className="">等待时间：{waittingTimer}s</div>}
						<div className="">{getStatusDescription(status)}</div>
					</div>
				)}
				{status === CallStatus.WAITING && (
					<div className="w-full flex flex-row justify-evenly items-center">
						{/* 拒绝 */}
						<PhoneFill
							className="size-[45px] box-content p-2 rounded-full bg-gray-100 text-red-500"
							onClick={onRefuse}
						/>
						{/* 接通 */}
						<PhoneFill
							className="size-[45px] box-content p-2 rounded-full bg-gray-100 text-green-500"
							onClick={onConnect}
						/>
					</div>
				)}
			</div>
		</Page>
	)
}

function MyVideoConference() {
	// const { enablesVideo } = useCallStore()
	// console.log('MyVideoConference', enablesVideo)

	const tracks = useTracks(
		[
			{ source: Track.Source.Camera, withPlaceholder: true },
			{ source: Track.Source.ScreenShare, withPlaceholder: false }
		],
		{ onlySubscribed: false }
	)
	return (
		<GridLayout tracks={tracks} style={{ height: 'calc(100% - var(--lk-control-bar-height))' }}>
			<ParticipantTile />
		</GridLayout>
	)
}

interface MyControlBarProps {
	errCount: number
	hangup: () => Promise<void>
}

function MyControlBar(props: MyControlBarProps) {
	return (
		<>
			<ControlBar />
			{props.errCount > 0 && (
				<div className="p-2 fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center bg-white text-red-500">
					<div>网络异常,重试中(3/{props.errCount})...</div>
				</div>
			)}
			<div className="p-2 box-border">
				<DisconnectButton onClick={props.hangup}>挂断</DisconnectButton>
			</div>
		</>
	)
}

export default Call
