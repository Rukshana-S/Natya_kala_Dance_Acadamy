const TestimonialCard = ({ rating, text, author }) => {
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="testimonial-card">
      <div className="stars">
        {renderStars(rating)}
      </div>
      <p className="testimonial-text">"{text}"</p>
      <p className="testimonial-author">— {author}</p>
    </div>
  );
};

export default TestimonialCard;