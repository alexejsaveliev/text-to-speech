import './App.css';

import {Controls} from './components/Controls';
import {CurrentlyReading} from './components/CurrentlyReading';
import {useCallback, useEffect, useState} from "react";
import {useSpeech} from "./lib/useSpeech";
import {fetchContent, parseContentIntoSentences} from "./lib/content";

function App() {
    const [sentences, setSentences] = useState<Array<string>>([]);
    const {play, pause, playbackState, currentSentenceIdx, currentWordRange} = useSpeech(sentences);

    const getSentences = () => {
        fetchContent().then((content) => {
            setSentences(parseContentIntoSentences(content))
        });
    }

    useEffect(() => {
        getSentences();
    }, []);

    const handleLoadNewContent = useCallback(() => {
        getSentences();
    }, []);

    return (
        <div className="App">
            <h1>Text to speech</h1>
            <div>
                <CurrentlyReading sentences={sentences} currentSentenceIdx={currentSentenceIdx} currentWordRange={currentWordRange}/>
            </div>
            <div>
                <Controls play={play} pause={pause} state={playbackState} loadNewContent={handleLoadNewContent}/>
            </div>
        </div>
    );
}

export default App;
