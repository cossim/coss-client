import { $t } from '@/shared'
import { Block, Button, Link, List, ListInput, ListItem, NavRight, Navbar, Page, Popup } from 'framework7-react'
import { useState } from 'react'
import { toastMessage } from '@/shared'
import useRequestStore from '@/stores/request'

const SetRequestUrl = () => {
	const requestStore = useRequestStore()
	const [baseCustomUrl, setBaseCustomUrl] = useState<string>(requestStore.config.baseUrl)
	const [wsCustomUrl, setWsCustomUrl] = useState<string>(requestStore.config.wsUrl)
	const [opened, setOpened] = useState<boolean>(false)

	const handleSubmit = () => {
		if (!baseCustomUrl || !wsCustomUrl) return toastMessage('请输入自定义地址')
		requestStore.update({
			config: {
				id: Date.now().toString().slice(0, 13),
				baseUrl: baseCustomUrl,
				wsUrl: wsCustomUrl,
				remark: '自定义'
			}
		})
		toastMessage('设置成功')
		setOpened(false)
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		const history = requestStore.historyUrls.find((item) => item.id === value)
		if (history) {
			setBaseCustomUrl(history.baseUrl)
			setWsCustomUrl(history.wsUrl)
		}
	}

	return (
		<Popup className="demo-popup-swipe" swipeToClose opened={opened} onPopupOpen={() => setOpened(true)}>
			<Page>
				<Navbar title="环境切换">
					<NavRight>
						<Link popupClose>{$t('关闭')}</Link>
					</NavRight>
				</Navbar>
				<Block>
					<List>
						<ListInput
							label="http地址"
							outline
							className="el-input"
							type="text"
							placeholder="请输入自定义http地址"
							value={baseCustomUrl}
							onChange={(e) => setBaseCustomUrl(e.target.value)}
						/>
						<ListInput
							label="ws地址"
							outline
							className="el-input"
							type="text"
							placeholder="请输入自定义ws地址"
							value={wsCustomUrl}
							onChange={(e) => setWsCustomUrl(e.target.value)}
						/>
						<ListItem
							title="重制地址"
							smartSelect
							smartSelectParams={{
								openIn: 'sheet',
								sheetCloseLinkText: $t('重制'),
								closeOnSelect: true,
								formatValueText: () => ''
							}}
						>
							<select name="historyUrls" onChange={(e) => handleSelectChange(e)} value={-1}>
								<option key={-1} value={-1}>
									请选择
								</option>
								{requestStore.historyUrls.map((item) => (
									<option key={item.id} value={item.id}>
										{item.remark}
									</option>
								))}
							</select>
						</ListItem>
					</List>
					<Button className="mx-[16px]" fill round large onClick={handleSubmit}>
						设置服务器地址
					</Button>
				</Block>
			</Page>
		</Popup>
	)
}

export default SetRequestUrl