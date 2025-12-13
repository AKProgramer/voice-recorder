import { Mic, Square, Download, Play, Pause, FileText, Loader2, RotateCcw, Upload } from 'lucide-react';

export default function ControlButtons({
  isRecording,
  audioURL,
  isTranscribing,
  isPlaying,
  onRecord,
  onStop,
  onPlayPause,
  onTranscribe,
  onDownload,
  onNewRecording,
  onUpload
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      {/* Transcription Button */}
      {audioURL && !isRecording && (
        <button
          onClick={onTranscribe}
          className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-stone-700 hover:bg-stone-800 transition-all shadow-lg transform hover:scale-105 cursor-pointer"
          title="Get Transcription"
        >
          <FileText size={18} className="text-stone-100 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      )}

      {/* Main Record/Stop/Play Button with Upload/New Recording button above on hover */}
      <div className="relative flex flex-col items-center group mt-3 sm:mt-4">
        {/* Upload Button - appears above mic button on hover */}
        {!audioURL && !isRecording && !isTranscribing && (
          <button
            onClick={onUpload}
            className="absolute -top-14 sm:-top-16 md:-top-18 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-stone-800 hover:bg-stone-900 transition-all shadow-lg opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transform cursor-pointer z-10"
            title="Upload Audio File to Transcribe"
          >
            <Upload size={18} className="text-stone-100 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        )}
        
        {/* New Recording Button - appears above play button on hover */}
        {audioURL && !isRecording && !isTranscribing && (
          <button
            onClick={onNewRecording}
            className="absolute -top-14 sm:-top-16 md:-top-18 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-stone-800 hover:bg-stone-900 transition-all shadow-lg opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transform cursor-pointer z-10"
            title="Reset and Start New Recording"
          >
            <RotateCcw size={18} className="text-stone-100 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        )}
        
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
          className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all shadow-2xl transform hover:scale-105 cursor-pointer ${
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
            <Loader2 size={28} className="text-stone-100 animate-spin sm:w-8 sm:h-8 md:w-10 md:h-10" />
          ) : isRecording ? (
            <Square size={28} className="text-stone-100 fill-stone-100 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          ) : audioURL ? (
            isPlaying ? (
              <Pause size={28} className="text-stone-100 fill-stone-100 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            ) : (
              <Play size={28} className="text-stone-100 fill-stone-100 ml-1.5 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            )
          ) : (
            <Mic size={28} className="text-stone-100 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          )}
        </button>
      </div>

      {/* Download Button */}
      {audioURL && !isRecording && (
        <button
          onClick={onDownload}
          className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-stone-700 hover:bg-stone-800 transition-all shadow-lg transform hover:scale-105 cursor-pointer"
          title="Download Recording"
        >
          <Download size={18} className="text-stone-100 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      )}
    </div>
  );
}
