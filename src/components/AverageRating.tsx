// src/components/AverageRating.tsx
interface AverageRatingProps {
    rating: number | null | undefined
}

export default function AverageRating({ rating }: AverageRatingProps) {
    if (rating == null) return null

    const rounded = Math.round(rating)

    return (
        <div className="mt-2 text-lg text-yellow-600 flex items-center gap-2">
            <span>Nota media:</span>
            <span className="font-bold">{rating.toFixed(1)} / 5</span>
            <span className="text-sm text-yellow-500">
                {"★".repeat(rounded) + "☆".repeat(5 - rounded)}
            </span>
        </div>
    )
}
