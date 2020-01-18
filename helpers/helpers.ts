
export const calcDateDiffFromToday = (date1: any, date2: any) => {
    const diff = Math.floor(date1.getTime() - date2.getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff / day);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 31);
    const years = Math.floor(months / 12);
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return {
        years, months, weeks, days, hours, minutes
    };
}

const formatDateDiffMessage = (keyName: string, date: number) => {
    if (date === 1) {
        return `one ${keyName.replace('s', '')} ago`;
    } else {
        return `${date} ${keyName} ago`;
    }
}

export const formatDateDiff = (dates: any) => {
    const messaging = 'Updated ';

    const message = Object.keys(dates)
        .filter(key => dates[key] > 0)
        .map(key => formatDateDiffMessage(key, dates[key]));

    return messaging + message[0];
};
