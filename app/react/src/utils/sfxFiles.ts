/****/
/****/ // Import assets here
/****/

/**
 * Play a sound effect.
 * @param eventName - The name of the sound effect to play.
 */
export const playSFX = (eventName: string): void => {
    const audio = new Audio(soundEffectFiles[eventName]);
    audio.play();
};

/****/
/****/ // Define Assets Here
/****/
export const soundEffectFiles: Record<string, string> = {
    // sample: sample,
    // ...
};
