export interface LoginParams {
    /**
     * 当前登录设备的唯一标识符
     */
    driver_id: string
    /**
     * 当前设备的设备token 用于推送手机端的系统通知
     */
    driver_token: string
    /**
     * 用户的电子邮件地址
     */
    email: string
    /**
     * 用户密码
     */
    password: string
    /**
     * 用户登录的平台(ios、android、web、huawei...)
     */
    platform: string
}

export interface RegisterParams {
    /**
     * 确认密码
     */
    confirm_password: string
    /**
     * 用户邮箱
     */
    email: string
    /**
     * 用户昵称
     */
    nickname?: string
    /**
     * 用户密码
     */
    password: string
    /**
     * 用户PGP公钥（张振威说这个是PGP公钥）
     */
    public_key?: string
}

export interface PublicKeyParams {
    /**
     * 消息加密公钥
     */
    public_key: string
}

export interface SearchUserParams {
    /**
     * 用户邮箱
     */
    email: string
}

export interface UserInfoQueryParams {
    /**
     * 用户ID
     */
    id: string
}

export interface UserInfUpdateParams {
    /**
     * 用户头像
     */
    avatar?: string
    /**
     * 用户cossID
     */
    coss_id?: string
    /**
     * 用户昵称
     */
    nickname?: string
    /**
     * 个性签名
     */
    signature?: string
    /**
     * 手机号
     */
    tel?: string
}

export interface PassWordUpdateParams {
    /**
     * 确认密码
     */
    confirm_password: string
    /**
     * 旧密码
     */
    old_password: string
    /**
     * 新密码
     */
    password: string
}

export interface LogoutParams {
    /**
     * 设备ID
     */
    driver_id: string
}

export interface UserPublicKeyQueryParams {
    /**
     * 用户ID
     */
    user_id: string
}

export interface AddFriendParams {
    /**
     * 用户端加密公钥
     */
    e2e_public_key?: string
    /**
     * 发送好友申请备注
     */
    remark?: string
    /**
     * 要添加的好友的ID
     */
    user_id: string
}

export interface QueryParams {
    /**
     * 页码
     */
    page_num?: number
    /**
     * 页大小
     */
    page_size?: number
}

export interface ManageFriendRequestParams {
    /**
     * 操作类型 0=拒绝好友请求 1=接受好友请求
     */
    action: number
    /**
     * 公钥
     */
    e2e_public_key?: string
}

export interface TopDialogParams {
    /**
     * 是否置顶
     */
    top: boolean
}

export interface ShowDialogParams {
    /**
     * 是否显示
     */
    show: boolean
}
