import pino from 'pino'
import pretty from 'pino-pretty'
import dayjs from 'dayjs'

const log = pino(
  pretty({
    colorize: true,
    ignore: 'pid',
    customPrettifiers: {
      time: () => `,"time":"${dayjs().format()}"`,
    },
  }),
)

export default log
