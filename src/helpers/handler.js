import commonService from '@/db/common'
import userService from '@/db'
import { updatePublicKeyApi, getPublicKeyApi } from '@/api/user'
import { exportKey, importKey, performKeyExchange } from '@/utils/tweetnacl'

/**
 * 初始化用户,用户首次登录时会自动创建
 * TODO: 如果是新设备登录需要做一些额外操作，例如：同步数据，传递私钥
 * @param {*} user
 * @returns
 */
export const useInitUser = async (user) => {
	try {
		const id = user?.user_id

		// 如果已经有了用户信息，就不需要添加
		const result = await commonService.findOneById(commonService.TABLES.HISTORY, id)

		// 首次注册后登录需要上传公钥到服务端
		if (result && result.data?.isFirst) {
			// 上传公钥
			const secret_bundle = JSON.stringify({
				publicKey: exportKey(result?.data.keyPair?.publicKey)
			})
			const res = await updatePublicKeyApi({ secret_bundle })

			if (res.code !== 200) return console.error('上传公钥失败', res)

			// 更新用户信息
			await commonService.update(commonService.TABLES.HISTORY, id, {
				data: {
					...result.data,
					isFirst: false
				}
			})
		}
	} catch (error) {
		console.error('初始化用户消息失败:', error)
	}
}
/**
 * 收到好友申请是处理
 * @param {*} options
 * @returns
 */
export async function useInitFriend(options) {
	try {
		let result = { publicKey: null, shareKey: null, user_id: options.friend_id }

		const { data, friend_id, user_id } = options

		// 如果没有公钥就获取公钥
		if (!data) {
			const res = await getPublicKeyApi({ user_id: friend_id })
			if (res.code !== 200) throw new Error(res.msg)
			result.publicKey = importKey(JSON.parse(res.data?.secret_bundle || '{}'))
		} else {
			result.publicKey = importKey(data?.publicKey)
		}

		// 获取自己的信息
		const userInfo = await commonService.findOneById(commonService.TABLES.HISTORY, user_id)
		// 生成共享密钥
		result.shareKey = performKeyExchange(userInfo?.data?.keyPair?.privateKey, result?.publicKey)

		// 添加好友
		const friend = await userService.findOne(userService.TABLES.FRIENDS_LIST, 'user_id', friend_id)
		friend
			? await userService.update(userService.TABLES.FRIENDS_LIST, friend.id, { ...friend, ...result })
			: await userService.add(userService.TABLES.FRIENDS_LIST, result)
	} catch (error) {
		console.error('收到好友申请处理时错误：', error)
	}
}
