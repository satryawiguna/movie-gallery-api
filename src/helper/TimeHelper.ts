import { parseISO } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export const convertTimezone = (
     inputTime: string | Date,
     currentTimezone = 'UTC',
     convertTimezone = '',
     formatPattern = 'yyyy-MM-dd HH:mm:ss'
) => {
     try {
          if (convertTimezone === '') {
               convertTimezone = currentTimezone;
          }
          let currentTimeInGivenTimezone;

          if (currentTimezone === 'UTC') {
               currentTimeInGivenTimezone = utcToZonedTime(inputTime, convertTimezone);
          } else {
               const currentTimezoneToUtc = zonedTimeToUtc(inputTime, currentTimezone);
               if (convertTimezone === 'UTC') {
                    currentTimeInGivenTimezone = currentTimezoneToUtc;
               } else {
                    currentTimeInGivenTimezone = utcToZonedTime(
                         currentTimezoneToUtc,
                         convertTimezone
                    );
               }
          }
          return format(currentTimeInGivenTimezone, formatPattern, { timeZone: convertTimezone });
     } catch (e) {
          return format(new Date(), formatPattern);
     }
};

export const formatTime = (
     time: string | Date | undefined = new Date(),
     formatPattern = 'yyyy-MM-dd HH:mm:ss'
) => {
     let newDate = new Date();
     if (typeof time !== undefined) {
          // eslint-disable-next-line no-param-reassign
          newDate = new Date(time);
     }
     if (typeof time !== 'string') {
          return format(newDate, formatPattern);
     }
     return format(new Date(newDate), formatPattern);
};

export const parseTime = (time: string | Date) => {
     if (typeof time !== 'string') {
          return time;
     }
     return parseISO(time);
};
