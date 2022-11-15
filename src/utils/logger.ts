import pino from 'pino'
import pretty from 'pino-pretty'
import dayjs from 'dayjs'

const log = pino(
  pretty({
    colorize: true,
    ignore: 'pid,hostname',
    customPrettifiers: {
      time: () => `[${dayjs().format()}]`,
    },
  }),
)

export default log
