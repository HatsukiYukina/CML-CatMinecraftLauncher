import { contextBridge, ipcRenderer } from "electron";

//暴露api给前端
contextBridge.exposeInMainWorld("electronAPI", {
  //执行通用命令
  executeCommand: (command: string, options?: any) =>
    ipcRenderer.invoke("execute-command", command, options),

  runExec: (command: string, options = {}) =>
    ipcRenderer.invoke("execute-command", command, options),
});
