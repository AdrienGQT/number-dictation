export default function NumberInput() {
    return (
        <input
            placeholder="00"
            name="answer"
            type="number"
            required
            className="bg-base-050 font-pally font-semibold rounded-lg text-8xl text-center tracking-wider text-base-900 active:text-base-900 focus:text-base-900 border-4 border-transparent active:border-base-900 focus:border-base-900 placeholder:text-base-200 pl-3 pr-3 pt-2 pb-2 drop-shadow-xs"
        />
    );
}
