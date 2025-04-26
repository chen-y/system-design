import { Avatar, Popover } from 'antd'

const AppHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <h1 className="text-white text-2xl">System Design</h1>
      </div>
      <div>
        <div>
          <Popover
            arrow={false}
            align={{ offset: [0, -15] }}
            content={
              <div>
                <div>个人中心</div>
                <div>退出登录</div>
              </div>
            }
          >
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
