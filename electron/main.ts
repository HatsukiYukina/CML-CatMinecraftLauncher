import { fileURLToPath } from "url";
import { dirname, join } from "path";

//import { CommandHandler } from "./modules/commandHandler";

import { app, BrowserWindow } from "electron";
import express from "express";
import compression from "compression";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow: BrowserWindow | null = null;
let expressServer: any = null;

//上面是项目的变量区，下面是主要代码
//这里是项目的后端唯一入口，electron就是一个前后端整合在本地的怪胎网页应用
const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 800, //启动窗口，尺寸调整
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"), //在非dev时加载preload.js,dev时应该会自动加载
    },
    autoHideMenuBar: true, //自动隐藏顶端工具栏，按alt再次打开
  });

  startExpressServer(); //因为loadFile方法有严重的加载问题，使用expressServer来内置网页服务器

  // 加载本地服务器
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173"); //dev模式时，选择node自动开放的dev端口，electron用作浏览器
    mainWindow.webContents.openDevTools(); //并在启动的时候打开f12开发者工具
  } else {
    mainWindow.loadURL("http://localhost:65432"); //发布模式下，选择expressServer开放的端口
  }
};

//下方都是函数
//说实话js比c语言豪赤多了，真的豪赤，反正用户会自己升级大内存
function startExpressServer(): void {
  const serverApp = express();

  //启用gzip压缩
  serverApp.use(compression());

  //提供静态文件服务，是从app.asar内读取
  //不用nginx等方案是因为，nginx等外部方案不支持直接读取asar，并且nginx需要分发不同平台的nativeApp，那实在是太牢了
  if (process.env.NODE_ENV === "development") {
    serverApp.use(express.static(join(process.cwd(), "dist/")));
  } else {
    serverApp.use(express.static(join(__dirname, "../dist/")));
  }

  //处理Spa路由
  serverApp.get(
    "/{*file}",
    (_req: any, res: { sendFile: (arg0: string) => void }) => {
      if (process.env.NODE_ENV === "development") {
        res.sendFile(join(process.cwd(), "dist", "index.html"));
      } else {
        res.sendFile(join(__dirname, "../dist", "index.html"));
      }
    },
  );

  //启动服务器，定义端口
  const port = 65432;

  expressServer = serverApp.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
  });

  expressServer.on("error", (error: Error) => {
    console.error("Express server error:", error);
  });
}

function stopExpressServer(): void {
  if (expressServer) {
    expressServer.close(() => {
      console.log("Express server stopped");
    });
    expressServer = null;
  }
}

//一切准备就绪，就尝试创建窗口
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("before-quit", () => {
  stopExpressServer();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    stopExpressServer();
    app.quit();
  }
});
