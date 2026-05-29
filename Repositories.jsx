function Repositories({ repos, loading }) {
  if (loading) {
    return <h2>Loading repositories...</h2>;
  }

  return (
    <div className="repo-container">
      {repos.map((repo) => (
        <div className="repo-card" key={repo.id}>
          <h3>{repo.name}</h3>

          <p>
            Language: {repo.language || "N/A"}
          </p>

          <p>Stars: {repo.stargazers_count}</p>
        </div>
      ))}
    </div>
  );
}

export default Repositories;