// DateUtils.js

export const generateDefaultDates = (referenceDate, rangeData, monthData) => {
    try {
        var currentDate = new Date(referenceDate);
        if (rangeData != null) {
            return {
                pastMonthDate: rangeData[0],
                currentMonthDate: rangeData[1]
            }
        }
        if (monthData != null) {
            currentDate = new Date(monthData);
        }
        const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        const currentYear = currentDate.getFullYear();
        const pastMonth = currentMonth === '01' ? '12' : String(currentMonth - 1).padStart(2, '0');
        const pastYear = currentMonth === '01' ? currentYear - 1 : currentYear;
        // 
        const pastMonthDate = new Date(`${pastYear}-${pastMonth}-28T23:00:00.000Z`);
        const currentMonthDate = new Date(`${currentYear}-${currentMonth}-27T23:00:00.000Z`);
        return {
            pastMonthDate: pastMonthDate,
            currentMonthDate: currentMonthDate,
        };
    } catch (error) {
        return null;
    }
};