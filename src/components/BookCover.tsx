import appCover from "@/assets/app-cover.png";

const BookCover = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <img
        src={appCover}
        alt="Book Cover"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default BookCover;
