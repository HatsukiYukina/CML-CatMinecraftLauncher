# CML-CatMinecraftLauncher
## 技术来源？
来自CMCL的启动器，使用node+electron+nextui开发
## 特点？
现代化的gui，跨平台，先进的框架能效<br/>
客制化，便于修改
## 开始
如何开始？
> 如果您是使用者：
* 直接下载对应平台的可执行文件
> 如果您是开发者/需要自己构建：
0. 先准备git，node环境
1. 拉取存储库
```bash
git clone https://github.com/HatsukiYukina/CML-CatMinecraftLauncher.git
```
2. 安装nodemodule
```bash
cd CML-CatMinecraftLauncher/
```
```bash
npm install
```
3. 运行dev测试
```bash
npm run dev:electron
```
此时应会弹出窗口<br/><br/>
4. 打包<br/>
如果您需要installer：
```bash
npm run buildpackage:electron
```
如果您需要直接运行的可执行文件：
```bash
npm run build:electron
```
installer将会生成在dist-electron/目录下，可执行文件会生成在dist-electron/*platform*-unpack/目录下
## 特别感谢
[Console-Minecraft-Launcher](https://github.com/MrShieh-X/console-minecraft-launcher/ "CMCL"): 启动器逻辑后端<br/>
[HeroUI](https://github.com/heroui-inc/heroui "HeroUI"): 超绝现代化reactui库<br/>
[NapCatQQ](https://github.com/NapNeko/NapCatQQ "猫猫框架"): 提供了灵感和部分代码参考<br/>
