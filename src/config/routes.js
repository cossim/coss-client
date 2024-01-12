import Chats from '@/pages/Chats/Chats'
import Contacts from '@/pages/Contacts/Contacts'
import My from '@/pages/My/My'
import Messages from '@/pages/Messages/Messages'
import Profile from '@/pages/Profile/Profile'
import NotFoundPage from '@/pages/NotFound'
import AddFriend from '@/pages/AddFriend/AddFriend'
import AddDetails from '@/pages/AddDetails/AddDetails'

import Auth from '@/pages/Auth/Auth'

import ChatTest from '@/pages/ChatTest'
import MessageTest from '@/pages/MessageTest'

var routes = [
	{
		path: '/chats/',
		component: Chats
	},
	{
		path: '/contacts/',
		component: Contacts
	},
	{
		path: '/my/',
		component: My
	},
	{
		path: '/auth/',
		component: Auth
	},
	{
		path: '/add_friend/',
		component:AddFriend
	},
	{
		path: '/chat_test/',
		component: ChatTest
	},
	{
		path: '/chats_test/:id/',
		component: MessageTest
	},
	{
		path: '/add_details/:id/',
		component:AddDetails
	},
	{
		path: '/chats/:id/',
		component: Messages
	},
	{
		path: '/profile/:id/',
		component: Profile
	},
	{
		path: '(.*)',
		component: NotFoundPage
	}
]

export default routes
