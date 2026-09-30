const SOUNDS_PATHS = {
    correct: "./sounds/correct.mp3",
    error: "./sounds/error.mp3",
    victory: "./sounds/victory.mp3",
} as const;

type SoundPathType = keyof typeof SOUNDS_PATHS;

export default function playSound(
    type: SoundPathType = "correct",
    delay: number = 0,
) {
    const audio = new Audio();
    audio.src = SOUNDS_PATHS[type];
    audio.volume = 1;

    setTimeout(() => {
        audio.play();
    }, delay);
    // const duration = audio.duration;
}
