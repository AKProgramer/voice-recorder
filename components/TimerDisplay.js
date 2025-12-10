export default function TimerDisplay({ recordingTime, isRecording }) {
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-stone-800 tracking-wider font-mono mb-3 sm:mb-4">
        {formatTime(recordingTime)}
      </div>

      {isRecording && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-red-600 text-base sm:text-lg md:text-xl">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Recording...</span>
        </div>
      )}
    </div>
  );
}
