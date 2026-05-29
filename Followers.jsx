const Followers = ({
  followers,
  loading
}) => {

  // Loading State
  if (loading) {

    return (
      <div className="loading">
        <h2>Fetching Followers...</h2>
      </div>
    );
  }

  // Empty Followers
  if (!followers.length) {

    return (
      <div className="empty-state">
        <p>No followers available</p>
      </div>
    );
  }

  return (

    <section className="followers-wrapper">

      {
        followers.map((user) => (

          <article
            className="follower-box"
            key={user.id}
          >

            <img
              src={user.avatar_url}
              alt={user.login}
              className="avatar"
            />

            <h3>{user.login}</h3>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View Profile
            </a>

          </article>
        ))
      }

    </section>
  );
};

export default Followers;
