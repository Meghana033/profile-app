const Overview = ({
  profile,
  loading
}) => {

  // Loading State
  if (loading) {

    return (
      <div className="loading-box">
        <h2>Fetching Profile Data...</h2>
      </div>
    );
  }

  // No Profile
  if (!profile) {

    return (
      <div className="empty-profile">
        <p>User profile not available</p>
      </div>
    );
  }

  return (

    <section className="profile-card">

      <div className="profile-image">

        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="avatar"
        />

      </div>

      <div className="profile-details">

        <h2>{profile.name}</h2>

        <p className="username">
          @{profile.login}
        </p>

        <p className="bio">
          {profile.bio || "No bio added"}
        </p>

        <div className="profile-stats">

          <div className="stat-box">
            <h4>Followers</h4>
            <span>{profile.followers}</span>
          </div>

          <div className="stat-box">
            <h4>Following</h4>
            <span>{profile.following}</span>
          </div>

          <div className="stat-box">
            <h4>Repositories</h4>
            <span>{profile.public_repos}</span>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Overview;
