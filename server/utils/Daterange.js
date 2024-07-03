export const DateRange = (range) => {
    let startDate;
    switch (range) {
        case "today":
            startDate = dayjs().subtract(1, "day").utc().toDate();
            break;
        case "week":
            startDate = dayjs().subtract(7, "day").utc().toDate();

            break;
        case "month":
            startDate = dayjs().subtract(30, "day").utc().toDate();
            break;
        default:
            startDate = dayjs().subtract(1, "day").utc().toDate();
    }
    return new Date(startDate);
};