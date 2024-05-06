const isValidDiseaseDescriptionFormat = (
    response: string
): boolean => {
    const pattern =
        /Disease: \w+.*, Confidence: \d{2}\.\d{2}%. .*?\./g;

    const matches = response.match(pattern);

    if (!matches) return false;

    const reconstructed = matches
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
    const normalizedResponse = response.replace(/\s+/g, ' ').trim();

    return reconstructed === normalizedResponse;
};

export default isValidDiseaseDescriptionFormat;