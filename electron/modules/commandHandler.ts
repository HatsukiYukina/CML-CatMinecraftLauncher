import { exec } from "child_process";
import { promisify } from "util";
import {ipcMain} from "electron";

const execAsync = promisify(exec);

//命令执行函数
async function handleGenericCommand(command: string, options: any = {}) {
  try {
    console.log(`run exec: ${command}`);

    const execOptions = {
      cwd: options.cwd || process.cwd(),
      maxBuffer: options.maxBuffer || 1024 * 1024, //1MB
      timeout: options.timeout || 30000, //30秒超时
      ...options,
    };

    const { stdout, stderr } = await execAsync(command, execOptions);

    return {
      success: true,
      stdout: stdout,
      stderr: stderr,
      exitCode: 0,
    };
  } catch (error: any) {
    console.error(`run exec fail: ${command}`, error);

    return {
      success: false,
      error: error.message,
      stdout: error.stdout || "",
      stderr: error.stderr || "",
      exitCode: error.code || 1,
    };
  }
}

//在Ipc处理器中
ipcMain.handle(
  "execute-command",
  async (_event, command: string, options: any) => {
    return handleGenericCommand(command, options);
  },
);
