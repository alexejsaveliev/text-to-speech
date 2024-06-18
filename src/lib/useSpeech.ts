import {useCallback, useEffect, useMemo, useState} from 'react';

import {createSpeechEngine, PlayingState} from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const onEnd = () => {
    setCurrentSentenceIdx((prev) => prev + 1);
  }

  const onBoundary = (e: SpeechSynthesisEvent) => {
    setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
  }

  const speechEngine = useMemo(
      () => createSpeechEngine({ onBoundary, onStateUpdate: setPlaybackState, onEnd }),
      []
  );

  useEffect(() => {
    if (currentSentenceIdx < sentences.length) {
      speechEngine.load(sentences[currentSentenceIdx]);
    }
  }, [sentences, currentSentenceIdx]);

  useEffect(() => {
    setCurrentSentenceIdx(0);
  }, [sentences]);

  useEffect(() => {
    if (currentSentenceIdx >= sentences.length) {
      //we are finished, resetting state
      setCurrentSentenceIdx(0);
      setCurrentWordRange([0, 0]);
    } else if (currentSentenceIdx > 0) {
      //Play next sentence
      play()
    }
  }, [currentSentenceIdx]);

  const play = useCallback(() => {
    speechEngine.play()
  }, [speechEngine]);

  const pause = useCallback(() => {
    speechEngine.pause()
  }, [speechEngine]);

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
