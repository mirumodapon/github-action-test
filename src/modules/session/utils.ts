import type { PartsOfDate } from './types'

export const html = String.raw

/**
 * Return a time zone fixed Date object.
 *
 * @param {Date | string} date Source Date object
 * @param {number} timeZoneOffsetMinutes The time zone difference, in minutes, from current locale (host system settings) to UTC.
 * @returns {Date} Time zone fixed Date object
 */
export function fixedTimeZoneDate (date: Date | string, timeZoneOffsetMinutes: number): Date {
  date = new Date(date)
  date.setMinutes(date.getMinutes() - timeZoneOffsetMinutes + (date.getTimezoneOffset()))
  return date
}

/**
 * Extract the components of a Date object
 * @param date The Date object to extract detail from.
 * @returns An object containing components of the date(year, month, date, day, hour, minutes).
 */
export function getPartsOfDate (date: Date): PartsOfDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes()
  }
}

/**
 * Pads a number with a leading zero if it has less than 2 digits.
 * @param number The number to pad.
 * @returns The padded number as a string.
 */
export function padNumberStart2WithZero (number: number) {
  return number.toString().padStart(2, '0')
}

/**
 * Formats a Data object into a string containing the year, month, date, with optional padding.
 * @param dataObj The Date object to formate.
 * @param joinChar The character to join the year, month, and date. Default is an empty string.
 * @returns The formatted date string.
 */
export function formatDateString (dataObj: Date, joinChar = '') {
  const { year, month, date } = getPartsOfDate(dataObj)
  return [year, month, date]
    .map(padNumberStart2WithZero).join(joinChar)
}

/**
 * Format Data object into a string containing the hour, minute, with optional padding.
 * @param dateObj The Date object to formate.
 * @param joinChar The character to joint the hour and minute. Default is an empty string.
 * @returns The formated time string.
 */
export function formatTimeString (dateObj: Date, joinChar = '') {
  const { hour, minute } = getPartsOfDate(dateObj)
  return [hour, minute]
    .map(padNumberStart2WithZero).join(joinChar)
}
