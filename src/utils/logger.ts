import pino from 'pino'
import pretty, { PrettyOptions } from 'pino-pretty'
import dayjs from 'dayjs'

// const log = pino({
//   transport: {
//     target: 'pino-pretty',
//     options: {
//       colorize: true,
//     },
//   },
//   base: {
//     pid: false,
//   },
//   timestamp: () => `,"time":"${dayjs().format()}"`,
// })

const log = pino(pretty())

export default log
