/** GET CURRENT DATE */
export const currentDate = () => {
    return new Date().toJSON();
};

export const localDate = (dateTime) => {
    return new Date(dateTime).toLocaleString();
};
