import type { Router } from 'framework7/types'

import DialogList from '@/pages/Tabs/DialogList/DialogList'
import ContactList from '@/pages/Tabs/ContactList/ContactList'
import MyInfo from '@/pages/Tabs/MyInfo/MyInfo'

import AuthScreen from '@/pages/Auth/AuthScreen'
import Message from '@/pages/Message/Message'

import NotFound from '@/pages/NotFound'

const routes: Router.RouteParameters[] = [
	// {
	// 	path: '/',
	// 	redirect: '/chats/',
	// 	beforeEnter: (ctx: Router.RouteCallbackCtx) => {
	// 		console.log('beforeEnter', ctx)
	// 	}
	// },
	{
		path: '/dialog/',
		component: DialogList,
		keepAlive: true
		// options: {
		// 	animate: false,
		// 	transition: 'f7-push'
		// }
	},
	{
		path: '/contacts/',
		component: ContactList,
		keepAlive: true
	},
	{
		path: '/my/',
		component: MyInfo,
		keepAlive: true
	},
	{
		path: '/auth/',
		component: AuthScreen
	},
	{
		path: '/login/',
		asyncComponent: () => import('@/pages/Auth/LoginScreen')
	},
	{
		path: '/register/',
		asyncComponent: () => import('@/pages/Auth/RegisterScreen')
	},
	{
		path: '/message/:id/:dialog_id/',
		// asyncComponent: () => import('@/pages/Message/Message'),
		component: Message,
		options: {
			// animate: false,
			transition: 'f7-push'
		}
		// keepAlive: true
	},
	{
		path: '/user_info/:user_id/',
		asyncComponent: () => import('@/pages/Tabs/MyInfo/UserInfo/UserInfo')
	},
	{
		path: '/update_user_info/:type/',
		asyncComponent: () => import('@/pages/Tabs/MyInfo/UserInfo/UpdateUserInfo')
	},
	{
		path: '/add_friend/',
		asyncComponent: () => import('@/pages/AddFriend/AddFriend')
	},
	{
		path: '/profile/:user_id/',
		asyncComponent: () => import('@/pages/Profile/Profile')
	},
	{
		path: '/personal_detail/:user_id/',
		asyncComponent: () => import('@/pages/PersonalDetail/PersonalDetail')
	},
	{
		path: '/apply_list/',
		asyncComponent: () => import('@/pages/ApplyList/ApplyList')
	},
	{
		path: '/add_group/',
		asyncComponent: () => import('@/pages/AddGroup/AddGroup')
	},
	{
		path: '/group_info/:group_id/',
		asyncComponent: () => import('@/pages/GroupInfo/GroupInfo')
	},
	{
		path: '/group_info/:group_id/member/:list_type',
		asyncComponent: () => import('@/pages/GroupInfo/MemberList')
	},
	{
		path: '/groups/',
		asyncComponent: () => import('@/pages/GroupList/GroupList')
	},
	{
		path: '/group_notice/:group_id/',
		asyncComponent: () => import('@/pages/GroupNotice/GroupNotice')
	},
	{
		path: '/create_group_notice/:group_id/',
		asyncComponent: () => import('@/pages/CreateGroupNotice/CreateGroupNotice')
	},
	{
		path: '/my_qrcode/',
		asyncComponent: () => import('@/pages/MyQrcode/MyQrcode.tsx')
	},
	{
		path: '/scanner/',
		asyncComponent: () => import('@/pages/Scanner/Scanner')
	},
	{
		path: '/test',
		asyncComponent: () => import('@/pages/test/test')
	},
	{
		path: '(.*)',
		component: NotFound
	}
]

export default routes
