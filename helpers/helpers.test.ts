import { calcDateDiffFromToday, formatDateDiff } from './helpers';

describe('dat diff', () => {
    it('should get the days, months and years difference', () => {
        const lastUpdated = new Date('2019-08-17T09:15:00.000Z');
        const currentDay = new Date('2020-01-18T13:00:00.000Z');
        
        const { days, years, months, minutes, hours, weeks } = calcDateDiffFromToday(currentDay, lastUpdated);

        const expectedResults = {
            minutes: 45,
            hours: 3,
            days: 154,
            weeks: 22,
            months: 4,
            years: 0,
        };

        expect(minutes).toEqual(expectedResults.minutes);
        expect(hours).toEqual(expectedResults.hours);
        expect(days).toEqual(expectedResults.days);
        expect(weeks).toEqual(expectedResults.weeks);
        expect(months).toEqual(expectedResults.months);
        expect(years).toEqual(expectedResults.years);
    });

    it('should format the date based on what data is there', () => {
        const lastUpdated = new Date('2019-08-17T11:15:00.000Z');
        const currentDay = new Date('2020-01-18T13:00:00.000Z');
        
        const result = formatDateDiff(calcDateDiffFromToday(currentDay, lastUpdated));

        const expectedResults = 'Updated 4 months ago';

        expect(result).toEqual(expectedResults);
    });
});