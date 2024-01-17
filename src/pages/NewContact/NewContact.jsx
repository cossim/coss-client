import React, { useEffect, useState } from 'react'
import { f7, Page, Navbar, List, ListItem, SwipeoutActions, SwipeoutButton, Button } from 'framework7-react'
// import PropTypes from 'prop-types'
import { friendApplyListApi, confirmAddFriendApi } from '@/api/relation'
import { groupRequestListApi } from '@/api/group'
import { useUserStore } from '@/stores/user'

import { $t } from '@/i18n'
// import WebDB from '@/db'

// NewContact.propTypes = {
// 	f7route: PropTypes.object
// }

export default function NewContact() {
	const { directory } = useUserStore()

	const [users, setUsers] = useState([])
	useEffect(() => {
		;(async () => {
			groupRequestListApi()
				.then(({ code, data }) => {
					if (code !== 200) {
						return
					}
					// TODO: 展示群请求列表
					console.log(data)
				})
				.catch((err) => {
					console.log(err)
				})
			const res = await friendApplyListApi()
			if (res.code !== 200) return
			let newUsers = res.data
			console.log(newUsers)
			if (!res.data) {
				newUsers = []
			} else {
				newUsers = newUsers?.map((user) => {
					return {
						...user,
						// 0 初始状态 1 已同意 2 已拒绝
						status: 0
					}
				})
			}
			setUsers(newUsers)
		})()
	}, [])

	const text = {
		tips: $t('对方没有留言'),
		btn_agree: $t('同意'),
		btn_refuse: $t('拒绝'),
		agree: $t('已同意'),
		refuse: $t('已拒绝')
	}

	// 同意或拒绝添加好友
	const confirm = async (id, status) => {
		const res = await confirmAddFriendApi({ user_id: id, e2e_public_key: directory, status })
		if (res.code !== 200) return

		const newUsers = users.map((user) => {
			if (user.user_id === id) {
				return {
					...user,
					// 0 初始状态 1 已同意 2 已拒绝
					status: status === 0 ? 2 : 1
				}
			}
			return user
		})

		// todo: 添加好友到本地
		// WebDB.contacts.add({  })

		setUsers(newUsers)
	}

	return (
		<Page noToolbar className="new-contact">
			<Navbar title={$t('新请求')} backLink="Back" backLinkShowText="" />
			<List noChevron dividers mediaList className="my-0">
				{users.map((chat) => (
					<ListItem
						key={chat.user_id}
						title={chat.nickname}
						swipeout
						// link
					>
						<img
							slot="media"
							src={chat.avatar}
							loading="lazy"
							alt={chat.nickname}
							className="w-10 h-10 rounded-full"
						/>
						<span slot="text" className="text-gray-500 text-sm">
							{chat?.msg || text.tips}
						</span>

						{chat.status === 1 ? (
							<span className="text-gray-500 text-sm whitespace-nowrap pr-2" slot="content">
								{text.agree}
							</span>
						) : chat.status === 2 ? (
							<span className="text-gray-500 text-sm whitespace-nowrap pr-2" slot="content">
								{text.refuse}
							</span>
						) : (
							<div slot="content" className="pr-2 flex">
								<Button className="text-sm text-red-500" onClick={() => confirm(chat?.user_id, 0)}>
									{text.btn_refuse}
								</Button>
								<Button className="text-sm text-primary" onClick={() => confirm(chat?.user_id, 1)}>
									{text.btn_agree}
								</Button>
							</div>
						)}

						<SwipeoutActions right>
							{/* onClick={del} */}
							<SwipeoutButton close color="red">
								{/* <Icon f7="ellipsis" /> */}
								<span>删除</span>
							</SwipeoutButton>
						</SwipeoutActions>
					</ListItem>
				))}
			</List>
		</Page>
	)
}
