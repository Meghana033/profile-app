const Repositories = ({
  repos,
  loading
}) => {

  // Loading State
  if (loading) {

    return (
      <div className="loading-section">
        <h2>Fetching Repositories...</h2>
      </div>
    );
  }

  // Empty Repository List
  if (!repos.length) {

    return (
      <div className="empty-repos">
        <p>No repositories found</p>
      </div>
    );
  }

  return (

    <section className="repositories-wrapper">

      {
        repos.map((repository) => (

          <article
            className="repository-card"
            key={repository.id}
          >

            <h3 className="repo-title">
              {repository.name}
            </h3>

            <p className="repo-language">

              <strong>Primary Language:</strong>

              {
                repository.language
                  ? repository.language
                  : "Not Specified"
              }

            </p>

            <p className="repo-stars">

              <strong>Stars:</strong>

              {repository.stargazers_count}

            </p>

            <a
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              className="repo-link"
            >
              Open Repository
            </a>

          </article>
        ))
      }

    </section>
  );
};

export default Repositories;
