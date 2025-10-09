# NyaLauncher.Webui
## 技术来源？
使用typescript开发的模块化现代启动器，核心来自cmcl
## 特点？
现代化的前端效果，整个项目可选性高，模块化使用<br/>
支持浏览器访问，支持go-wail/electron桌面框架，您可根据需求自行选择项目形态~<br/>
客制化，便于修改<br/>
![示例图片](https://youke1.picui.cn/s1/2025/09/30/68db0ad359820.jpg "截图")
## 开始
如何开始？
> 如果您是使用者：
* 直接下载对应平台的可执行文件自行拼接或使用预整合包
> 如果您是开发者/需要自己构建：
0. 先准备git，node环境
1. 拉取存储库
```bash
git clone https://github.com/HatsukiYukina/NyaLauncher.Webui.git
```
2. 安装nodemodule
```bash
cd NyaLauncher.Webui/
```
```bash
npm install
```
3. 运行dev测试
```bash
npm run dev
```
4. 打包<br/>
如果您需要静态文件
```bash
npm run build
```
静态文件将会生成在dist/目录下
## 特别感谢
[Console-Minecraft-Launcher](https://github.com/MrShieh-X/console-minecraft-launcher/ "CMCL"): 启动器逻辑后端<br/>
[HeroUI](https://github.com/heroui-inc/heroui "HeroUI"): 超绝现代化reactui库<br/>
[NapCatQQ](https://github.com/NapNeko/NapCatQQ "猫猫框架"): 提供了灵感和部分代码参考<br/>
