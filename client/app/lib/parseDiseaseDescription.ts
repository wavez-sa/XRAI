const parseDiseaseDescriptions = (response: string): string[] => {
    const descriptions = response.split(/(?=Disease:)/g);

    return descriptions.filter(
        description => description.trim() !== ''
    );
};

export default parseDiseaseDescriptions;
