const isBase64Image = (str: string): boolean => {
    const regex =
        /^data:image\/(jpg|jpeg|png|gif|bmp);base64,[A-Za-z0-9+/]+={0,2}$/;
    if (!str) return false;
    return regex.test(str);
};

export default isBase64Image