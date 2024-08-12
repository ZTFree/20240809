# Rotate PDF Pages
> 核心：Nextjs、react-pdf、@react-pdf/renderer、react-redux
## 安装与运行
- 克隆代码至本地
````
git clone https://github.com/ZTFree/20240809.git
````
- 安装项目依赖
````
pnpm i
````
- 运行
````
pnpm dev
````

## 项目开发流程
### 1.项目初始化
1. 使用create-next-app搭建nextjs脚手架，并清理目录与文件。
2. 安装react-redux，创建状态管理store并进行提供。
3. 创建`PagesRotater`组件，参考demo网站搭建页面静态结构。
4. `PagesRotater`组件进行组件拆分。

### 2.功能模块开发
#### TitleBox
> 负责内容标题展示功能
- 简单进行布局与样式配置。
#### UploadBox
> 负责pdf文件上传功能
- 使用事件绑定实现点击添加与拖拽添加。
#### RotateBox
> 负责pdf文件编辑（旋转）与下载功能
##### ButtonGroup
- 对按钮进行了以下功能的绑定。
  - 旋转全部pdf页。
  - 移除pdf文件。
  - pdf展示放大与缩小。
##### PageItem
- 负责展示pdf单页内容与页脚，同时可以旋转pdf单页。
##### DownLoadButton
- 用户点击下载按钮，通过动态构建@react-pdf/renderer的Document树，构筑完成后触发PDFDownloadLink的下载功能，实现对编辑后pdf文件的下载。

### 3.性能与体验优化
#### 1. pdf页旋转与缩放优化
react-pdf的Page组件自带的rotate与scale可以实现pdf旋转与缩放功能，当会导致Page组件的重新生成，十分消耗性能，页面多时会造成卡顿。
##### 解决方案
使用css的宽高设置实现pdf缩放功能，使用transform rotate实现缩放功能，并且将缩放与旋转参数列表存储再redux中。

#### 2.pdf展示优化
在选择完pdf文件后，react-pdf的Document与Page需要一定时间渲染canvas元素，渲染完成前会呈现空白内容，影响用户观感。
##### 解决方案
通过Page组件的onRenderSuccess钩子收集pdf页渲染完成进度，在渲染完成前，对整体内容设置css样式visibility:hidden并展示antd Spin组件等待渲染完成，渲染完成后再移除隐藏，此时所有canvas已经渲染完毕了。