const API_URL = "http://localhost:5174/content";

type FetchResponse = {
    content: string;
}

const ERROR_CONTENT = '<speak><s>There was an error</s></speak>';

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return ERROR_CONTENT;
        }

        const data: FetchResponse = await response.json();

        return data.content;
    } catch (e) {
        return ERROR_CONTENT;
    }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string): string[] => {
    if (!content.startsWith('<speak>')) {
        throw new Error('Invalid SSML string')
    }
    const strings: string[] = [];
    let startIndex = 0;
    let endIndex = 0;
    while (startIndex >= 0) {
        startIndex = content.indexOf('<s>', endIndex+1);
        endIndex = content.indexOf('</s>', startIndex);

        if (startIndex >= 0) {
            const sentence = content.substring(startIndex + 3, endIndex).trim();
            strings.push(sentence);
        }
    }

    return strings;
};

export { fetchContent, parseContentIntoSentences };
