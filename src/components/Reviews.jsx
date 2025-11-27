import './Reviews.css';

const Reviews = ({ reviews }) => {
    // Calculate average rating
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    // Render star icons
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? 'star filled' : 'star'}>
                ★
            </span>
        ));
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) {
            return `${Math.floor(diffDays / 7)} weeks ago`;
        } else if (diffDays < 365) {
            return `${Math.floor(diffDays / 30)} months ago`;
        } else {
            return `${Math.floor(diffDays / 365)} years ago`;
        }
    };

    return (
        <div className="reviews-section">
            <div className="reviews-header">
                <h2>Customer Reviews</h2>
                <div className="rating-summary">
                    <div className="average-rating">
                        <span className="rating-number">{averageRating.toFixed(1)}</span>
                        <div className="stars-display">{renderStars(Math.round(averageRating))}</div>
                        <span className="review-count">Based on {reviews.length} reviews</span>
                    </div>
                </div>
            </div>

            <div className="reviews-grid">
                {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <div className="reviewer-info">
                                <div className="reviewer-avatar">
                                    {review.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="reviewer-details">
                                    <h4 className="reviewer-name">
                                        {review.name}
                                        {review.verified && (
                                            <span className="verified-badge" title="Verified Booking">
                                                ✓
                                            </span>
                                        )}
                                    </h4>
                                    <span className="review-date">{formatDate(review.date)}</span>
                                </div>
                            </div>
                            <div className="review-rating">{renderStars(review.rating)}</div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
