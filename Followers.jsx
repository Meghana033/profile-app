function Followers({
  followers,
  loading,
}) {
  if (loading) {
    return <h2>Loading followers...</h2>;
  }

  return (
    <div className="followers-container">
      {followers.map((follower) => (
        <div
          className="follower-card"
          key={follower.id}
        >
          <img
            src={follower.avatar_url}
            alt={follower.login}
          />

          <p>{follower.login}</p>
        </div>
      ))}
    </div>
  );
}

export default Followers;