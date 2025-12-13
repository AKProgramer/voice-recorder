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
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 tracking-wider font-mono mb-2 sm:mb-3">
        {formatTime(recordingTime)}
      </div>

      {isRecording && (
        <div className="flex items-center justify-center gap-2 text-red-600 text-sm sm:text-base md:text-lg">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Recording...</span>
        </div>
      )}
    </div>
  );
}
