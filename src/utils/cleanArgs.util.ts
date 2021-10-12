import { toUpperCase } from './toUpperCase.util';
export function cleanArgs(cmd: { options: any[]; [name: string]: any }) {
  const args: { [name: string]: string } = {};
  cmd.options.forEach((o) => {
    const key = toUpperCase(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}
