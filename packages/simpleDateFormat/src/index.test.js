// src
import SimpleDateFormat from './index';
/* eslint-disable */
describe('SimpleDateFormat', function() {
    describe('test first parameter[date]', function() {
        test('date is a Date', function() {
            const date = new Date(2019, 10, 11);
            const formatted = SimpleDateFormat.format(date, 'yyyy-MM-dd');
            expect(formatted).toBe('2019-11-11');
        });

        test('date is a number', function() {
            const date = new Date(2019, 10, 11);
            const time = date.getTime();
            const formatted = SimpleDateFormat.format(time, 'yyyy-MM-dd');
            expect(formatted).toBe('2019-11-11');
        });

        test('date is string', function() {
            expect(() => {
                SimpleDateFormat.format('2019-11-11');
            }).toThrow('Invalid date');
        });

        test('date is undefined', function() {
            expect(SimpleDateFormat.format).toThrow('Invalid date');
        })
    });

    describe('test second parameter[pattern]', function() {
        test('test pattern is undefined', function() {
            const date = new Date(2019, 10, 11);
            const formatted = SimpleDateFormat.format(date);
            expect(formatted).toBe('2019-11-11');
        });

        test('test pattern yyyy-M-d H:m:s', function() {
            const date = new Date(2019, 5, 5, 19, 9, 9 );
            expect(SimpleDateFormat.format(date, 'yyyy-M-d H:m:s')).toBe('2019-6-5 19:9:9');
        });

        test('test pattern of year is yyyy', function() {
            const year = 2019;
            const date = new Date(year, 0);
            const formatted = SimpleDateFormat.format(date, 'yyyy');
            expect(formatted).toBe(year + '');
        });

        test('test pattern of month is MM', function() {
            const month = 9;
            const date = new Date(2019, month - 1);
            const formatted = SimpleDateFormat.format(date, 'MM');
            expect(formatted).toBe('0' + month);
        });

        test('test pattern of month is M', function() {
            const month = 9;
            const date = new Date(2019, month - 1);
            let formatted = SimpleDateFormat.format(date, 'M');
            expect(formatted).toBe('' + month);

            const month2 = 10;
            const date2 = new Date(2019, month2 - 1);
            let formatted2 = SimpleDateFormat.format(date2, 'M');
            expect(formatted2).toBe('' + month2);
        });

        test('test pattern of day is dd', function() {
            const day = 9;
            const date = new Date(2019, 11, day);
            const formatted = SimpleDateFormat.format(date, 'dd');
            expect(formatted).toBe('0' + day);
        });

        test('test pattern of day is d', function() {
            const day = 9;
            const date = new Date(2019, 11, day);
            const formatted = SimpleDateFormat.format(date, 'd');
            expect(formatted).toBe('' + day);

            const day2 = 10;
            const date2 = new Date(2019, 11, day2);
            const formatted2 = SimpleDateFormat.format(date2, 'd');
            expect(formatted2).toBe('' + day2);
        });

        test('test pattern of hour is HH', function() {
            const hour = 21;
            const date = new Date(2019, 10, 11, hour);
            const formatted = SimpleDateFormat.format(date, 'HH');
            expect(formatted).toBe('' + hour);

            const hour2 = 5;
            const date2 = new Date(2019, 10, 11, hour2);
            const formatted2 = SimpleDateFormat.format(date2, 'HH');
            expect(formatted2).toBe('0' + hour2);
        });

        test('test pattern of hour is H', function() {
            const hour = 21;
            const date = new Date(2019, 10, 11, hour);
            const formatted = SimpleDateFormat.format(date, 'H');
            expect(formatted).toBe('' + hour);

            const hour2 = 5;
            const date2 = new Date(2019, 10, 11, hour2);
            const formatted2 = SimpleDateFormat.format(date2, 'H');
            expect(formatted2).toBe('' + hour2);
        });

        test('test pattern of minutes is mm', function() {
            const minute = 21;
            const date = new Date(2019, 10, 11, 11, minute);
            const formatted = SimpleDateFormat.format(date, 'mm');
            expect(formatted).toBe('' + minute);

            const minute2 = 5;
            const date2 = new Date(2019, 10, 11, 11, minute2);
            const formatted2 = SimpleDateFormat.format(date2, 'mm');
            expect(formatted2).toBe('0' + minute2);
        });

        test('test pattern of minutes is m', function() {
            const minute = 21;
            const date = new Date(2019, 10, 11, 11, minute);
            const formatted = SimpleDateFormat.format(date, 'm');
            expect(formatted).toBe('' + minute);

            const minute2 = 5;
            const date2 = new Date(2019, 10, 11, 11, minute2);
            const formatted2 = SimpleDateFormat.format(date2, 'm');
            expect(formatted2).toBe('' + minute2);
        });

        test('test pattern of second is ss', function() {
            const second = 21;
            const date = new Date(2019, 10, 11, 11, 11, second);
            const formatted = SimpleDateFormat.format(date, 'ss');
            expect(formatted).toBe('' + second);

            const second2 = 5;
            const date2 = new Date(2019, 10, 11, 11, 11, second2);
            const formatted2 = SimpleDateFormat.format(date2, 'ss');
            expect(formatted2).toBe('0' + second2);
        });

        test('test pattern of second is m', function() {
            const second = 21;
            const date = new Date(2019, 10, 11, 11, 11, second);
            const formatted = SimpleDateFormat.format(date, 's');
            expect(formatted).toBe('' + second);

            const second2 = 5;
            const date2 = new Date(2019, 10, 11, 11, 11, second2);
            const formatted2 = SimpleDateFormat.format(date2, 's');
            expect(formatted2).toBe('' + second2);
        });
    });
});