export function getDate(date_string) {
    if (date_string === null) {
        return null;
    }
    const date = new Date(date_string);
    return date.toDateString();
}