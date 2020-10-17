import * as moment from 'moment'

export function formatDuration(durationInSeconds: number, includeSeconds: boolean = true) {
    const duration = moment.duration(durationInSeconds, 'seconds')
    let formattedStr = `${duration.hours()}h ${duration.minutes()}m`
    if (includeSeconds) {formattedStr = `${formattedStr}  ${duration.seconds()}s`}
    return formattedStr
}
