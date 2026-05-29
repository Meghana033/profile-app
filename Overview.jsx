function Overview({ profile, loading }) {
  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="card">
      <img
        src={profile.avatar_url}
        alt={profile.login}
        className="avatar"
      />

      <h2>{profile.name}</h2>

      <p>{profile.bio}</p>

      <div className="stats">
        <p>
          Followers: {profile.followers}
        </p>

        <p>Following: {profile.following}</p>

        <p>Repositories: {profile.public_repos}</p>
      </div>
    </div>
  );
}

export default Overview;