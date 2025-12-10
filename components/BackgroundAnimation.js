export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-stone-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse" 
        style={{animationDelay: '1.5s'}}
      ></div>
    </div>
  );
}
