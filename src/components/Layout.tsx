import { Link, Toolbar, View, Views } from 'framework7-react'
import { useRef, useState } from 'react'
import $ from 'dom7'
import useCacheStore from '@/stores/cache'
import useRouterStore from '@/stores/router.ts'
import useToolbarStore from '@/stores/toolbar.ts'
import { useLongPress } from '@reactuses/core'

const Layout: React.FC = () => {
	const [tabActive, setTabActive] = useState<string>('dialog')
	const previousTab = useRef<string>('dialog')
	const { router } = useRouterStore()
	const { setDoubleClick, setLongClick } = useToolbarStore()
	const onTabLinkClick = (tabName: string) => {
		// 单击
		switch (tabName) {
			case 'dialog':
				// setSingleClick(true)
				break
			case 'contacts':

				break
			case 'my':
				break
		}
		if (previousTab.current !== tabActive) {
			previousTab.current = tabActive
			return
		}
		if (tabActive === tabName) {
			console.log(router)
			console.log('双击')
			switch (tabName) {
				case 'dialog':
					setDoubleClick(true)
					break
				case 'contacts':
					router.navigate('/add_friend/')
					break
				case 'my':
					break
			}

			// @ts-ignore
			$(`#view-${tabName}`)[0].f7View.router.back()
		}
		previousTab.current = tabName
	}

	// 全局状态（未读消息）
	const cacheStore = useCacheStore()

	const onLongPress = () => {
		console.log('长按')
		setLongClick(true)
	};

	const defaultOptions = {
		isPreventDefault: true,
		delay: 300,
	};
	const longPressEvent = useLongPress(onLongPress, defaultOptions);


	return (
		<Views tabs className="safe-area app">
			<View id="view-dialog" onTabShow={() => setTabActive('dialog')} tabActive tab url="/dialog/" main />
			<View id="view-contacts" onTabShow={() => setTabActive('contacts')} tab url="/contacts/" />
			<View id="view-my" onTabShow={() => setTabActive('my')} tab url="/my/" />

			<Toolbar tabbar icons bottom>
				<button {...longPressEvent}>
					<Link
						tabLink="#view-dialog"
						iconF7="chat_bubble_2"
						text="聊天"
						badge={cacheStore.unreadCount}
						badgeColor="red"
						tabLinkActive
						onClick={() => onTabLinkClick('dialog')}
					/>
				</button>

				<button>
					<Link
						tabLink="#view-contacts"
						iconF7="phone"
						text="联系人"
						badge={cacheStore.applyCount}
						badgeColor="red"
						onClick={() => onTabLinkClick('contacts')}
					/>
				</button>
				<Link tabLink="#view-my" iconF7="person" text="我的" onClick={() => onTabLinkClick('my')} />
			</Toolbar>
		</Views>
	)
}

export default Layout
