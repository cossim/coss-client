import { Link, Navbar, NavRight, Subnavbar } from 'framework7-react'
import useMessageStore from '@/stores/message'
import { $t, getLatestGroupAnnouncement, tooltipType } from '@/shared'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BellFill, ChevronRight, Ellipsis } from 'framework7-icons/react'
import useUserStore from '@/stores/user'
import GroupService from '@/api/group'
import useCacheStore from '@/stores/cache'
import './styles/Message.scss'

const MessageHeader = () => {
	const messageStore = useMessageStore()
	const userStore = useUserStore()
	const cacheStore = useCacheStore()

	// 是否是系统通知
	const is_system = useMemo(() => messageStore.receiverId === '10001', [messageStore.receiverId])
	// 群公告
	const [groupAnnouncement, setGroupAnnouncement] = useState<any>(null)
	// 群成员
	const [members, setMembers] = useState<any[]>([])

	const getGroupAnnouncement = () => {
		const params = { group_id: Number(messageStore.receiverId) }
		GroupService.groupAnnouncementApi(params).then((res) => {
			setGroupAnnouncement(getLatestGroupAnnouncement(res.data?.list ?? []))
		})
	}

	const isReadGroupAnnouncement = useCallback(
		(users: any[]) => users?.some((v) => v?.user_id === userStore.userId),
		[]
	)

	const isShowGroupAnnouncement = useMemo(
		() => messageStore.isGroup && groupAnnouncement && !isReadGroupAnnouncement(groupAnnouncement?.read_user_list),
		[groupAnnouncement]
	)

	// 获取群聊人员
	useEffect(() => {
		if (messageStore.isGroup) {
			getGroupAnnouncement()
			GroupService.groupMemberApi({ group_id: Number(messageStore.receiverId) }).then((res) => {
				setMembers(res.data.list)
				messageStore.update({ members: res.data.list })
			})
		}
	}, [])

	useEffect(() => {
		if (messageStore.isGroup) messageStore.update({ isGroupAnnouncement: isShowGroupAnnouncement })
	}, [isShowGroupAnnouncement])

	// 在线状态
	const onlineStatus = useMemo(() => {
		if (messageStore.isGroup) return ''
		if (is_system) return ''
		const user = cacheStore.onlineStatus?.find((v: { user_id: any }) => v.user_id === messageStore.receiverId)
		// console.log('onlineStatus', user, cacheStore.onlineStatus, messageStore.receiverId)
		return user?.status === 1 ? '在线' : '离线'
	}, [cacheStore, cacheStore.onlineStatus, messageStore.isGroup, messageStore.receiverId])

	return (
		<div className="min-h-12 bg-bgPrimary sticky top-0 z-50">
			<Navbar
				title={messageStore?.receiverInfo?.dialog_name ?? messageStore?.receiverInfo?.name}
				subtitle={onlineStatus}
				backLink
				outline={false}
				className="coss_message_navbar"
			>
				{!messageStore.isLabel && (
					<NavRight>
						{messageStore.manualTipType === tooltipType.SELECT ? (
							<Link onClick={() => messageStore.update({ manualTipType: tooltipType.NONE })}>
								{$t('取消')}
							</Link>
						) : (
							!is_system && (
								<Link
									href={
										messageStore.isGroup
											? `/group_info/${messageStore.receiverId}/`
											: `/profile/${messageStore.receiverId}/?from_page=message&dialog_id=${messageStore.dialogId}`
									}
								>
									<Ellipsis className="w-6 h-6 mr-2" />
								</Link>
							)
						)}
					</NavRight>
				)}

				{/* 群公告 */}
				{messageStore.isGroupAnnouncement && (
					<Subnavbar className="coss_message_subnavbar animate__animated  animate__faster">
						<Link
							className="w-full h-full flex justify-center items-center rounded bg-bgPrimary"
							href={`/create_group_notice/${messageStore.receiverId}/?id=${groupAnnouncement?.id}&admin=${members?.find((v) => v?.identity === userStore.userId)?.identity === 2}}`}
							onClick={() => messageStore.update({ isGroupAnnouncement: false })}
						>
							<div className="w-full py-3 px-4 relative flex items-center">
								<BellFill className="mr-3 text-orange-400 text-sm" />
								<p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[86%] text-textSecondary">
									<span className="font-bold">{groupAnnouncement?.title}：</span>
									{groupAnnouncement?.content}
								</p>
								<div className="absolute right-3">
									<ChevronRight className="text-textTertiary text-sm" />
								</div>
							</div>
						</Link>
					</Subnavbar>
				)}
			</Navbar>
		</div>
	)
}

export default MessageHeader
