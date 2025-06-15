interface AverageRatingProps {
    rating: number | null | undefined;
}

export default function AverageRating({ rating }: AverageRatingProps) {
    if (rating == null) return null;

    const rounded = Math.round(rating);

    return (
        <div className="mt-2 flex items-center gap-3">
            <span className="text-lg font-semibold text-primary-85">Nota media:</span>
            <span className="text-lg font-bold text-primary-90">{rating.toFixed(1)} / 5</span>
            <div className="rating">
                {Array.from({ length: 5 }, (_, i) => (
                    <input
                        key={i}
                        type="radio"
                        name="average-rating"
                        className={`mask mask-star ${i < rounded ? "bg-yellow-400" : "bg-gray-300"}`}
                        aria-label={`${i + 1} estrellas`}
                        checked={i === rounded - 1}
                        readOnly
                    />
                ))}
            </div>
        </div>
    );
}
