import { Device } from '@capacitor/device'
import { generateKeyPair } from './tweetnacl'
// import CommonStore from '@/db/common'
import useCacheStore from '@/stores/cache'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

/**
 * 创建一个身份。
 *
 * @param {string} user_id 用户 id
 * @param {string} account 账号
 * @param {boolean} is_update 是否更新,首次注册时不需要
 *
 */
export const cretaeIdentity = async (user_id: string, account: string, is_update = false) => {
	const { identifier: device_id } = await Device.getId()
	const device_info = await Device.getInfo()

	const cacheStore = useCacheStore.getState()

	let keyPair = null
	if (!is_update) keyPair = generateKeyPair()

	const result = {
		user_id,
		account,
		keyPair,
		device_id,
		device_info
	}

	!is_update && cacheStore.update({ cacheKeyPair: keyPair })

	// !is_update && (await CommonStore.add(CommonStore.tables.users, result))

	return result
}

export const getFingerPrintID = async () => {
	const fpPromise = await FingerprintJS.load()
	const result = await fpPromise.get()
	return result.visitorId
}
