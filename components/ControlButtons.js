import { Mic, Square, Download, Play, Pause, FileText, Loader2 } from 'lucide-react';

export default function ControlButtons({
  isRecording,
  audioURL,
  isTranscribing,
  isPlaying,
  onRecord,
  onStop,
  onPlayPause,
  onTranscribe,
  onDownload
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 md:pt-8">
      {/* Transcription Button */}
      {audioURL && !isRecording && (
        <button
          onClick={onTranscribe}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-stone-700 hover:bg-stone-800 transition-all shadow-lg transform hover:scale-105 cursor-pointer"
          title="Get Transcription"
        >
          <FileText size={20} className="text-stone-100 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
      )}

      {/* Main Record/Stop/Play Button */}
      <button
        onClick={() => {
          if (isRecording) {
            onStop();
          } else if (audioURL && !isRecording && !isTranscribing) {
            onPlayPause();
          } else if (!isTranscribing) {
            onRecord();
          }
        }}
        disabled={isTranscribing}
        className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all shadow-2xl transform hover:scale-105 cursor-pointer ${
          isTranscribing
            ? "bg-stone-600 cursor-wait"
            : isRecording
            ? "bg-red-600 hover:bg-red-700"
            : audioURL
            ? isPlaying
              ? "bg-stone-600 hover:bg-stone-700"
              : "bg-stone-700 hover:bg-stone-800"
            : "bg-stone-800 hover:bg-stone-900"
        }`}
      >
        {isTranscribing ? (
          <Loader2 size={36} className="text-stone-100 animate-spin sm:w-10 sm:h-10 md:w-12 md:h-12" />
        ) : isRecording ? (
          <Square size={36} className="text-stone-100 fill-stone-100 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        ) : audioURL ? (
          isPlaying ? (
            <Pause size={36} className="text-stone-100 fill-stone-100 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          ) : (
            <Play size={36} className="text-stone-100 fill-stone-100 ml-2 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          )
        ) : (
          <Mic size={36} className="text-stone-100 sm:w-10 sm:h-10 md:w-12 md:h-12" />
        )}
      </button>

      {/* Download Button */}
      {audioURL && !isRecording && (
        <button
          onClick={onDownload}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-stone-700 hover:bg-stone-800 transition-all shadow-lg transform hover:scale-105 cursor-pointer"
          title="Download Recording"
        >
          <Download size={20} className="text-stone-100 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
      )}
    </div>
  );
}
