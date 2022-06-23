export class DateHelper {
  static addDays = (numOfDays: number, date = new Date()) => {
    date.setDate(date.getDate() + numOfDays);
    return date;
  };

  static incrementDay = (date = new Date()) => {
    date.setDate(date.getDate() + 1);
    return date;
  };

  static incrementMonth = (date = new Date()) => {
    date.setMonth(date.getMonth() + 1);
    return date;
  };

  static addMonths = (numOfMonths: number, date = new Date()) => {
    date.setMonth(date.getMonth() + numOfMonths);
    return date;
  };
}
