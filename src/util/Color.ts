import chalk from 'chalk';

type logtypes = 'error' | 'info' | 'variable'

const colorCodes = {
    error: '#f5426c',
    info: '#ff8e4d',
    variable: '#ff624d'
}

export const color = (color: logtypes, message: any) => {
    return chalk.hex(colorCodes[color])(message);
}