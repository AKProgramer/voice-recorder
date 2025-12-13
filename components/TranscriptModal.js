import { X, Edit2, FileText, Save, Mail, Eye, Loader2, ArrowLeft, CheckCircle, Upload, CloudUpload } from 'lucide-react';

export default function TranscriptModal({
  showModal,
  transcriptText,
  transcriptName,
  onClose,
  onTranscriptTextChange,
  onTranscriptNameChange,
  onDownload,
  isSummarizing,
  showSummary,
  summaryText,
  setSummaryText,
  onSummarize,
  isEditingEmail,
  setIsEditingEmail,
  emailRecipients,
  emailInputValue,
  setEmailInputValue,
  handleEmailKeyDown,
  removeEmailRecipient,
  emailSubject,
  setEmailSubject,
  onSendEmail,
  onBackToTranscript,
  isSendingEmail,
  emailSentSuccess,
  isUploadingToDrive,
  driveUploadSuccess
}) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-linear-to-br from-stone-50 to-amber-50 rounded-2xl sm:rounded-3xl shadow-2xl max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col border border-stone-200/50 animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 md:p-8 border-b border-stone-200/70 bg-white/40 backdrop-blur-sm">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 tracking-tight font-serif">Transcription</h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-light tracking-wide">Edit and save your transcript</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 hover:bg-stone-200/60 rounded-xl transition-all hover:rotate-90 duration-200"
            title="Close"
          >
            <X size={20} className="text-stone-700 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
          {!showSummary ? (
            <>
              {/* Name Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-800 uppercase tracking-wider">
                  <Edit2 size={14} className="sm:w-4 sm:h-4" />
                  File Name
                </label>
                <input
                  type="text"
                  value={transcriptName}
                  onChange={onTranscriptNameChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3.5 bg-white border-2 border-stone-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-stone-400 focus:border-stone-400 outline-none text-stone-900 font-medium placeholder:text-stone-400 transition-all shadow-sm hover:border-stone-300"
                  placeholder="my-transcript"
                />
              </div>

              {/* Transcript Text */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-800 uppercase tracking-wider">
                  <FileText size={14} className="sm:w-4 sm:h-4" />
                  Transcript Content
                </label>
                <textarea
                  value={transcriptText}
                  onChange={onTranscriptTextChange}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 px-3 py-3 sm:px-4 sm:py-3.5 md:px-5 md:py-4 bg-white border-2 border-stone-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-stone-400 focus:border-stone-400 outline-none resize-none text-stone-900 leading-relaxed placeholder:text-stone-400 transition-all shadow-sm hover:border-stone-300 font-sans"
                  placeholder="Your transcription will appear here..."
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
                />
                <p className="text-xs text-stone-500 mt-2">{transcriptText.length} characters</p>
              </div>
            </>
          ) : (
            <>
              {/* Email Fields */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-800 uppercase tracking-wider">
                  <Mail size={14} className="sm:w-4 sm:h-4" />
                  Email To
                </label>
                
                {/* Email Input Container with Tags Inline */}
                <div className="w-full min-h-11 sm:min-h-[52px] md:min-h-[58px] px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-white border-2 border-stone-200 rounded-lg sm:rounded-xl focus-within:ring-2 focus-within:ring-stone-400 focus-within:border-stone-400 transition-all shadow-sm hover:border-stone-300 flex flex-wrap gap-2 items-center">
                  {/* Email Tags */}
                  {emailRecipients.map((email, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-700 text-white text-sm rounded-full shrink-0"
                    >
                      <span>{email}</span>
                      <button
                        onClick={() => removeEmailRecipient(email)}
                        className="hover:bg-stone-600 rounded-full p-0.5 transition-colors"
                        type="button"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  
                  {/* Email Input */}
                  <input
                    type="email"
                    value={emailInputValue}
                    onChange={(e) => setEmailInputValue(e.target.value)}
                    onKeyDown={handleEmailKeyDown}
                    className="flex-1 min-w-[200px] outline-none text-sm sm:text-base text-stone-900 font-medium placeholder:text-stone-400 bg-transparent"
                    placeholder={emailRecipients.length === 0 ? "Type email and press Enter" : "Add another email..."}
                  />
                </div>
                <p className="text-xs text-stone-500 mt-1">Press Enter to add multiple recipients</p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-800 uppercase tracking-wider">
                  <FileText size={14} className="sm:w-4 sm:h-4" />
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3.5 bg-white border-2 border-stone-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-stone-400 focus:border-stone-400 outline-none text-stone-900 font-medium placeholder:text-stone-400 transition-all shadow-sm hover:border-stone-300"
                  placeholder="Email subject"
                />
              </div>

              {/* Summary Display/Edit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-800 uppercase tracking-wider">
                    <FileText size={14} className="sm:w-4 sm:h-4" />
                    Summary
                  </label>
                  <button
                    onClick={() => setIsEditingEmail(!isEditingEmail)}
                    className="text-xs sm:text-sm text-stone-600 hover:text-stone-900 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-stone-100 transition-all"
                  >
                    {isEditingEmail ? (
                      <>
                        <Eye size={14} className="sm:w-4 sm:h-4" />
                        View
                      </>
                    ) : (
                      <>
                        <Edit2 size={14} className="sm:w-4 sm:h-4" />
                        Edit
                      </>
                    )}
                  </button>
                </div>
                
                {isEditingEmail ? (
                  <textarea
                    value={summaryText}
                    onChange={(e) => setSummaryText(e.target.value)}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 px-3 py-3 sm:px-4 sm:py-3.5 md:px-5 md:py-4 bg-white border-2 border-stone-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-stone-400 focus:border-stone-400 outline-none resize-none text-stone-900 leading-relaxed transition-all shadow-sm hover:border-stone-300 font-sans"
                    style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
                  />
                ) : (
                  <div 
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 px-3 py-3 sm:px-4 sm:py-3.5 md:px-5 md:py-4 bg-white border-2 border-stone-200 rounded-lg sm:rounded-xl text-sm sm:text-base overflow-y-auto text-stone-900 leading-relaxed shadow-sm prose prose-stone prose-headings:text-stone-900 prose-h2:text-xl prose-h2:font-bold prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-2 prose-p:my-2 prose-ul:my-2 prose-li:my-1 max-w-none"
                    dangerouslySetInnerHTML={{ __html: summaryText }}
                  />
                )}
                <p className="text-xs text-stone-500 mt-2">{summaryText.length} characters</p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 border-t border-stone-200/70 bg-white/40 backdrop-blur-sm">
          {showSummary ? (
            <button
              onClick={onBackToTranscript}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-stone-300 text-stone-700 text-sm sm:text-base font-semibold hover:bg-stone-100 hover:border-stone-400 transition-all shadow-sm order-2 sm:order-1 cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-stone-300 text-stone-700 text-sm sm:text-base font-semibold hover:bg-stone-100 hover:border-stone-400 transition-all shadow-sm order-2 sm:order-1 cursor-pointer"
            >
              Cancel
            </button>
          )}
          
          {isUploadingToDrive ? (
            <button
              disabled
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-blue-600 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-2.5 order-1 sm:order-2 cursor-wait"
            >
              <Loader2 size={18} className="sm:w-5 sm:h-5 animate-spin" />
              Uploading to Google Drive...
            </button>
          ) : driveUploadSuccess ? (
            <button
              disabled
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-stone-700 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-2.5 order-1 sm:order-2"
            >
              <CheckCircle size={18} className="sm:w-5 sm:h-5" />
              Uploaded to Google Drive!
            </button>
          ) : isSummarizing ? (
            <button
              disabled
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-stone-600 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-2.5 order-1 sm:order-2 cursor-wait"
            >
              <Loader2 size={18} className="sm:w-5 sm:h-5 animate-spin" />
              Summarizing...
            </button>
          ) : showSummary ? (
            isSendingEmail ? (
              <button
                disabled
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-stone-600 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-2.5 order-1 sm:order-2 cursor-wait"
              >
                <Loader2 size={18} className="sm:w-5 sm:h-5 animate-spin" />
                Sending Email...
              </button>
            ) : emailSentSuccess ? (
              <button
                disabled
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-green-600 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 sm:gap-2.5 order-1 sm:order-2"
              >
                <CheckCircle size={18} className="sm:w-5 sm:h-5" />
                Email Sent Successfully!
              </button>
            ) : (
              <button
                onClick={onSendEmail}
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-stone-800 to-stone-900 hover:from-stone-900 hover:to-black text-white text-sm sm:text-base font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-2.5 order-1 sm:order-2 cursor-pointer"
              >
                <Mail size={18} className="sm:w-5 sm:h-5" />
                Send Email
              </button>
            )
          ) : (
            <button
              onClick={onSummarize}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-linear-to-r from-stone-800 to-stone-900 hover:from-stone-900 hover:to-black text-white text-sm sm:text-base font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-2.5 order-1 sm:order-2 cursor-pointer"
            >
              <Save size={18} className="sm:w-5 sm:h-5" />
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
