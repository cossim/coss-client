import { create } from 'zustand'
import { CacheStore, CacheStoreOptions } from './type'
import cacheStore from '@/utils/cache'
import {
	CACHE_APPLY_COUNT,
	CACHE_CONTACTS,
	CACHE_DIALOGS,
	CACHE_FRIEND_ONLINE_STATUS,
	CACHE_GROUP,
	CACHE_KEYBOARD_HEIGHT,
	CACHE_KEY_PAIR,
	CACHE_SEARCH_MESSAGE,
	CACHE_SHARE_KEYS,
	CACHE_SYNC_REMOTE,
	CACHE_TOTAL_MESSAGE,
	CACHE_UNREAD_COUNT,
	arrayToGroups,
	// findMessageId,
	groupsToArray
} from '@/shared'

const defaultOptions: CacheStoreOptions = {
	firstOpened: true,
	cacheDialogs: [],
	cacheContacts: [],
	cacheContactsObj: {},
	cacheGroup: [],
	cacheShareKeys: [],
	cacheSearchMessage: [],
	unreadCount: 0,
	applyCount: 0,
	keyboardHeight: 317,
	friendApply: [],
	groupApply: [],
	keyboardShow: false,
	cacheKeyPair: null,
	lastLoginTime: 1,
	totalMessages: [],
	isSyncRemote: false,
	onlineStatus: []
}

const useCacheStore = create<CacheStore>((set, get) => ({
	...defaultOptions,

	init: async () => {
		const cacheDialogs = (await cacheStore.get(CACHE_DIALOGS)) ?? []
		const cacheContacts = (await cacheStore.get(CACHE_CONTACTS)) ?? []
		const cacheShareKeys = (await cacheStore.get(CACHE_SHARE_KEYS)) ?? []
		const cacheSearchMessage = (await cacheStore.get(CACHE_SEARCH_MESSAGE)) ?? []
		const cacheGroup = (await cacheStore.get(CACHE_GROUP)) ?? []
		const unreadCount = (await cacheStore.get(CACHE_UNREAD_COUNT)) ?? 0
		const applyCount = (await cacheStore.get(CACHE_APPLY_COUNT)) ?? 0
		const keyboardHeight = (await cacheStore.get(CACHE_KEYBOARD_HEIGHT)) ?? 300
		const cacheKeyPair = (await cacheStore.get(CACHE_KEY_PAIR)) ?? null
		const totalMessages = (await cacheStore.get(CACHE_TOTAL_MESSAGE)) ?? []
		const isSyncRemote = (await cacheStore.get(CACHE_SYNC_REMOTE)) ?? false
		const onlineStatus = (await cacheStore.get(CACHE_FRIEND_ONLINE_STATUS)) ?? []

		// console.log('cacheKeyPair', cacheKeyPair)

		set({
			cacheDialogs,
			cacheContacts: groupsToArray(cacheContacts),
			cacheShareKeys,
			cacheGroup,
			unreadCount,
			applyCount,
			keyboardHeight,
			cacheSearchMessage,
			cacheContactsObj: cacheContacts,
			cacheKeyPair,
			totalMessages,
			isSyncRemote,
			onlineStatus
		})
	},
	updateFirstOpened: (firstOpened) => set({ firstOpened }),
	updateCacheDialogs: async (cacheDialogs) => {
		await cacheStore.set(CACHE_DIALOGS, cacheDialogs)
		set({ cacheDialogs })
	},
	updateCacheUnreadCount: async (unreadCount) => {
		await cacheStore.set(CACHE_UNREAD_COUNT, unreadCount)
		set({ unreadCount })
	},
	updateCacheApplyCount: async (applyCount) => {
		await cacheStore.set(CACHE_APPLY_COUNT, applyCount)
		set({ applyCount })
	},
	updateKeyboardHeight: async (keyboardHeight) => {
		await cacheStore.set(CACHE_KEYBOARD_HEIGHT, keyboardHeight)
		set({ keyboardHeight })
	},
	updateCacheSearchMessage: async (tableName) => {
		const { cacheSearchMessage } = get()
		if (cacheSearchMessage.includes(tableName)) return
		set({ cacheSearchMessage })
		await cacheStore.set(CACHE_SEARCH_MESSAGE, cacheSearchMessage)
	},
	updateBehindMessage: async (behindMessages) => {
		behindMessages?.map(async (item) => {
			const tableName = `${item.dialog_id}`
			const messages = (await cacheStore.get(tableName)) ?? []
			cacheStore.set(tableName, [...messages, ...item.msg_list.reverse()])
		})
	},
	addCacheMessage: async (message) => {
		const tableName = `${message.dialog_id}`
		const messages = (await cacheStore.get(tableName)) ?? []
		await cacheStore.set(tableName, [...messages, message])
	},
	updateCacheMessage: async (message) => {
		const tableName = `${message.dialog_id}`
		const allMessages = (await cacheStore.get(tableName)) ?? []
		const messages = allMessages.map((item: any) =>
			item?.msg_id === message?.msg_id || item?.uid === message?.uid ? { ...item, ...message } : item
		)
		await cacheStore.set(tableName, messages)

		// 更新本地消息总数
		const { set, totalMessages } = get()
		set(
			CACHE_TOTAL_MESSAGE,
			totalMessages.map((item) =>
				item?.dialog_id === message?.dialog_id ? { ...item, total: item.total + 1 } : item
			),
			true
		)
	},
	updateCacheContacts: async (cacheContacts) => {
		await cacheStore.set(CACHE_CONTACTS, cacheContacts)
		set({ cacheContacts: groupsToArray(cacheContacts), cacheContactsObj: cacheContacts })
	},
	updateCacheContactsObj: async (cacheContacts) => {
		const cacheContactsObj = arrayToGroups(cacheContacts)
		await cacheStore.set(CACHE_CONTACTS, cacheContactsObj)
		set({ cacheContacts, cacheContactsObj })
	},
	update: async (options, isUpdateDB = false) => {
		set((state: CacheStoreOptions) => ({ ...state, ...options }))

		// 更新本地数据库
		if (isUpdateDB) {
			const { set } = get()
			Object.entries(options).map(([key, value]) => set(key, value))
		}
	},
	get: async (key) => (await cacheStore.get(key)) ?? [],
	getDialogMessages: async (dialogId: number, ...ids: number[]) => {
		const tableName = `${dialogId}`
		const allMessages = (await cacheStore.get(tableName)) ?? []
		if (ids.length === 0) {
			return allMessages
		}
		return allMessages.filter((item: any) => ids.includes(item?.msg_id))
	},
	set: async (key: string, value: any, isUpdate = false) => {
		await cacheStore.set(key, value)
		isUpdate && set({ [key]: value })
	}
}))

export default useCacheStore
