export interface ElectronAPI {
  executeCommand: (command: string, options?: any) => Promise<any>;
  minecraftCommand: (action: string, parameters?: any) => Promise<any>;
  fileOperation: (operation: string, path: string) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
