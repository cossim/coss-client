import { useState, useEffect, useRef } from 'react'
import { App as AppComponent, View, f7 } from 'framework7-react'
import { Framework7Parameters } from 'framework7/types'
import '@/utils/notification'
import routes from './router'
import Layout from './components/Layout'
import { $t, TOKEN, SocketClient, createSocket, toastMessage, uploadPublicKey } from '@/shared'
import { hasCookie } from '@/utils/cookie'
import { AppState, App as CapApp } from '@capacitor/app'
import { Router } from 'framework7/types'
import { useAsyncEffect } from '@reactuses/core'
import { PluginListenerHandle } from '@capacitor/core'
import Preview from './components/Preview/Preview'
import LiveRoom from '@/components/LiveRoom'
// import LiveRoomNew from '@/components/Live'
import { useLiveRoomStore } from './stores/liveRoom'
import { StatusBar, Style } from '@capacitor/status-bar'
import useCacheStore from '@/stores/cache'
import run from './run'
import { isWeb } from './utils'
import useUserStore from '@/stores/user'
import useMessageStore, { defaultInitOptions } from './stores/message'
import { usePreviewStore } from './stores/preview'
import DevicePopup from './components/DevicePopup/DevicePopup'

function App() {
	const router = useRef<Router.Router | null>(null)
	const liveRoomStore = useLiveRoomStore()
	const cacheStore = useCacheStore()
	const userStore = useUserStore()
	const [theme] = useState(localStorage.getItem('theme') || 'light')

	const [f7params] = useState<Framework7Parameters>({
		name: '',
		theme: 'ios',
		darkMode: theme == 'dark',
		routes,
		colors: {
			primary: '#33a854'
		},
		dialog: {
			buttonOk: $t('确定'),
			buttonCancel: $t('取消'),
			preloaderTitle: $t('加载中...')
		},
		touch: {
			tapHold: true
		},
		on: {
			routeChanged: (_newRoute: Router.Route, _previousRoute: Router.Route, _router: Router.Router) => {
				router.current = _router
			}
		}
	})

	useEffect(() => {
		// 修复手机上的视口比例
		if ((f7.device.ios || f7.device.android) && f7.device.standalone) {
			const viewEl = document.querySelector('meta[name="viewport"]') as HTMLMetaElement
			viewEl.setAttribute('content', `${viewEl.getAttribute('content')}, maximum-scale=1, user-scalable=no`)
		}

		// 连接 socket
		if (hasCookie(TOKEN)) {
			cacheStore.init()
			run()
			// 如果上一次登录时间为0，就需要上传公钥
			if (!userStore.lastLoginTime) {
				uploadPublicKey()
				userStore.update({ lastLoginTime: Date.now() })
			}
			createSocket()
			// if (!cacheStore.cacheKeyPair) setDevicePopupVisible(true)

			// 如果是新设备登录
			// if (userStore.lastLoginTime && userStore.isNewLogin) {
			// 	toastMessage('检测到新设备登录')
			// }

			// SocketClient.connect()
			// SocketClient.addListener('onWsMessage', handlerInit)
		}

		return () => {
			// SocketClient.removeListener('onWsMessage', handlerInit)
		}
	}, [])

	let backListener: PluginListenerHandle
	let appStateListener: PluginListenerHandle

	const messageStore = useMessageStore()
	const previewStore = usePreviewStore()
	useAsyncEffect(
		async () => {
			let backNumber = 0
			let timer: NodeJS.Timeout | null = null

			const historyRoutes = ['/dialog/', '/contact/', '/my/']

			const backButtonHandler = () => {
				timer && clearTimeout(timer)
				backNumber++

				timer = setTimeout(() => {
					backNumber = 0
				}, 1000)

				// 监听消息页返回
				if (
					router.current?.currentRoute.url !== undefined &&
					router.current?.currentRoute.url.indexOf('/message/') !== -1
				) {
					// 清空当前消息页数据
					messageStore.update(defaultInitOptions)
					// 关闭预览
					previewStore.close()
				}
				const flag = historyRoutes.includes(router.current?.currentRoute.url ?? '')
				if (flag) toastMessage('再按一次退出程序')
				if (backNumber > 1) {
					if (flag) {
						CapApp.minimizeApp()
					}
				}

				if (router.current && router.current.history.length > 1) {
					router.current.back()
					router.current = null
				}
			}

			const appChange = async (state: AppState) => {
				if (state.isActive) {
					if (hasCookie(TOKEN) && SocketClient.isDisconnect()) {
						SocketClient.connect()
					}
					cacheStore.updateFirstOpened(true)
				} else {
					cacheStore.updateFirstOpened(false)
				}
			}

			// 添加返回按钮事件监听器
			backListener = await CapApp.addListener('backButton', backButtonHandler)
			appStateListener = await CapApp.addListener('appStateChange', appChange)
		},
		() => {
			backListener && backListener.remove()
			appStateListener && appStateListener.remove()
		},
		[]
	)

	useAsyncEffect(
		async () => {
			try {
				if (await isWeb()) return
				// if (liveRoomStore.opened) {
				// 	await StatusBar.hide()
				// 	return
				// }
				// 设置状态栏样式
				StatusBar.setBackgroundColor({ color: '#ffffff' }) // 设置状态栏背景颜色为白色
				StatusBar.setOverlaysWebView({ overlay: false }) // 如果您使用的是原生状态栏，则需设置为 false
				// 设置状态栏文字颜色
				StatusBar.setStyle({ style: Style.Light }) // 设置状态栏文字为黑色
			} catch (error) {
				console.log(error)
			}
		},
		() => {},
		[liveRoomStore.opened]
	)

	return (
		<AppComponent {...f7params}>
			{hasCookie(TOKEN) ? (
				<>
					<Layout />
					<Preview />
					<LiveRoom />
					{/* <LiveRoomNew /> */}
					<DevicePopup />
				</>
			) : (
				<View url="/auth/" id="view-auth" name="auth" />
			)}
		</AppComponent>
	)
}

export default App
